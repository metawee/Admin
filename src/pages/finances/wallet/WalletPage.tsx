import { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownCard2 } from '@/partials/dropdowns/general';
import clsx from 'clsx';

const WalletPage = () => {
  const [selectedBalance, setSelectedBalance] = useState('cards');
  const [amount, setAmount] = useState('');
  const [activePeriod, setActivePeriod] = useState('Month');
  const [balanceData, setBalanceData] = useState({
    totalEarnings: 0,
    platformFee: 0,
    availableBalance: 0
  });

  // Get data based on selected period
  const getDataForPeriod = (period: string) => {
    switch (period) {
      case 'Today':
        return {
          data: [45, 35, 45, 35, 55, 85, 20, 25, 55],
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          totalEarnings: 5000,
          platformFee: 500,
          availableBalance: 4500
        };
      case 'Week':
        return {
          data: [25, 55, 65, 45, 25, 65, 50, 40, 60],
          categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          totalEarnings: 15000,
          platformFee: 1500,
          availableBalance: 13500
        };
      case 'Month':
        return {
          data: [80, 40, 50, 20, 50, 80, 60, 20, 30],
          categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
          totalEarnings: 50000,
          platformFee: 5000,
          availableBalance: 45000
        };
      case 'Year':
        return {
          data: [20, 65, 20, 50, 70, 25, 40, 60, 80],
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          totalEarnings: 200000,
          platformFee: 20000,
          availableBalance: 180000
        };
      default:
        return {
          data: [],
          categories: [],
          totalEarnings: 0,
          platformFee: 0,
          availableBalance: 0
        };
    }
  };

  // Calculate fees and settlement amounts
  const calculateFees = () => {
    return amount ? (parseFloat(amount) * 0.02).toFixed(2) : '0.00';
  };

  const calculateSettlement = () => {
    return amount ? (parseFloat(amount) - parseFloat(calculateFees())).toFixed(2) : '0.00';
  };

  // Update balance data when period changes
  useEffect(() => {
    const periodData = getDataForPeriod(activePeriod);
    setBalanceData({
      totalEarnings: periodData.totalEarnings,
      platformFee: periodData.platformFee,
      availableBalance: periodData.availableBalance
    });
  }, [activePeriod]);

  const { data, categories } = getDataForPeriod(activePeriod);

  // Chart configuration
  const chartOptions: ApexOptions = {
    series: [
      {
        name: 'Balance',
        data: data
      }
    ],
    chart: {
      height: 250,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    // ... (rest of chart options remain the same)
  };

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
        {/* My Balance Card with Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">My Balance</h3>
            <Menu className="items-stretch">
              <MenuItem
                toggle="dropdown"
                trigger="click"
                dropdownProps={{
                  placement: 'bottom-end',
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10]
                      }
                    }
                  ]
                }}
              >
                <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
                  <KeenIcon icon="dots-vertical" />
                </MenuToggle>
                {DropdownCard2()}
              </MenuItem>
            </Menu>
          </div>
          <div className="card-body flex flex-col gap-2">
            <span className="text-2sm font-normal text-gray-800">Available balance</span>
            <span className="text-3xl font-semibold text-gray-900 mb-3">
              {balanceData.availableBalance.toLocaleString()} EGP
            </span>

            <div className="btn-group">
              {['Today', 'Week', 'Month', 'Year'].map((period) => (
                <button
                  key={period}
                  className={clsx(
                    'btn btn-sm btn-light flex justify-center w-1/4 tab-button focus:shadow-none hover:shadow-none btn-active:shadow-none btn-active:text-gray-900 btn-active:bg-gray-100',
                    activePeriod === period && 'active'
                  )}
                  onClick={() => setActivePeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 mt-4">
              <div className="flex justify-between">
                <span className="text-2sm text-gray-700">Total Earnings</span>
                <span className="text-2sm font-medium text-gray-900">
                  {balanceData.totalEarnings.toLocaleString()} EGP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-2sm text-gray-700">Platform Fee (10%)</span>
                <span className="text-2sm font-medium text-gray-900">
                  -{balanceData.platformFee.toLocaleString()} EGP
                </span>
              </div>
            </div>

            <ApexChart
              options={chartOptions}
              series={chartOptions.series}
              type="area"
              height={250}
              className="mt-4"
            />
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <span className="text-2sm text-gray-700">Your latest transactions</span>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-12-30</td>
                    <td>Booking Payment</td>
                    <td className="text-success">+500.00 EGP</td>
                  </tr>
                  <tr>
                    <td>2024-12-29</td>
                    <td>Withdrawal</td>
                    <td className="text-danger">-200.00 EGP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Settlement Details Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Settlement Details</h3>
          <span className="text-2sm text-gray-700">
            The amount will be instantly settled into your default bank account.
          </span>
        </div>
        <div className="card-body grid gap-5">
          {/* Balance Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <label className="flex items-center gap-2.5 border border-gray-200 rounded-xl p-4 cursor-pointer">
              <input
                type="radio"
                name="balance"
                value="cards"
                checked={selectedBalance === 'cards'}
                onChange={(e) => setSelectedBalance(e.target.value)}
                className="radio"
              />
              <div className="flex-1">
                <div className="text-2sm text-gray-700">Cards and Wallet Balance</div>
                <div className="text-lg font-medium text-gray-900">
                  {balanceData.availableBalance.toLocaleString()} EGP
                </div>
              </div>
            </label>
            <label className="flex items-center gap-2.5 border border-gray-200 rounded-xl p-4 cursor-pointer">
              <input
                type="radio"
                name="balance"
                value="alternative"
                checked={selectedBalance === 'alternative'}
                onChange={(e) => setSelectedBalance(e.target.value)}
                className="radio"
              />
              <div className="flex-1">
                <div className="text-2sm text-gray-700">Alternative Payments</div>
                <div className="text-lg font-medium text-gray-900">0.00 EGP</div>
              </div>
            </label>
          </div>

          {/* Amount Input */}
          <div>
            <label className="form-label">Amount</label>
            <div className="input-group">
              <span className="bg-light px-3 py-2">EGP</span>
              <input
                type="text"
                className="input"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Settlement Details */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-2sm text-gray-700">From</span>
              <span className="text-2sm font-medium text-gray-900">Paymob</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-2sm text-gray-700">To</span>
              <span className="text-2sm font-medium text-gray-900">Mostafa ibrahim, ENBD, ****5301</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-2sm text-gray-700">Requested amount</span>
              <span className="text-2sm font-medium text-gray-900">{amount ? `${amount} EGP` : '-'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-2sm text-gray-700">Settlement fees</span>
              <span className="text-2sm font-medium text-gray-900">{calculateFees()} EGP</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-2sm text-gray-700">Settlement amount</span>
              <span className="text-2sm font-medium text-gray-900">{calculateSettlement()} EGP</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="btn btn-primary"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Proceed to Settlement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { WalletPage };