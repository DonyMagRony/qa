import { APIRequestContext, expect } from '@playwright/test';
import { User } from '../data/user-factory';

export const API_URL = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

/**
 * Creates a customer through the backend API. Used as test setup, so that
 * login / checkout / password-reset tests do not depend on the UI register form
 * (the register form itself is covered by tests/register.spec.ts).
 */
export async function registerUserViaApi(request: APIRequestContext, user: User): Promise<void> {
  const response = await request.post(`${API_URL}/users/register`, {
    data: {
      first_name: user.firstName,
      last_name: user.lastName,
      dob: user.dob,
      phone: user.phone,
      email: user.email,
      password: user.password,
      address: {
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        country: user.address.country,
        postal_code: user.address.postalCode,
      },
    },
  });
  expect(response.status(), `API register failed: ${await response.text()}`).toBe(201);
}
