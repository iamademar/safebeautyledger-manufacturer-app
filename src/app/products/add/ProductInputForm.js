'use client';

import React, { useState, useCallback } from 'react';
import {
  Page,
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

const ProductInputForm = () => {
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

  const handleChange = useCallback((value, id) => {
    setProduct(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleImageChange = useCallback((value, index, field) => {
    const newImages = [...product.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setProduct(prev => ({ ...prev, images: newImages }));
  }, [product.images]);

  const handleSubmit = useCallback(() => {
    console.log(product);
    setShowToast(true);
  }, [product]);

  const toggleToast = useCallback(() => setShowToast((active) => !active), []);

  const toastMarkup = showToast ? (
    <Toast content="Product submitted successfully" onDismiss={toggleToast} />
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
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Back to Product List"
      subtitle="Enter details for the new product"
    >
      <Box style={{marginBottom: '50px'}}>
        <Card background="bg-surface-secondary">
          <Layout>
            <Layout.Section>
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    label="Product ID"
                    value={product.product_id}
                    onChange={(value) => handleChange(value, 'product_id')}
                  />
                  <TextField
                    label="Name"
                    value={product.name}
                    onChange={(value) => handleChange(value, 'name')}
                  />
                </FormLayout.Group>
                <FormLayout.Group>
                  <TextField
                    label="Brand"
                    value={product.brand}
                    onChange={(value) => handleChange(value, 'brand')}
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
                />
                {product.images.map((image, index) => (
                  <FormLayout.Group key={index}>
                    <TextField
                      label={`Image ${index + 1} URL`}
                      value={image.url}
                      onChange={(value) => handleImageChange(value, index, 'url')}
                    />
                    <TextField
                      label={`Image ${index + 1} Alt Text`}
                      value={image.alt_text}
                      onChange={(value) => handleImageChange(value, index, 'alt_text')}
                    />
                  </FormLayout.Group>
                ))}
                <TextField
                  label="Ingredients (comma-separated)"
                  value={product.ingredients}
                  onChange={(value) => handleChange(value, 'ingredients')}
                />
                <TextField
                  label="Usage Instructions"
                  value={product.usage_instructions}
                  onChange={(value) => handleChange(value, 'usage_instructions')}
                  multiline={3}
                />
                <FormLayout.Group>
                  <TextField
                    label="Size"
                    value={product.size}
                    onChange={(value) => handleChange(value, 'size')}
                  />
                  <TextField
                    label="Weight"
                    value={product.weight}
                    onChange={(value) => handleChange(value, 'weight')}
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
                  <Button primary onClick={handleSubmit}>Submit</Button>
                </InlineStack>
              </FormLayout>
            </Layout.Section>
          </Layout>
        </Card>
      </Box>
      {toastMarkup}
    </Page>
  );
};

export default ProductInputForm;