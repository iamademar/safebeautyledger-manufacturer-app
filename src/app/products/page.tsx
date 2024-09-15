'use client';

import React, { useState, useEffect } from 'react';
import {
  Page,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  Thumbnail,
  Tabs,
  Loading,
} from '@shopify/polaris';

interface Product {
  product_id: string;
  data: {
    name: string;
    brand: string;
    category: string;
    current_status: string;
    images: { url: string; alt_text: string }[];
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/beauty-products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.products)) {
          console.log(data.products);
          setProducts(data.products);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(products);

  const rowMarkup = products.map(
    ({product_id, data}, index) => (
      <IndexTable.Row
        id={product_id}
        key={product_id}
        selected={selectedResources.includes(product_id)}
        position={index}
      >
        <IndexTable.Cell>
          <Thumbnail
            source={data.images?.[0]?.url || ''}
            alt={data.images?.[0]?.alt_text || ''}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>{product_id}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {data.name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{data.brand}</IndexTable.Cell>
        <IndexTable.Cell>{data.category}</IndexTable.Cell>
        <IndexTable.Cell>
          <Badge progress={getStatusColor(data.current_status)}>{data.current_status}</Badge>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const tabs = [
    {
      id: 'all-products',
      content: 'All',
      accessibilityLabel: 'All products',
      panelID: 'all-products-content',
    },
    {
      id: 'in-manufacturing',
      content: 'In Manufacturing',
      panelID: 'in-manufacturing-content',
    },
    {
      id: 'in-qa',
      content: 'In QA',
      panelID: 'in-qa-content',
    },
    {
      id: 'ready-to-ship',
      content: 'Ready to ship',
      panelID: 'ready-to-ship-content',
    },
    {
      id: 'shipped',
      content: 'Shipped',
      panelID: 'shipped-content',
    },
  ];

  return (
    <Page title="Products">
      <Tabs tabs={tabs} selected={0} />
      <LegacyCard>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Loading />
          </div>
        ) : (
          <IndexTable
            resourceName={resourceName}
            itemCount={products.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              {title: 'Image'},
              {title: 'Product ID'},
              {title: 'Name'},
              {title: 'Brand'},
              {title: 'Category'},
              {title: 'Status'},
            ]}
          >
            {rowMarkup}
          </IndexTable>
        )}
      </LegacyCard>
    </Page>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'in manufacturing':
      return 'incomplete';
    case 'in qa':
      return 'incomplete';
    case 'ready to ship':
      return 'partiallyComplete';
    case 'shipped':
      return 'complete';
    default:
      return 'incomplete';
  }
}