'use client';

import React from 'react';
import { Page, Layout, LegacyCard } from '@shopify/polaris';
import { CalloutCard } from '@shopify/polaris';

export default function Dashboard() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Dashboard" sectioned>
            <p>Welcome to your SafeBeautyLedger dashboard.</p>
          </LegacyCard>
          <CalloutCard
            title="Review Current Products"
            illustration="https://www.svgrepo.com/show/475556/beauty.svg"
            primaryAction={{
              content: 'Review Products',
              url: '/products',
            }}
          >
            <p>This is the list of products currently available in the system. Please review them for accuracy and completeness.</p>
          </CalloutCard>
          <CalloutCard
            title="Submit Your Beauty Products for Review checkout"
            illustration="https://www.svgrepo.com/show/415693/beauty-beauty-powder-lipstick.svg"
            primaryAction={{
              content: 'Add Product',
              url: '/products/add',
            }}
          >
            <p>Add the beauty products you manufacture to initiate the regulatory quality assurance process. This step ensures that your products meet the required standards before reaching the market.</p>
          </CalloutCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}