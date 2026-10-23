export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  houseNumber: string;
}

export interface User {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  address: Address;
}

/** Unique e-mail: timestamp + random suffix (safe even for parallel workers). */
export function uniqueEmail(prefix = 'qa'): string {
  const suffix = Math.floor(Math.random() * 1_000_000).toString(36);
  return `${prefix}.${Date.now()}.${suffix}@example.com`;
}

export function newUser(): User {
  return {
    firstName: 'Test',
    lastName: 'User',
    dob: '2000-01-11',
    phone: '11111111',
    email: uniqueEmail(),
    // 8+ chars, upper + lower case, digit and symbol (site password policy)
    password: 'TestPassword!1',
    address: {
      street: 'Abay Avenue',
      city: 'Almaty',
      state: 'Almaty',
      country: 'KZ',
      postalCode: '11111',
      houseNumber: '11',
    },
  };
}
