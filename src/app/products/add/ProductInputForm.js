'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Box,
  Spinner
} from '@shopify/polaris';
import crypto from 'crypto';

const generateProductId = () => {
  const timestamp = Date.now().toString();
  return 'PROD' + crypto.createHash('md5').update(timestamp).digest('hex').substring(0, 8);
};

const ProductInputForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    images: [{ url: '', alt_text: '' }, { url: '', alt_text: '' }],
    ingredients: '',
    usage_instructions: '',
    size: '',
    weight: '',
    current_status: 'In Manufacturing',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState('Product submitted successfully');
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        if (data.user) {
          setUser({ name: data.user.name, email: data.user.email });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  
  const handleChange = useCallback((value, id) => {
    setProduct(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleImageChange = useCallback((value, index, field) => {
    const newImages = [...product.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setProduct(prev => ({ ...prev, images: newImages }));
  }, [product.images]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const productId = generateProductId();
      const jsonData = JSON.stringify({
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        images: product.images,
        ingredients: product.ingredients.split(',').map(item => item.trim()),
        usage_instructions: product.usage_instructions,
        size: product.size,
        weight: product.weight,
        current_status: product.current_status,
        created_by: {
          name: user.name,
          email: user.email
        }
      });

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/beauty-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          jsonData: jsonData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit product: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const result = await response.json();
      console.log('Product submitted successfully:', result);
      setToastContent('Product submitted successfully');
      setShowToast(true);

      setTimeout(() => {
        router.push('/products');
      }, 1500);
    } catch (error) {
      console.error('Error submitting product:', error);
      setToastContent(`Error: ${error.message}`);
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [product, user, router]);

  const toggleToast = useCallback(() => setShowToast((active) => !active), []);

  const toastMarkup = showToast ? (
    <Toast content={toastContent} error={toastContent.startsWith('Error:')} onDismiss={toggleToast} />
  ) : null;

  const categoryOptions = [
    {label: 'Skin care', value: 'Skin care'},
    {label: 'Hair care', value: 'Hair care'},
    {label: 'Face care', value: 'Face care'},
    {label: 'Personal care', value: 'Personal care'},
    {label: 'Treatment care', value: 'Treatment care'},
  ];

  const statusOptions = [
    {label: 'In Manufacturing', value: 'In Manufacturing'},
    {label: 'In QA', value: 'In QA'},
    {label: 'Ready to ship', value: 'Ready to ship'},
    {label: 'Shipped', value: 'Shipped'},
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
                    label="Name"
                    value={product.name}
                    onChange={(value) => handleChange(value, 'name')}
                  />
                  <TextField
                    label="Brand"
                    value={product.brand}
                    onChange={(value) => handleChange(value, 'brand')}
                  />
                </FormLayout.Group>
                <Select
                  label="Category"
                  options={categoryOptions}
                  value={product.category}
                  onChange={(value) => handleChange(value, 'category')}
                  placeholder="Select Category"
                />
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
                    placeholder="Select Status"
                  />
                </FormLayout.Group>
                <InlineStack align="end">
                  <Button
                    primary
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <InlineStack align="center" gap="2">
                        <Spinner size="small" />
                        <span>Saving to blockchain...</span>
                      </InlineStack>
                    ) : (
                      'Submit'
                    )}
                  </Button>
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