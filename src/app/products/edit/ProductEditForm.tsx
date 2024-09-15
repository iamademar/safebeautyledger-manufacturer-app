'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Layout,
  FormLayout,
  TextField,
  Select,
  Button,
  InlineStack,
  Toast,
  Card,
  Box
} from '@shopify/polaris';

const ProductEditForm = () => {
  const [product, setProduct] = useState({
    product_id: '',
    name: '',
    brand: '',
    category: '',
    description: '',
    images: [{ url: '', alt_text: '' }, { url: '', alt_text: '' }],
    ingredients: '',
    usage_instructions: '',
    size: '',
    weight: '',
    current_status: '',
    current_location: '',
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Fetch product data here
    // For now, we'll use mock data
    const mockProductData = {
      product_id: '12345',
      name: 'Hydrating Face Serum',
      brand: 'GlowBeauty',
      category: 'Skin Care',
      description: 'A lightweight, fast-absorbing serum that hydrates and nourishes your skin for a radiant glow.',
      images: [
        { url: 'https://example.com/images/hydrating-serum-front.jpg', alt_text: 'Front view of Hydrating Face Serum' },
        { url: 'https://example.com/images/hydrating-serum-back.jpg', alt_text: 'Back view of Hydrating Face Serum' }
      ],
      ingredients: 'Hyaluronic Acid, Vitamin C, Aloe Vera, Green Tea Extract',
      usage_instructions: 'Apply 2-3 drops to clean skin before moisturizing, morning and night.',
      size: '30ml',
      weight: '50g',
      current_status: 'In manufacturing',
      current_location: 'Factory',
    };
    setProduct(mockProductData);
  }, []);

  const handleChange = useCallback((value: string, id: string) => {
    setProduct(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleImageChange = useCallback((value: string, index: number, field: string) => {
    const newImages = [...product.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setProduct(prev => ({ ...prev, images: newImages }));
  }, [product.images]);

  const handleSubmit = useCallback(() => {
    console.log('Updated product:', product);
    setShowToast(true);
  }, [product]);

  const toggleToast = useCallback(() => setShowToast((active) => !active), []);

  const toastMarkup = showToast ? (
    <Toast content="Product updated successfully" onDismiss={toggleToast} />
  ) : null;

  const categoryOptions = [
    {label: 'Skin care', value: 'Skin care'},
    {label: 'Hair care', value: 'Hair care'},
    {label: 'Face care', value: 'Face care'},
    {label: 'Personal care', value: 'Personal care'},
    {label: 'Treatment care', value: 'Treatment care'},
  ];

  const statusOptions = [
    {label: 'Manufacturing', value: 'Manufacturing'},
    {label: 'In QA', value: 'In QA'},
    {label: 'Shipping to retailer', value: 'Shipping to retailer'},
  ];

  const locationOptions = [
    {label: 'Factory', value: 'Factory'},
    {label: 'Warehouse', value: 'Warehouse'},
    {label: 'Shopping', value: 'Shopping'},
  ];

  return (
    <Box>
      <Card background="bg-surface-secondary">
        <Layout>
          <Layout.Section>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  label="Product ID"
                  value={product.product_id}
                  onChange={(value) => handleChange(value, 'product_id')}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  label="Name"
                  value={product.name}
                  onChange={(value) => handleChange(value, 'name')}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Brand"
                  value={product.brand}
                  onChange={(value) => handleChange(value, 'brand')}
                  autoComplete="off"
                />
                <Select
                  label="Category"
                  options={categoryOptions}
                  value={product.category}
                  onChange={(value) => handleChange(value, 'category')}
                />
              </FormLayout.Group>
              <TextField
                label="Description"
                value={product.description}
                onChange={(value) => handleChange(value, 'description')}
                multiline={4}
                autoComplete="off"
              />
              {product.images.map((image, index) => (
                <FormLayout.Group key={index}>
                  <TextField
                    label={`Image ${index + 1} URL`}
                    value={image.url}
                    onChange={(value) => handleImageChange(value, index, 'url')}
                    autoComplete="off"
                  />
                  <TextField
                    label={`Image ${index + 1} Alt Text`}
                    value={image.alt_text}
                    onChange={(value) => handleImageChange(value, index, 'alt_text')}
                    autoComplete="off"
                  />
                </FormLayout.Group>
              ))}
              <TextField
                label="Ingredients (comma-separated)"
                value={product.ingredients}
                onChange={(value) => handleChange(value, 'ingredients')}
                autoComplete="off"
              />
              <TextField
                label="Usage Instructions"
                value={product.usage_instructions}
                onChange={(value) => handleChange(value, 'usage_instructions')}
                multiline={3}
                autoComplete="off"
              />
              <FormLayout.Group>
                <TextField
                  label="Size"
                  value={product.size}
                  onChange={(value) => handleChange(value, 'size')}
                  autoComplete="off"
                />
                <TextField
                  label="Weight"
                  value={product.weight}
                  onChange={(value) => handleChange(value, 'weight')}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <Select
                  label="Current Status"
                  options={statusOptions}
                  value={product.current_status}
                  onChange={(value) => handleChange(value, 'current_status')}
                />
                <Select
                  label="Current Location"
                  options={locationOptions}
                  value={product.current_location}
                  onChange={(value) => handleChange(value, 'current_location')}
                />
              </FormLayout.Group>
              <InlineStack align="end">
                <Button variant="primary" onClick={handleSubmit}>Update Product</Button>
              </InlineStack>
            </FormLayout>
          </Layout.Section>
        </Layout>
      </Card>
      {toastMarkup}
    </Box>
  );
};

export default ProductEditForm;