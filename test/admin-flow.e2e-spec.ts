import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Admin Management Flow (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let adminToken: string;
    let createdTrainerId: string;

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    const newTrainerEmail = `trainer-test-${Date.now()}@example.com`;
    const newTrainerPassword = 'password123';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        prisma = app.get<PrismaService>(PrismaService);
    });

    afterAll(async () => {
        // Cleanup
        if (createdTrainerId) {
            await prisma.user.delete({ where: { id: createdTrainerId } }).catch(() => { });
        }
        await app.close();
    });

    it('1. Admin Login', async () => {
        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: adminEmail, password: adminPassword })
            .expect(201);

        adminToken = loginRes.body.accessToken;
        expect(adminToken).toBeDefined();
        expect(loginRes.body.user.role).toBe('ADMIN');
    });

    it('2. Create Trainer as Admin', async () => {
        const res = await request(app.getHttpServer())
            .post('/admin/trainers')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                email: newTrainerEmail,
                password: newTrainerPassword,
            })
            .expect(201);

        expect(res.body.email).toBe(newTrainerEmail);
        expect(res.body.role).toBe('TRAINER');
        createdTrainerId = res.body.id;
    });

    it('3. List Trainers', async () => {
        const res = await request(app.getHttpServer())
            .get('/admin/trainers')
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        const created = res.body.find((t: any) => t.id === createdTrainerId);
        expect(created).toBeDefined();
    });

    it('4. Reset Trainer Password', async () => {
        const newPass = 'resetpass123';
        await request(app.getHttpServer())
            .post(`/admin/trainers/${createdTrainerId}/reset-password`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ newPassword: newPass })
            .expect(201);

        // Verify login with new password
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: newTrainerEmail, password: newPass })
            .expect(201);
    });

    it('5. Delete Trainer', async () => {
        await request(app.getHttpServer())
            .delete(`/admin/trainers/${createdTrainerId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);

        // Verify soft delete (login should fail or return deleted status if logic implies)
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: newTrainerEmail, password: 'resetpass123' })
            .expect(401);
    });
});
