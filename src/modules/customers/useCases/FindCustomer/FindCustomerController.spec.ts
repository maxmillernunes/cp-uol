/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';
import { v4 } from 'uuid';

import { City } from '.prisma/client';

let city: City;

describe('FindCustomerController', () => {
  afterAll(async () => {
    const deleteAllCustomers02 = prisma.customer.deleteMany();
    const deleteAllCities02 = prisma.city.deleteMany();

    await prisma.$transaction([deleteAllCustomers02, deleteAllCities02]);

    await prisma.$disconnect();
  });

  it('should be able to find specific customer by id!', async () => {
    city = await prisma.city.create({
      data: {
        state: 'Bahia',
        name: 'Juazeiro do Norte',
      },
    });

    const customer = await prisma.customer.create({
      data: {
        birth_date: new Date('2000-06-28'),
        name: 'Maxmiller Nunes',
        genre: 'MALE',
        city_id: city.id,
      },
    });

    const response = await request(app).get(`/api/customers/${customer.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty('id');

    expect(response.body.genre).toEqual(customer.genre);
    expect(response.body.name).toEqual(customer.name);
    expect(new Date(response.body.birth_date)).toEqual(customer.birth_date);
  });

  it('should not be able to find specific customer by wrong/invalid id!', async () => {
    const response = await request(app).get(`/api/customers/${v4()}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Customer not found');
    expect(response.body.errorCode).toBe('CUSTOMER_NOT_FOUND');
  });
});
