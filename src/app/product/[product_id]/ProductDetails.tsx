'use client';

import React, { useState, useEffect } from 'react';
import {
  Page,
  Card,
  InlineGrid,
  BlockStack,
  Text,
  Thumbnail,
  Badge,
  SkeletonBodyText,
  Box,
  Bleed,
  Divider,
  SkeletonDisplayText,
  DescriptionList
} from '@shopify/polaris';
import { QRCodeSVG } from 'qrcode.react';

interface ProductDetailsProps {
  productId: string;
}

interface ProductData {
  name: string;
  brand: string;
  category: string;
  description: string;
  images: { url: string; alt_text: string }[];
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

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/beauty-products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <LoadingLayout />;
  }

  if (!product) {
    return (
      <Page title="Product Not Found">
        <Text variant="bodyLg" as="p">
          The requested product could not be found.
        </Text>
      </Page>
    );
  }

  return (
    <Page
      backAction={{ content: "Products", url: "/products" }}
      title={product.name}
      secondaryActions={[
        {
          content: "Edit",
          accessibilityLabel: "Edit product",
          onAction: () => alert("Edit action"),
        },
      ]}
    >
      <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
        <BlockStack gap="400">
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Product Details</Text>
              <Text variant="bodyMd" as="p">{product.description}</Text>
              <Text variant="headingMd" as="h4">Category</Text>
              <Text variant="bodyMd" as="p">{product.category}</Text>
              <Text variant="headingSm" as="h4">Images</Text>
              <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                {product.images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    source={image.url}
                    alt={image.alt_text}
                    size="large"
                  />
                ))}
              </InlineGrid>
            </BlockStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Ingredients</Text>
              <ul>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <Text variant="headingSm" as="h3">Usage Instructions</Text>
              <Text variant="bodyMd" as="p">{product.usage_instructions}</Text>
            </BlockStack>
          </Card>
        </BlockStack>
        <BlockStack gap={{ xs: "400", md: "200" }}>
          <Card roundedAbove="sm">
            <BlockStack gap="400" alignment="center">
              <Text variant="headingMd" as="h2">Product QR Code</Text>
              <QRCodeSVG value={`http://localhost:3000/app/product/${productId}`} size={200} />
            </BlockStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Product Information</Text>
              <DescriptionList
                items={[
                  { term: 'Brand', description: product.brand },
                  { term: 'Size', description: product.size },
                  { term: 'Weight', description: product.weight },
                  { term: 'Status', description: <Badge status="success">{product.current_status}</Badge> },
                ]}
              />
            </BlockStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Created By</Text>
              <Text variant="bodyMd" as="p">{product.created_by.name}</Text>
              <Text variant="bodySm" as="p">{product.created_by.email}</Text>
            </BlockStack>
          </Card>
        </BlockStack>
      </InlineGrid>
    </Page>
  );
}

function LoadingLayout() {
  return (
    <Page title="Loading Product">
      <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
        <BlockStack gap="400">
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <Box border="divider" borderRadius="base" minHeight="20rem" />
            </BlockStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={5} />
            </BlockStack>
          </Card>
        </BlockStack>
        <BlockStack gap={{ xs: "400", md: "200" }}>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={3} />
              <Divider />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </BlockStack>
      </InlineGrid>
    </Page>
  );
}