import { useState } from 'react';
import { KeenIcon } from '@/components';
import { Link } from 'react-router-dom';

interface TransferData {
  id: number;
  date: string;
  amount: string;
  bankName: string;
  bankAccount: string;
  status: 'Successful' | 'Pending';
}

const transfersData: TransferData[] = [
  { id: 10272186, date: '29 Dec 2024, 2:14 AM', amount: '9,141.03', bankName: 'ENBD', bankAccount: 'xxxx-xxxx-5301', status: 'Pending' },
  { id: 9886579, date: '7 Nov 2024, 1:51 AM', amount: '3,205.84', bankName: 'ENBD', bankAccount: 'xxxx-xxxx-5301', status: 'Successful' },
  { id: 9857787, date: '4 Nov 2024, 2:13 AM', amount: '4,277.91', bankName: 'ENBD', bankAccount: 'xxxx-xxxx-5301', status: 'Successful' },
  { id: 9833063, date: '31 Oct 2024, 1:36 AM', amount: '7,502.05', bankName: 'ENBD', bankAccount: 'xxxx-xxxx-5301', status: 'Pending' },
  { id: 9418106, date: '3 Sep 2024, 2:31 AM', amount: '1,815.48', bankName: 'ENBD', bankAccount: 'xxxx-xxxx-5301', status: 'Successful' },
];

const TransfersPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const stats = [
    { 
      icon: 'dollar', 
      title: 'Net Volume',
      value: '0.00 EGP',
      bgColor: 'bg-primary-light',
      iconColor: 'text-primary'
    },
    { 
      icon: 'chart-line', 
      title: 'Gross Volume',
      value: '0.00 EGP',
      bgColor: 'bg-success-light',
      iconColor: 'text-success'
    },
    { 
      icon: 'chart-pie-simple', 
      title: 'Fees',
      value: '0.00 EGP',
      bgColor: 'bg-warning-light',
      iconColor: 'text-warning'
    },
    { 
      icon: 'document', 
      title: 'VAT',
      value: '0.00 EGP',
      bgColor: 'bg-danger-light',
      iconColor: 'text-danger'
    },
    { 
      icon: 'calendar', 
      title: 'Subscriptions',
      value: '0.00 EGP',
      bgColor: 'bg-info-light',
      iconColor: 'text-info'
    }
  ];

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Bank Account</h3>
        <div className="flex items-center gap-2.5">
          <select className="select select-sm w-44">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <Link to="/finances/wallet" className="btn btn-sm btn-light">Instant Settlement</Link>
          <button className="btn btn-sm btn-primary">Update Balance</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="card-body flex flex-row items-center gap-4">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <KeenIcon icon={stat.icon} className={`text-xl ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-2sm text-gray-700">{stat.title}</p>
                <p className="text-lg font-medium text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bills Balance Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Bills balance</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <KeenIcon icon={stat.icon} className={`text-xl ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2sm text-gray-700">{stat.title}</p>
                  <p className="text-lg font-medium text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transfers Summary */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transfers Summary</h3>
        </div>
        <div className="card-body">
          <p className="text-2sm text-gray-700 mb-5">
            For more details about a specific Transfer, please select it in the table.
          </p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Bank Name</th>
                  <th>Bank Account</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transfersData.map((transfer) => (
                  <tr key={transfer.id}>
                    <td>{transfer.id}</td>
                    <td>{transfer.date}</td>
                    <td>{transfer.amount} EGP</td>
                    <td>{transfer.bankName}</td>
                    <td>{transfer.bankAccount}</td>
                    <td>
                      <span className={`badge badge-sm badge-outline ${
                        transfer.status === 'Successful' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {transfer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TransfersPage };