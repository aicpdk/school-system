import React from 'react';

export interface IInputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: 'text' | 'password' | 'email';
}

export interface IInputGroupProps {
  children: React.ReactNode[] | React.ReactNode;
}
