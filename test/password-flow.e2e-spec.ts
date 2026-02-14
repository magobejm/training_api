import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Password Management Flow (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let jwtToken: string;
    let userId: string;
    const email = `pwd-test-${Date.now()}@example.com`;
    const initialPassword = 'password123';
    const newPassword = 'newpassword456';
    const resetPassword = 'resetpassword789';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        // Enable validation pipe if used in main.ts, but e2e usually bypasses global pipes unless registered locally or in testing module
        await app.init();

        prisma = app.get<PrismaService>(PrismaService);
    });

    afterAll(async () => {
        // Cleanup
        if (userId) {
            await prisma.user.delete({ where: { id: userId } }).catch(() => { });
        }
        await app.close();
    });

    it('1. Register and Login', async () => {
        // Register
        const regRes = await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password: initialPassword, role: 'TRAINER' })
            .expect(201);
        userId = regRes.body.id;

        // Login
        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password: initialPassword })
            .expect(201);

        jwtToken = loginRes.body.accessToken;
        expect(jwtToken).toBeDefined();
    });

    it('2. Change Password', async () => {
        // Change Password
        await request(app.getHttpServer())
            .post('/auth/change-password')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({
                oldPassword: initialPassword,
                newPassword: newPassword,
            })
            .expect(201);

        // Verify old password login fails
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password: initialPassword })
            .expect(401);

        // Verify new password login succeeds
        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password: newPassword })
            .expect(201);

        // Update token just in case
        jwtToken = loginRes.body.accessToken;
    });

    it('3. Forgot and Reset Password', async () => {
        // Forgot Password
        await request(app.getHttpServer())
            .post('/auth/forgot-password')
            .send({ email })
            .expect(201);

        // Get token from DB
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const resetToken = user?.resetToken;
        expect(resetToken).toBeDefined();

        // Reset Password
        await request(app.getHttpServer())
            .post('/auth/reset-password')
            .send({
                token: resetToken,
                newPassword: resetPassword,
            })
            .expect(201);

        // Verify login with reset password
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password: resetPassword })
            .expect(201);
    });
});
