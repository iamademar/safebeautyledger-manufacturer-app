'use client';

import React from 'react';
import Image from 'next/image';
import {
  Page,
  Card,
  FormLayout,
  TextField,
  Button,
  Text,
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

export default function Login() {
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
      <Card sectioned>
        <Text variant="heading2xl" as="h2">
          Login
        </Text>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormLayout>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            <Button submit primary>
              Log In
            </Button>
          </FormLayout>
        </form>
      </Card>
    </Page>
  );
}