import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';
import { v4 } from 'uuid';

describe('CreateCustomerController', () => {
  afterAll(async () => {
    const deleteAllCustomers = prisma.customer.deleteMany();
    const deleteAllCities = prisma.city.deleteMany();

    await prisma.$transaction([deleteAllCustomers, deleteAllCities]);

    await prisma.$disconnect();
  });

  it('should be able to create news customers', async () => {
    const city = await prisma.city.create({
      data: {
        state: 'Rio Grande do Norte',
        name: 'São Miguel',
      },
    });

    const response = await request(app).post('/api/customers').send({
      name: 'Marcus Nunes',
      genre: 'MALE',
      birth_date: '2000-06-28',
      city_id: city.id,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Marcus Nunes');
    expect(response.body).toHaveProperty('genre', 'MALE');
  });

  it('should not be to register new customers with wrong city_id!', async () => {
    await request(app)
      .post('/api/customers')
      .send({
        name: 'Maxmiller Nunes',
        genre: 'MALE',
        birth_date: '2000-06-28',
        city_id: v4(),
      })
      .expect(404, {
        message: 'City not found',
        errorCode: 'CITY_NOT_FOUND',
      });
  });

  it('should not be to register new customers with non-existent gender!', async () => {
    const city = await prisma.city.create({
      data: {
        state: 'Piauí',
        name: 'Esperantina',
      },
    });

    const response = await request(app).post('/api/customers').send({
      name: 'Maxmiller Nunes',
      genre: 'MALE_FEMALE',
      birth_date: '2000-06-28',
      city_id: city.id,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });

  it('should not be to register new customers with wrongs props', async () => {
    const response = await request(app).post('/api/customers').send({
      birth_date: '2000-06-28',
      name: '',
      genre: '',
      city_id: '',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });
});
