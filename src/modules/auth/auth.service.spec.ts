import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, Role } from '@prisma/client';

describe('AuthService', () => {
    let service: AuthService;
    let prismaService: PrismaService;
    let jwtService: JwtService;

    const mockPrismaService = {
        user: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    };

    const mockJwtService = {
        signAsync: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prismaService = module.get<PrismaService>(PrismaService);
        jwtService = module.get<JwtService>(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return user if password matches', async () => {
            const password = 'password';
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: User = {
                id: '1',
                email: 'test@example.com',
                password: hashedPassword,
                role: Role.CLIENT,
                deletedAt: null,
            } as any;

            mockPrismaService.user.findUnique.mockResolvedValue(user);

            const result = await service.validateUser('test@example.com', password);
            expect(result).toEqual(user);
        });

        it('should return null if user not found', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            const result = await service.validateUser('test@example.com', 'pass');
            expect(result).toBeNull();
        });

        it('should return null if password does not match', async () => {
            const password = 'password';
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: User = {
                id: '1',
                email: 'test@example.com',
                password: hashedPassword,
                deletedAt: null,
            } as any;

            mockPrismaService.user.findUnique.mockResolvedValue(user);

            const result = await service.validateUser(
                'test@example.com',
                'wrongpass',
            );
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return access token', async () => {
            const user: User = {
                id: '1',
                email: 'test@example.com',
                password: 'hash',
                role: Role.CLIENT,
            } as any;
            const token = 'jwt-token';

            mockJwtService.signAsync.mockResolvedValue(token);

            const result = await service.login(user);

            expect(result).toEqual({
                accessToken: token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            });
            expect(mockJwtService.signAsync).toHaveBeenCalledWith({
                email: user.email,
                sub: user.id,
                role: user.role,
            });
        });
    });

    describe('register', () => {
        it('should create a new user', async () => {
            const email = 'new@example.com';
            const password = 'password';
            const role = Role.CLIENT;
            const createdUser: User = {
                id: '1',
                email,
                password: 'hash',
                role,
            } as any;

            mockPrismaService.user.findUnique.mockResolvedValue(null);
            mockPrismaService.user.create.mockResolvedValue(createdUser);

            const result = await service.register(email, password, role);

            expect(result).toEqual({
                id: createdUser.id,
                email: createdUser.email,
                role: createdUser.role,
            });
            expect(mockPrismaService.user.create).toHaveBeenCalled();
        });

        it('should reactivate a soft-deleted user', async () => {
            const email = 'deleted@example.com';
            const password = 'newpassword';
            const role = Role.CLIENT;
            const existingUser: User = {
                id: '1',
                email,
                password: 'oldhash',
                role,
                deletedAt: new Date(),
            } as any;
            const updatedUser = { ...existingUser, deletedAt: null, password: 'newhash' };

            mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
            mockPrismaService.user.update.mockResolvedValue(updatedUser);

            const result = await service.register(email, password, role);

            expect(result).toEqual({
                id: updatedUser.id,
                email: updatedUser.email,
                role: updatedUser.role,
            });
            expect(mockPrismaService.user.update).toHaveBeenCalled();
        });
    });

    describe('changePassword', () => {
        it('should update password if old matched', async () => {
            const userId = '1';
            const oldPass = 'old';
            const newPass = 'new';
            const hashedOld = await bcrypt.hash(oldPass, 10);
            const user = { id: userId, password: hashedOld } as any;

            mockPrismaService.user.findUnique.mockResolvedValue(user);
            mockPrismaService.user.update.mockResolvedValue(user); // return whatever

            await service.changePassword(userId, oldPass, newPass);

            expect(mockPrismaService.user.update).toHaveBeenCalledWith({
                where: { id: userId },
                data: { password: expect.any(String) },
            });
        });

        it('should throw error if user not found', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            await expect(service.changePassword('1', 'a', 'b')).rejects.toThrow('User not found');
        });

        it('should throw error if old password is incorrect', async () => {
            const userId = '1';
            const oldPass = 'old';
            const hashedOld = await bcrypt.hash('other', 10);
            const user = { id: userId, password: hashedOld } as any;

            mockPrismaService.user.findUnique.mockResolvedValue(user);
            await expect(service.changePassword(userId, oldPass, 'new')).rejects.toThrow('Invalid current password');
        });
    });
});
