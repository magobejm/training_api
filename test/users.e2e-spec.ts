import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let jwtToken: string;
    let userId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // 1. Register a new user
        const email = `test-${Date.now()}@example.com`;
        const password = 'password123';

        const registerResponse = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                email,
                password,
                role: 'CLIENT',
            })
            .expect(201); // Created

        // Register returns { id, email, role } but NO token in this implementation
        userId = registerResponse.body.id;
        expect(userId).toBeDefined();

        // 2. Login to get token
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email,
                password,
            })
            .expect(201); // Login success

        // Login returns { accessToken, user: {...} }
        jwtToken = loginResponse.body.accessToken;
        expect(jwtToken).toBeDefined();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/users/:id (GET) - get profile', () => {
        return request(app.getHttpServer())
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toEqual(userId);
                expect(res.body.email).toBeDefined();
                // expect(res.body.deletedAt).toBeNull(); // Prisma returns null or omitted?
            });
    });

    it('/users/:id (DELETE) - soft delete', async () => {
        await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200);

        // Verify it's gone (or soft deleted)
        // The controller throws NotFound if deletedAt is set
        return request(app.getHttpServer())
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(404);
    });
});
