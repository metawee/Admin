import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components';

interface IWalletBalanceProps {
  className: string;
}

const WalletBalance = ({ className }: IWalletBalanceProps) => {
  return (
    <div className={`card h-full ${className}`}>
      <div className="card-body p-8 bg-gradient-to-r from-black to-slate-900 rounded-t-xl">
        <div className="flex flex-col gap-6">
          {/* Wallet Icon */}
          <div className="inline-flex p-3 rounded-lg bg-white/10 w-fit">
            <KeenIcon icon="wallet" className="h-8 w-7 text-white text-3xl" />
          </div>

          {/* Balance Section */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-white/80">Total Balance</span>
            <h2 className="text-2xl font-bold text-white">24,500.00 EGP</h2>
          </div>

          {/* Stats Row */}
          <div className="flex gap-8 mt-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white/80">Pending Payouts</span>
              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-white">+3,214 EGP</span>
                <KeenIcon icon="arrow-up-right" className="h-4 w-4 text-success-light" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white/80">Last Transaction</span>
              <span className="text-lg font-semibold text-white">-1,754 EGP (Credit)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer flex justify-between items-center p-6">
        <Link 
          to="/wallet/transactions" 
          className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
        >
          View Transactions
        </Link>
        <Link 
          to="/wallet/add-funds" 
          className="btn btn-sm btn-primary"
        >
          Withdraw payments
        </Link>
      </div>
    </div>
  );
};

export { WalletBalance, type IWalletBalanceProps };