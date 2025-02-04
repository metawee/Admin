import {
  ChannelStats,
  EarningsChart,
  WalletBalance,
  Highlights,
  Teams,
  QuickAction,
  RevenueStats
} from './blocks';

const Demo1LightSidebarContent = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">

      <div className="grid gap-5 lg:gap-7.5 items-stretch">
        <QuickAction title="Quick Actions" />
      </div>

      <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-5 lg:gap-7.5 h-full items-stretch">
            <ChannelStats />
          </div>
        </div>

        <div className="lg:col-span-2">
          <WalletBalance className="h-full" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-5 lg:gap-7.5 h-full items-stretch">
            <RevenueStats />
          </div>
        </div>

        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <Highlights limit={4} />
        </div>

        <div className="lg:col-span-2">
          <Teams />
        </div>
      </div>
    </div>
  );
};

export { Demo1LightSidebarContent };
