/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';

describe('CreateCityController', () => {
  afterAll(async () => {
    await prisma.city.deleteMany();

    await prisma.$disconnect();
  });

  it('should be able to create a new city', async () => {
    const response = await request(app).post('/api/cities').send({
      name: 'Pereiro',
      state: 'Ceará',
    });

    expect(response.status).toBe(201);
    expect(
      await prisma.city.findFirst({
        where: {
          name: 'Pereiro',
        },
      }),
    ).toBeTruthy();
  });

  it('should not be able to create an existent city', async () => {
    await request(app).post('/api/cities').send({
      name: 'Icó',
      state: 'São Paulo',
    });

    await request(app)
      .post('/api/cities')
      .send({
        name: 'Icó',
        state: 'São Paulo',
      })
      .expect(409, {
        message: 'City already exists',
        errorCode: 'CITY_ALREADY_EXISTS',
      });
  });

  it('should not be to register news cities with wrong body props!', async () => {
    const response = await request(app).post('/api/cities').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  it('should not be to register news cities with empty body props!', async () => {
    const response = await request(app).post('/api/cities').send({
      name: '',
      state: '',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });
});
