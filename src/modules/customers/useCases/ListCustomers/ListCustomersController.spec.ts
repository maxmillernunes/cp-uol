/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';

import { City } from '.prisma/client';

let city: City;

describe('ListCustomerController', () => {
  afterAll(async () => {
    const deleteAllCustomers03 = prisma.customer.deleteMany();
    const deleteAllCities03 = prisma.city.deleteMany();

    await prisma.$transaction([deleteAllCustomers03, deleteAllCities03]);

    await prisma.$disconnect();
  });

  it('should be able to list registered customers!', async () => {
    city = await prisma.city.create({
      data: {
        state: 'Paraíba',
        name: 'Patos',
      },
    });

    await prisma.customer.create({
      data: {
        birth_date: new Date('2000-06-28'),
        name: 'Maxmiller Nunes',
        genre: 'MALE',
        city_id: city.id,
      },
    });

    await prisma.customer.create({
      data: {
        birth_date: new Date('2000-06-28'),
        name: 'Maxmiller Nunes 2',
        genre: 'MALE',
        city_id: city.id,
      },
    });

    const response = await request(app).get('/api/customers');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);

    const [first] = response.body;

    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('birth_date');
    expect(first).toHaveProperty('genre');
    expect(first).toHaveProperty('city');
    expect(first).toHaveProperty('age');
    expect(first).toHaveProperty('is_active');
  });

  it('should be able to list all customer that match the name filter!', async () => {
    await prisma.customer.create({
      data: {
        birth_date: new Date('2000-06-28'),
        name: 'Erik Pablo',
        genre: 'MALE',
        city_id: city.id,
      },
    });

    await prisma.customer.create({
      data: {
        birth_date: new Date('2000-06-28'),
        name: 'Ana Maria',
        genre: 'MALE',
        city_id: city.id,
      },
    });

    const response = await request(app).get('/api/customers').query({
      name: 'Erik Pablo',
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);

    const [first] = response.body;

    expect(first.age).toEqual(21);
    expect(first.name).toEqual('Erik Pablo');
    expect(first.genre).toEqual('MALE');
  });
});
