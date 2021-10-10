/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from '@infra/database/prisma';
import { app } from '@infra/http/app';
import request from 'supertest';
import { v4 } from 'uuid';

import { City } from '.prisma/client';

let city: City;

describe('RemoveCustomerController', () => {
  afterAll(async () => {
    const deleteAllCustomers = prisma.customer.deleteMany();
    const deleteAllCities = prisma.city.deleteMany();

    await prisma.$transaction([deleteAllCustomers, deleteAllCities]);

    await prisma.$disconnect();
  });

  it('should be able to delete specific customer by id!', async () => {
    city = await prisma.city.create({
      data: {
        state: 'Ceará',
        name: 'Erere',
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

    const response = await request(app).delete(`/api/customers/${customer.id}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const customerExists = await prisma.customer.findUnique({
      where: {
        id: customer.id,
      },
    });
    expect(customerExists).toBe(null);
    expect(customerExists).toBeFalsy();
  });

  it('should not be able to delete specific customer by wrong/invalid id!', async () => {
    const response = await request(app).delete(`/api/customers/${v4()}`);

    expect(response.body.message).toEqual('Customer not found');
    expect(response.body.errorCode).toEqual('CUSTOMER_NOT_FOUND');
    expect(response.status).toBe(404);
  });
});
