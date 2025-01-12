import { Fragment, useState } from 'react';
import { KeenIcon } from '@/components';

interface IPlanPrice {
  regular: string;
  annual?: string;
}

interface IPlanInfo {
  title: string;
  description: string;
  free?: boolean;
  price?: IPlanPrice | string;
  isCustom?: boolean;
}

interface IFeaturePlans {
  basic: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
  enterprise: string | boolean;
}

interface IAdditionalFeature {
  name: string;
  price: string;
}

interface IFeature {
  title: string;
  plans: IFeaturePlans;
}

interface IPlansInfo {
  basic: IPlanInfo;
  pro: IPlanInfo;
  premium: IPlanInfo;
  enterprise: IPlanInfo;
}

interface IPlansItem {
  title: string;
  plans: IFeaturePlans;
}

interface IPlansItems {
  info: IPlansInfo;
  features: IFeature[];
}

const Plans = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleToggleBilling = () => {
    setIsAnnual(!isAnnual);
  };

  const additionalFeatures: IAdditionalFeature[] = [
    { name: 'SMS notifications', price: '100 EGP' },
    { name: 'Multiple locations', price: '250 EGP' },
    { name: 'API access', price: '500 EGP' },
    { name: 'White-label solution', price: '1000 EGP' },
  ];

  const plans: IPlansItems = {
    info: {
      basic: {
        title: 'Basic',
        description: 'Get started with basic features and pay as you go',
        free: true
      },
      pro: {
        title: 'Starter',
        description: 'Perfect for small businesses looking to grow',
        price: {
          regular: '500 EGP',
          annual: '4,800 EGP'
        }
      },
      premium: {
        title: 'Professional',
        description: 'Ideal for established businesses with multiple staff members',
        price: {
          regular: '700 EGP',
          annual: '7,200 EGP'
        }
      },
      enterprise: {
        title: 'Enterprise',
        description: 'Tailored solutions for large-scale operations',
        price: 'Custom',
        isCustom: true
      }
    },
    features: [
      {
        title: 'Bookings per month',
        plans: {
          basic: 'Unlimited',
          pro: 'Unlimited',
          premium: 'Unlimited',
          enterprise: 'Unlimited'
        }
      },
      {
        title: 'Commission per booking',
        plans: {
          basic: '5%',
          pro: '3.2%',
          premium: '2.7%',
          enterprise: 'Custom'
        }
      },
      {
        title: 'Staff members',
        plans: {
          basic: '1',
          pro: '3',
          premium: 'Unlimited',
          enterprise: 'Unlimited'
        }
      },
      {
        title: 'Services',
        plans: {
          basic: '3',
          pro: '10',
          premium: 'Unlimited',
          enterprise: 'Unlimited'
        }
      },
      {
        title: 'Custom branding',
        plans: {
          basic: false,
          pro: true,
          premium: true,
          enterprise: true
        }
      },
      {
        title: 'Email notifications',
        plans: {
          basic: true,
          pro: true,
          premium: true,
          enterprise: true
        }
      },
      {
        title: 'Advanced analytics',
        plans: {
          basic: false,
          pro: true,
          premium: true,
          enterprise: true
        }
      },
      {
        title: 'Customer management',
        plans: {
          basic: true,
          pro: true,
          premium: true,
          enterprise: true
        }
      },
      {
        title: '24/7 priority support',
        plans: {
          basic: false,
          pro: false,
          premium: true,
          enterprise: true
        }
      }
    ]
  };

  const renderPlanInfo = (type: string, info: IPlanInfo) => (
    <Fragment>
      <h3 className="text-lg text-gray-900 font-medium pb-2">{info.title}</h3>
      <div className="text-gray-700 text-2sm">{info.description}</div>
      <div className="py-4">
        {info.free ? (
          <h4 className="text-2xl text-gray-900 font-semibold leading-none">Free</h4>
        ) : info.isCustom ? (
          <div className="flex items-end gap-1.5">
            <div className="text-2xl text-gray-900 font-semibold leading-none">
              {typeof info.price === 'string' ? info.price : 'Contact Sales'}
            </div>
          </div>
        ) : (
          <div className="flex items-end gap-1.5" data-plan-type={type}>
            {typeof info.price === 'object' && info.price && (
              <>
                <div
                  className="text-2xl text-gray-900 font-semibold leading-none"
                  data-plan-price-regular={info.price.regular}
                  data-plan-price-annual={info.price.annual}
                >
                  {isAnnual ? info.price.regular : info.price.annual}
                </div>
                <div className="text-gray-700 text-2xs">{isAnnual ? 'per month' : 'per year'}</div>
              </>
            )}
          </div>
        )}
      </div>
      <div>
        <button
          className={
            info.free
              ? 'btn btn-light btn-sm flex justify-center w-full'
              : 'btn btn-primary btn-sm text-center flex justify-center w-full'
          }
        >
          {info.free ? 'Switch to Team' : info.isCustom ? 'Contact Sales' : 'Upgrade'}
        </button>
      </div>
    </Fragment>
  );

  const renderFeatureDetail = (detail: string | boolean) => {
    if (typeof detail === 'boolean') {
      return detail ? <KeenIcon icon="check" className="text-success text-lg" /> : null;
    }
    return <div className="text-gray-800 text-2sm">{detail}</div>;
  };

  const renderItem = (feature: IPlansItem, index: number) => {
    return (
      <tr key={index}>
        <td className="table-border-l !px-5 !py-3.5">
          <div className="text-gray-900 text-2sm leading-none font-medium">{feature.title}</div>
        </td>
        <td className="table-border-l !px-5 !py-3.5">
          <div className="text-gray-800 text-2sm">{renderFeatureDetail(feature.plans.basic)}</div>
        </td>
        <td className="table-border-l !px-5 !py-3.5">{renderFeatureDetail(feature.plans.pro)}</td>
        <td className="table-border-l !px-5 !py-3.5">
          {renderFeatureDetail(feature.plans.premium)}
        </td>
        <td className="table-border-l !px-5 !py-3.5">
          {renderFeatureDetail(feature.plans.enterprise)}
        </td>
      </tr>
    );
  };

  const renderAdditionalFeatures = () => (
    <div className="mt-8 px-5">
      <h3 className="text-lg text-gray-900 font-medium mb-4">Additional Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {additionalFeatures.map((feature, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-xl">
            <div className="text-gray-900 text-sm font-medium mb-2">{feature.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-2sm">{feature.price}</span>
              <button className="btn btn-sm btn-light">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="scrollable-x-auto pt-3 -mt-3">
        <table className="table table-fixed min-w-[1000px] table-border-b table-border-r table-rounded card-rounded [&_tr:nth-of-type(2)>td]:table-border-t [&_tr:nth-of-type(2)>td:first-child]:card-rounded-tl">
          <tbody>
            <tr>
              <td className="!border-b-0 align-bottom !p-5 !pt-7.5 !pb-6">
                <label className="switch switch-sm">
                  <input
                    className="order-1"
                    type="checkbox"
                    checked={isAnnual}
                    onChange={handleToggleBilling}
                  />
                  <div className="switch-label order-2">
                    <span className="text-gray-800 text-2sm font-semibold">Annual Billing</span>
                  </div>
                </label>
              </td>
              <td className="!border-b-0 table-border-l table-border-t card-rounded-tl bg-light-active dark:bg-coal-100 !p-5 !pt-7.5 relative">
                <span className="absolute badge badge-sm badge-outline badge-success absolutes top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Current Plan
                </span>
                {renderPlanInfo('basic', plans.info.basic)}
              </td>
              <td className="!border-b-0 table-border-l table-border-t !p-5 !pt-7.5">
                {renderPlanInfo('pro', plans.info.pro)}
              </td>
              <td className="!border-b-0 table-border-l table-border-t !p-5 !pt-7.5">
                {renderPlanInfo('premium', plans.info.premium)}
              </td>
              <td className="!border-b-0 table-border-l table-border-t card-rounded-tr !p-5 !pt-7.5">
                {renderPlanInfo('enterprise', plans.info.enterprise)}
              </td>
            </tr>

            {plans.features.map((feature: IPlansItem, index: number) => renderItem(feature, index))}
          </tbody>
        </table>
      </div>
      {renderAdditionalFeatures()}
    </div>
  );
};

export { Plans, type IPlansItem, type IPlansItems };