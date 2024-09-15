'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { login } from '@/services/api';
import {
  Page,
  Card,
  FormLayout,
  TextField,
  Button,
  Text,
  Toast,
  InlineError,
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <Page narrowWidth>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <Image
          src="/SafeBeautyLedger.svg"
          alt="SafeBeautyLedger Logo"
          width={100}
          height={100}
        />
        <Text variant="heading2xl" as="h1" alignment="center">
          SafeBeautyLedger
        </Text>
      </div>
      <Card>
        <Text variant="heading2xl" as="h2">
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              placeholder="Enter your email"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            <Button submit variant="primary">
              Log In
            </Button>
          </FormLayout>
        </form>
        {error && <InlineError message={error} fieldID="loginForm" />}
      </Card>
      {showToast && (
        <Toast content="Login successful" onDismiss={() => setShowToast(false)} />
      )}
    </Page>
  );
}