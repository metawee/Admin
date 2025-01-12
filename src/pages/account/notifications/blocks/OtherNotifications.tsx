import { CardNotification } from '@/partials/cards';

import { IChannelsItem, IChannelsItems } from './Channels';

const OtherNotifications = () => {
  const items: IChannelsItems = [
    {
      icon: 'dollar',
      title: 'Budget Warning',
      description: 'Get notified if nearing budget limit.',
      actions: (
        <div className="switch switch-sm">
          <input type="checkbox" name="param" defaultChecked value="1" readOnly />
        </div>
      )
    },
    {
      icon: 'cheque',
      title: 'Invoice Alert',
      description: 'Alert for new and unpaid invoices.',
      actions: (
        <a href="#" className="btn btn-sm btn-light btn-outline">
          View Invoices
        </a>
      )
    },
    {
      icon: 'message-text',
      title: 'Feedback Alert',
      description: 'When a client submits new feedback.',
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
        <h3 className="card-title">Other Notifications</h3>
      </div>

      <div id="notifications_cards">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
    </div>
  );
};

export { OtherNotifications };
