import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileViewer } from './ProfileViewer';
import type { Customer } from '@commercetools/platform-sdk';

describe('ProfileViewer', () => {
  it('Displayed correctly', () => {
    const customerData = {
      firstName: 'Ivan',
      lastName: 'Ivanov',
      email: 'someEmail@mail.com',
      dateOfBirth: '10-04-2002'
    } as Customer;

    render(<ProfileViewer customerData={customerData}></ProfileViewer>);

    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByText(/имя/i)).toBeInTheDocument();
    expect(screen.getByText(/фамилия/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/дата рождения/i)).toBeInTheDocument();
  });
});
