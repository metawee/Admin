import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { PageNavbar } from '@/pages/account';

import { ReservationsPage } from '.';
import { useLayout } from '@/providers';

const ReservationsHomePage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-sm text-gray-600">Manage your upcoming and past reservations</span>
                  <span className="size-0.75 bg-gray-600 rounded-full"></span>
                  <a href="#" className="font-semibold btn btn-link link">
                    Accept All Reservations
                  </a>
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
          </Toolbar>
        </Container>
      )}

      <Container>
        <ReservationsPage />
      </Container>
    </Fragment>
  );
};

export { ReservationsHomePage };
