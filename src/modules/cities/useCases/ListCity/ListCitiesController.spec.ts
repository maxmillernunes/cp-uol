/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';

describe('ListCityController', () => {
  afterAll(async () => {
    await prisma.city.deleteMany();

    await prisma.$disconnect();
  });

  it('Should be able a list all cities registered', async () => {
    await prisma.city.create({
      data: {
        name: 'Icó',
        state: 'Ceará',
      },
    });
    const response = await request(app).get('/api/cities');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('state');
  });

  it('Should be able a list all cities registered by name', async () => {
    await prisma.city.create({
      data: {
        name: 'Pereiro',
        state: 'Ceará',
      },
    });
    const response = await request(app).get('/api/cities?name=Pereiro');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('name', 'Pereiro');
    expect(response.body[0]).toHaveProperty('state', 'Ceará');
  });

  it('Should be able a list all cities registered by state', async () => {
    await prisma.city.create({
      data: {
        name: 'Pereiro',
        state: 'Ceará',
      },
    });
    const response = await request(app).get('/api/cities?state=Ceará');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('state', 'Ceará');
  });

  it('Should be able a list all cities registered by state and name', async () => {
    await prisma.city.create({
      data: {
        name: 'Pereiro',
        state: 'Ceará',
      },
    });
    const response = await request(app).get(
      '/api/cities?name=Pereiro&state=Ceará',
    );

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('name', 'Pereiro');
    expect(response.body[0]).toHaveProperty('state', 'Ceará');
  });
});
