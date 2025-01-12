import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';

import { KeenIcon } from '@/components';

interface IRevenueStatsItem {
  icon: string;
  iconDark?: string;
  info: string;
  desc: string;
  path: string;
}
interface IRevenueStatsItems extends Array<IRevenueStatsItem> {}

const RevenueStats = () => {
  const items: IRevenueStatsItems = [
    { icon: 'bill', info: '1,500 EGP', desc: "Today's Revenue", path: '' },
    { icon: 'two-credit-cart', info: '45,000 EGP', desc: 'Monthly Revenue', path: '' },
    { icon: 'graph-4', info: '+5% from last month', desc: 'Revenue Growth', path: '' },
    {
      icon: 'chart-simple-3',
      iconDark: 'chart-simple-3',
      info: '150 EGP',
      desc: 'Average Booking Value',
      path: ''
    }
  ];

  const renderItem = (item: IRevenueStatsItem, index: number) => {
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

export { RevenueStats, type IRevenueStatsItem, type IRevenueStatsItems };
