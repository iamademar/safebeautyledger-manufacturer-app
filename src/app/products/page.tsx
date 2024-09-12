'use client';

import React from 'react';
import {
  Page,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  Thumbnail,
  Tabs,
} from '@shopify/polaris';

const products = [
  {
    product_id: "12345",
    name: "Hydrating Face Serum",
    brand: "GlowBeauty",
    category: "Skin Care",
    description: "A lightweight, fast-absorbing serum that hydrates and nourishes your skin for a radiant glow.",
    images: [
      {
        url: "https://example.com/images/hydrating-serum-front.jpg",
        alt_text: "Front view of Hydrating Face Serum"
      },
      {
        url: "https://example.com/images/hydrating-serum-back.jpg",
        alt_text: "Back view of Hydrating Face Serum"
      }
    ],
    ingredients: [
      "Hyaluronic Acid",
      "Vitamin C",
      "Aloe Vera",
      "Green Tea Extract"
    ],
    usage_instructions: "Apply 2-3 drops to clean skin before moisturizing, morning and night.",
    size: "30ml",
    weight: "50g",
    current_status: "In manufacturing",
    current_location: "warehouse",
    qa_provider: "FDA",
    qa_status: "Passed",
    qa_date: "2024-02-15",
    qa_report_number: "1234567890",
    qa_report_url: "https://example.com/qa-report/1234567890.pdf"
  },
  // Add more product objects here...
];

export default function ProductList() {
  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(products);

  const rowMarkup = products.map(
    ({product_id, name, brand, category, current_status, images}, index) => (
      <IndexTable.Row
        id={product_id}
        key={product_id}
        selected={selectedResources.includes(product_id)}
        position={index}
      >
        <IndexTable.Cell>
          <Thumbnail
            source={images[0].url}
            alt={images[0].alt_text}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{brand}</IndexTable.Cell>
        <IndexTable.Cell>{category}</IndexTable.Cell>
        <IndexTable.Cell>
          <Badge status={getStatusColor(current_status)}>{current_status}</Badge>
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
      content: 'Ready to Ship',
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
      <Tabs tabs={tabs} />
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            {title: 'Image'},
            {title: 'Name'},
            {title: 'Brand'},
            {title: 'Category'},
            {title: 'Status'},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </Page>
  );
}

function getStatusColor(status) {
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