import { Fragment } from 'react';

import { MiscEngage, MiscFaq, MiscHighlightedPosts, IHighlightedPostsItems } from '@/partials/misc';
import { toAbsoluteUrl } from '@/utils';

import { Channels, DoNotDistrub, OtherNotifications } from './blocks';

const AccountNotificationsContent = () => {
  const posts: IHighlightedPostsItems = [
    {
      icon: 'notification-on',
      title: 'Streamlined Alerts Setup: Custom Notification Preferences',
      summary:
        'Tailor your alert preferences with our streamlined setup. Stay informed with notifications that matter to you most.',
      path: '#'
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Channels />

          <OtherNotifications />

        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <DoNotDistrub />

          <MiscHighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export { AccountNotificationsContent };
