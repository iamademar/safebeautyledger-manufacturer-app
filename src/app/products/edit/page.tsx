'use client';

import React from 'react';
import ProductEditForm from './ProductEditForm';
import { Page } from '@shopify/polaris';

export default function EditProduct() {
  return (
    <Page
      backAction={{content: 'Products', url: '/products'}}
      title="Edit Product"
      subtitle="Modify the details of the existing product"
    >
      <ProductEditForm />
    </Page>
  );
}