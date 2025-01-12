import { CardNotification } from '@/partials/cards';
import { ReactNode } from 'react';

interface IChannelsItem {
  icon: string;
  title: string;
  description: string;
  button?: boolean;
  actions: ReactNode;
}
interface IChannelsItems extends Array<IChannelsItem> {}

const Channels = () => {
  const items: IChannelsItems = [
    {
      icon: 'sms',
      title: 'Email',
      description: 'jamescollins@ktstudio.com',
      button: true,
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" defaultChecked value="1" readOnly />
        </div>
      )
    },
    {
      icon: 'phone',
      title: 'Mobile',
      description: '(225) 555-0118',
      button: true,
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" value="1" readOnly />
        </div>
      )
    },
    {
      icon: 'screen',
      title: 'Desctop',
      description: 'Enable notifications for real-time desktop alerts.',
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" defaultChecked value="1" readOnly />
        </div>
      )
    }
  ];

  const renderItem = (item: IChannelsItem, index: number) => {
    return (
      <CardNotification
        icon={item.icon}
        title={item.title}
        description={item.description}
        button={item.button}
        actions={item.actions}
        key={index}
      />
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Notification Channels</h3>
      </div>

      <div id="notifications_cards">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
    </div>
  );
};

export { Channels, type IChannelsItem, type IChannelsItems };
