import React from 'react';
import { ProductDetails } from './ProductDetails';

export default function ProductPage({ params }: { params: { product_id: string } }) {
  return <ProductDetails productId={params.product_id} />;
}