import { Fragment } from 'react';

import { Container } from '@/components/container';
import { PageNavbar } from '@/pages/account';

import { ServicesPage } from '.';
import { useLayout } from '@/providers';

const ServicesHomePage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />
      <Container>
        <ServicesPage />
      </Container>
    </Fragment>
  );
};

export { ServicesHomePage };
