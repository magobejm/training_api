import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        validateUser: jest.fn(),
        login: jest.fn(),
        register: jest.fn(),
        changePassword: jest.fn(),
        forgotPassword: jest.fn(),
        resetPassword: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should return token if validation succeeds', async () => {
            const loginDto = { email: 'test@example.com', password: 'password' };
            const user = { id: '1', email: 'test@example.com', role: Role.CLIENT };
            const resultToken = { accessToken: 'token', user };

            mockAuthService.validateUser.mockResolvedValue(user);
            mockAuthService.login.mockResolvedValue(resultToken);

            const result = await controller.login(loginDto);

            expect(result).toEqual(resultToken);
            expect(mockAuthService.validateUser).toHaveBeenCalledWith(
                loginDto.email,
                loginDto.password,
            );
            expect(mockAuthService.login).toHaveBeenCalledWith(user);
        });

        it('should throw UnauthorizedException if validation fails', async () => {
            const loginDto = { email: 'test@example.com', password: 'wrong' };
            mockAuthService.validateUser.mockResolvedValue(null);

            await expect(controller.login(loginDto)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });

    describe('register', () => {
        it('should call authService.register', async () => {
            const registerDto = {
                email: 'new@example.com',
                password: 'password',
                role: Role.CLIENT,
            };
            const expectedResult = { id: '1', ...registerDto };

            mockAuthService.register.mockResolvedValue(expectedResult);

            const result = await controller.register(registerDto);

            expect(result).toEqual(expectedResult);
            expect(mockAuthService.register).toHaveBeenCalledWith(
                registerDto.email,
                registerDto.password,
                registerDto.role,
            );
        });
    });

    describe('changePassword', () => {
        it('should call authService.changePassword', async () => {
            const dto = { oldPassword: 'old', newPassword: 'new' };
            const req = { user: { userId: '1' } };
            const expectedResult = { message: 'success' };

            mockAuthService.changePassword.mockResolvedValue(expectedResult);

            const result = await controller.changePassword(req, dto);

            expect(result).toEqual(expectedResult);
            expect(mockAuthService.changePassword).toHaveBeenCalledWith(
                '1',
                dto.oldPassword,
                dto.newPassword,
            );
        });
    });

    describe('forgotPassword', () => {
        it('should call authService.forgotPassword', async () => {
            const dto = { email: 'test@example.com' };
            const expectedResult = { message: 'email sent' };

            mockAuthService.forgotPassword.mockResolvedValue(expectedResult);

            const result = await controller.forgotPassword(dto);

            expect(result).toEqual(expectedResult);
            expect(mockAuthService.forgotPassword).toHaveBeenCalledWith(dto.email);
        });
    });

    describe('resetPassword', () => {
        it('should call authService.resetPassword', async () => {
            const dto = { token: 'token', newPassword: 'new' };
            const expectedResult = { message: 'reset success' };

            mockAuthService.resetPassword.mockResolvedValue(expectedResult);

            const result = await controller.resetPassword(dto);

            expect(result).toEqual(expectedResult);
            expect(mockAuthService.resetPassword).toHaveBeenCalledWith(
                dto.token,
                dto.newPassword,
            );
        });
    });

    describe('getProfile', () => {
        it('should return user from request', async () => {
            const req = { user: { userId: '1', email: 'test@example.com' } };
            const result = await controller.getProfile(req);
            expect(result).toEqual(req.user);
        });
    });
});
