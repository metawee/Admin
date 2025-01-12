import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/demo1/toolbar';

import { Demo1LightSidebarContent } from './';

const Demo1LightSidebarPage = () => {
  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading title="Dashboard" description="Overview of your business performance" />
          <ToolbarActions>
            <Link to="/public-profile/profiles/company" className="btn btn-sm btn-light">
              View Company Profile
            </Link>
          </ToolbarActions>
        </Toolbar>
      </Container>

      <Container>
        <Demo1LightSidebarContent />
      </Container>
    </Fragment>
  );
};

export { Demo1LightSidebarPage };
