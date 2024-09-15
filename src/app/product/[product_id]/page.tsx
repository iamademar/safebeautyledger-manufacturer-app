'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Page,
  Layout,
  Card,
  Text,
  List,
  Badge,
  SkeletonBodyText,
  SkeletonDisplayText,
} from '@shopify/polaris';

interface Product {
  product_id?: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  images: {
    url: string;
    alt_text: string;
  }[];
  ingredients: string[];
  usage_instructions: string;
  size: string;
  weight: string;
  current_status: string;
  created_by: {
    name: string;
    email: string;
  };
}

export default function ProductDetails() {
  const { product_id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

function isValidProduct(data: any): data is Product {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.name === 'string' &&
    typeof data.brand === 'string' &&
    typeof data.category === 'string' &&
    typeof data.description === 'string' &&
    Array.isArray(data.images) &&
    Array.isArray(data.ingredients) &&
    typeof data.usage_instructions === 'string' &&
    typeof data.size === 'string' &&
    typeof data.weight === 'string' &&
    typeof data.current_status === 'string' &&
    typeof data.created_by === 'object' &&
    data.created_by !== null &&
    typeof data.created_by.name === 'string' &&
    typeof data.created_by.email === 'string'
  );
}

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/beauty-products/${product_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const result = await response.json();
        console.log("Result ------> ", result);
        if (isValidProduct(result.data)) {
          setProduct(result.data);
        } else {
          console.error('Invalid product data received:', result.data);
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (loading) {
    return (
      <Page title="Loading Product...">
        <Card>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText lines={10} />
        </Card>
      </Page>
    );
  }

  if (!product) {
    return (
      <Page title="Product Not Found">
        <Card>
          <Text variant="bodyMd" as="p">
            The requested product could not be found.
          </Text>
        </Card>
      </Page>
    );
  }

  return (
    <Page
      title={product.name}
      subtitle={`Product ID: ${product.product_id}`}
      backAction={{ content: 'Products', url: '/products' }}
    >
      <Layout>
        <Layout.Section oneThird>
          <Card>
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <Text key={index} variant="bodyMd" as="p">
                  <a href={image.url} target="_blank" rel="noopener noreferrer">
                    Image {index + 1}
                  </a>
                </Text>
              ))
            ) : (
              <Text variant="bodyMd" as="p">No images available</Text>
            )}
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Text variant="headingMd" as="h2">
                Product Details
              </Text>
            </Card.Section>
            <Card.Section>
              <Text variant="bodyMd" as="p">
                <strong>Brand:</strong> {product.brand}
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Category:</strong> {product.category}
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Description:</strong> {product.description}
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Size:</strong> {product.size}
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Weight:</strong> {product.weight}
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Current Status:</strong>{' '}
                <Badge status={getStatusColor(product.current_status)}>
                  {product.current_status}
                </Badge>
              </Text>
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <Text variant="headingMd" as="h2">
                Ingredients
              </Text>
            </Card.Section>
            <Card.Section>
              {product.ingredients && product.ingredients.length > 0 ? (
                <List type="bullet">
                  {product.ingredients.map((ingredient, index) => (
                    <List.Item key={index}>{ingredient}</List.Item>
                  ))}
                </List>
              ) : (
                <Text variant="bodyMd" as="p">No ingredients information available</Text>
              )}
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <Text variant="headingMd" as="h2">
                Usage Instructions
              </Text>
            </Card.Section>
            <Card.Section>
              <Text variant="bodyMd" as="p">
                {product.usage_instructions}
              </Text>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Text variant="headingMd" as="h2">
                Created By
              </Text>
            </Card.Section>
            <Card.Section>
              <Text variant="bodyMd" as="p">
                <strong>Name:</strong> {product.created_by?.name || 'Not available'}
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Email:</strong> {product.created_by?.email || 'Not available'}
              </Text>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function getStatusColor(status: string | null) {
  if (!status) return 'new';

  switch (status.toLowerCase()) {
    case 'in manufacturing':
      return 'info';
    case 'in qa':
      return 'warning';
    case 'ready to ship':
      return 'success';
    case 'shipped':
      return 'success';
    default:
      return 'new';
  }
}