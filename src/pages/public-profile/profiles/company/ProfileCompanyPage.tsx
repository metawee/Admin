import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';
import { KeenIcon } from '@/components';
import { Container } from '@/components/container';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

import { ProfileCompanyContent } from './';

const ProfileCompanyPage = () => {
  const image = (
    <div className="flex items-center justify-center rounded-full border-2 border-success-clarity bg-light h-[100px] w-[100px]">
      <img src={toAbsoluteUrl('/media/brand-logos/duolingo.svg')} className="size-[50px]" />
    </div>
  );

  return (
    <Fragment>
      <UserProfileHero
        name="Duolingo"
        image={image}
        info={[
          { label: 'Public Company', icon: 'abstract-41' },
          { label: 'Pittsburgh, KS', icon: 'geolocation' },
          { email: 'info@duolingo.com', icon: 'sms' }
        ]}
      />

      <Container>
        <ProfileCompanyContent />
      </Container>
    </Fragment>
  );
};

export { ProfileCompanyPage };
