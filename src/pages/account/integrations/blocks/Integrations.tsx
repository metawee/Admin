import { CardIntegration } from '@/partials/cards';
import { ReactNode } from 'react';

interface IIntegrationsItem {
  logo: string;
  path: string;
  name: string;
  description: string;
  actions: ReactNode;
}
interface IIntegrationsItems extends Array<IIntegrationsItem> {}

const Integrations = () => {
  const items: IIntegrationsItems = [
    {
      logo: 'whatsapp.svg',
      path: '/',
      name: 'WhatsApp',
      description: '',
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" defaultChecked value="1" readOnly />
        </div>
      )
    },
    {
      logo: 'instagram.svg',
      path: '/',
      name: 'Instagram',
      description: '',
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" value="1" readOnly />
        </div>
      )
    },
    {
      logo: 'facebook.svg',
      path: '/',
      name: 'Facebook Messenger',
      description: '',
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" defaultChecked value="1" readOnly />
        </div>
      )
    },
    {
      logo: 'chrome.svg',
      path: '/',
      name: 'Online Booking',
      description: '',
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" value="1" readOnly />
        </div>
      )
    }
  ];

  const renderItem = (item: IIntegrationsItem, index: number) => {
    return (
      <CardIntegration
        logo={item.logo}
        path={item.path}
        name={item.name}
        description={item.description}
        actions={item.actions}
        key={index}
      />
    );
  };

  return (
    <div id="integrations_cards">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
    </div>
  );
};

export { Integrations, type IIntegrationsItem, type IIntegrationsItems };
