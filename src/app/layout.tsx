'use client';

import React from 'react';
import { AppProvider, Frame, Navigation, TopBar } from '@shopify/polaris';
import { HomeIcon, ProductIcon, PlusIcon } from '@shopify/polaris-icons';
import { usePathname } from 'next/navigation';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Playfair_Display } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userMenuActive, setUserMenuActive] = React.useState(false);
  const pathname = usePathname();

  const toggleUserMenu = React.useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const [user, setUser] = useState({ name: '', email: '' });

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{
            content: 'Log out',
            onAction: async () => {
              await fetch('/api/logout', { method: 'POST' });
              router.push('/login');
            }
          }],
        },
      ]}
      name={user.name}
      detail={user.email}
      initials={user.name.split(' ').map(n => n[0]).join('')}
      open={userMenuActive}
      onToggle={toggleUserMenu}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      contextControl={
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
          <img
            src="/SafeBeautyLedger.svg"
            alt="SafeBeautyLedger"
            style={{ width: '40px', height: '40px', marginRight: '0.5rem' }}
          />
          <span className={playfairDisplay.className} style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e7e7f1' }}>
            SafeBeautyLedger
          </span>
        </div>
      }
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Manufacturer"
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            url: '/dashboard',
            selected: pathname === '/dashboard',
          },
          {
            label: 'Products',
            icon: ProductIcon,
            url: '/products',
            selected: pathname === '/products',
          },
          {
            label: 'Add Product',
            icon: PlusIcon,
            url: '/products/add',
            selected: pathname === '/products/add',
          },
        ]}
      />
    </Navigation>
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        if (data.user) {
          setIsLoggedIn(true);
          setUser({ name: data.user.name, email: data.user.email });
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  return (
    <html lang="en">
      <body>
        <AppProvider i18n={enTranslations}>
          {pathname === '/login' ? (
            children
          ) : (
            <Frame
              topBar={topBarMarkup}
              navigation={navigationMarkup}
            >
              {children}
            </Frame>
          )}
        </AppProvider>
      </body>
    </html>
  );
}