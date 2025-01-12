import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataGrid, KeenIcon } from '@/components';

interface Transaction {
  id: number;
  method: string;
  amount: string;
  type: string;
  update: string;
  orderId: string;
  dateCreated: string;
  paymentSource: string;
  otherReferences: string;
  status: 'Success' | 'Failed' | 'Pending';
}

const TransactionsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('dec');

  const transactions: Transaction[] = [
    {
      id: 248192958,
      method: 'Online Card',
      amount: '9,400.00 EGP',
      type: 'Payment',
      update: '-',
      orderId: '278561176',
      dateCreated: '26 Dec 2024, 4:42 PM',
      paymentSource: 'INVOICE',
      otherReferences: '-',
      status: 'Success'
    },
    {
      id: 248120685,
      method: 'Online Card',
      amount: '9,400.00 EGP',
      type: 'Payment',
      update: '-',
      orderId: '278439199',
      dateCreated: '26 Dec 2024, 1:17 PM',
      paymentSource: 'INVOICE',
      otherReferences: '-',
      status: 'Failed'
    }
  ];

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        id: 'id',
        header: () => 'Trnx ID',
        cell: (info) => info.getValue(),
        meta: {
          className: 'min-w-[120px]',
          cellClassName: 'text-gray-800 font-normal',
        }
      },
      {
        accessorFn: (row) => row.method,
        id: 'method',
        header: () => 'Method',
        cell: (info) => info.getValue(),
        meta: {
          className: 'min-w-[120px]',
          cellClassName: 'text-gray-800 font-normal',
        }
      },
      {
        accessorFn: (row) => row.amount,
        id: 'amount',
        header: () => 'Amount',
        cell: (info) => info.getValue(),
        meta: {
          className: 'min-w-[120px]',
          cellClassName: 'text-gray-800 font-normal',
        }
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const status = info.getValue() as string;
          let badgeClass = '';
          
          switch(status) {
            case 'Success':
              badgeClass = 'badge-success';
              break;
            case 'Failed':
              badgeClass = 'badge-danger';
              break;
            case 'Pending':
              badgeClass = 'badge-warning';
              break;
          }
          
          return (
            <div className={`badge badge-sm badge-outline ${badgeClass}`}>
              {status}
            </div>
          );
        },
        meta: {
          className: 'w-[100px]',
        }
      },
    ],
    []
  );

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Total Processed Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="card-title">Total Processed</h3>
              <span className="text-2sm text-primary">You are now viewing the numbers of Dec</span>
            </div>
            <select className="select select-sm w-48" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
              <option value="dec">December</option>
              <option value="nov">November</option>
              <option value="oct">October</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">

            <div className="card bg-light p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2sm text-gray-700">Cash Deposit</span>
                  <p className="text-lg font-semibold text-gray-900">0 EGP</p>
                </div>
                <KeenIcon icon="notepad" className="text-xl text-success" />
              </div>
            </div>

            <div className="card bg-light p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2sm text-gray-700">Card</span>
                  <p className="text-lg font-semibold text-gray-900">9,400 EGP</p>
                </div>
                <KeenIcon icon="two-credit-cart" className="text-xl text-info" />
              </div>
            </div>

            <div className="card bg-light p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2sm text-gray-700">Wallet</span>
                  <p className="text-lg font-semibold text-gray-900">0 EGP</p>
                </div>
                <KeenIcon icon="wallet" className="text-xl text-warning" />
              </div>
            </div>

            <div className="card bg-light p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2sm text-gray-700">valU</span>
                  <p className="text-lg font-semibold text-gray-900">0 EGP</p>
                </div>
                <KeenIcon icon="dollar" className="text-xl text-danger" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Summary Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transactions Summary</h3>
          <button className="btn btn-sm btn-light">
            <KeenIcon icon="filter" className="text-lg" />
            Filters
          </button>
        </div>
        <div className="card-body">
          <DataGrid 
            columns={columns} 
            data={transactions} 
            pagination={{ size: 5 }}
            sorting={[{ id: 'id', desc: false }]} 
          />
        </div>
      </div>
    </div>
  );
};

export { TransactionsPage };