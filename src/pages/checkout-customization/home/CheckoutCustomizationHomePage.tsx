import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { PageNavbar } from '@/pages/account';

import { CheckoutCustomizationPage } from '.';
import { useLayout } from '@/providers';

const CheckoutCustomizationHomePage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
            </ToolbarHeading>
          </Toolbar>
        </Container>
      )}

      <Container>
        <CheckoutCustomizationPage />
      </Container>
    </Fragment>
  );
};

export { CheckoutCustomizationHomePage };
