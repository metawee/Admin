import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';

import { KeenIcon } from '@/components';

interface IChannelStatsItem {
  icon: string;
  iconDark?: string;
  info: string;
  desc: string;
  path: string;
}
interface IChannelStatsItems extends Array<IChannelStatsItem> {}

const ChannelStats = () => {
  const items: IChannelStatsItems = [
    { icon: 'cheque', info: '10', desc: "Today's Bookings", path: '' },
    { icon: 'calendar', info: '124', desc: 'Total Bookings This Month', path: '' },
    { icon: 'calendar-8', info: '3', desc: 'Average Daily Bookings', path: '' },
    {
      icon: 'time',
      iconDark: 'time',
      info: '80%',
      desc: 'Occupancy Rate',
      path: ''
    }
  ];

  const renderItem = (item: IChannelStatsItem, index: number) => {
    return (
      <div
        key={index}
        className="card flex-col justify-between gap-6 h-full bg-cover bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg"
      >
        {item.iconDark ? (
          <>
            <KeenIcon icon={item.icon} className="w-7 mt-4 ms-5 text-3xl" />
          </>
        ) : (
          <KeenIcon icon={item.icon} className="w-7 mt-4 ms-5 text-3xl" />
        )}

        <div className="flex flex-col gap-1 pb-4 px-5">
          <span className="text-2xl font-semibold text-gray-900">{item.info}</span>
          <span className="text-2sm font-normal text-gray-700">{item.desc}</span>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
      </style>

      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
};

export { ChannelStats, type IChannelStatsItem, type IChannelStatsItems };
