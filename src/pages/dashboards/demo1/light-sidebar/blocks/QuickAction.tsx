interface IQuickActionProps {
  title: string;
}

const QuickAction = ({ title }: IQuickActionProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-body pb-7.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <a href="#" className="btn btn-lg btn-light bg-black text-white w-full">
            Add New Reservation
          </a>
          <a href="#" className="btn btn-lg btn-light w-full">
            Manage Services
          </a>
          <a href="#" className="btn btn-lg btn-light w-full">
            Calendar Settings
          </a>
          <a href="#" className="btn btn-lg btn-light w-full">
            Send Customer Reminders
          </a>
          <a href="#" className="btn btn-lg btn-light w-full">
            View Performance Report
          </a>
          <a href="#" className="btn btn-lg btn-light w-full">
            Manage Staff
          </a>
          <a href="#" className="btn btn-lg btn-light w-full">
            Process Payment
          </a>
        </div>
      </div>
    </div>
  );
};

export {
  QuickAction,
  type IQuickActionProps
};