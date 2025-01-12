import { useState } from 'react';
import { KeenIcon } from '@/components';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const monthlyEarnings = [
  { month: 'Jan', earnings: 5000 },
  { month: 'Feb', earnings: 6200 },
  { month: 'Mar', earnings: 7800 },
  { month: 'Apr', earnings: 7200 },
  { month: 'May', earnings: 8900 },
  { month: 'Jun', earnings: 9600 },
];

const earningsSources = [
  { name: 'Services', value: 60 },
  { name: 'Products', value: 25 },
  { name: 'Subscriptions', value: 15 },
];

const topServices = [
  { name: 'Haircut', earnings: 3500, change: 5.2 },
  { name: 'Coloring', earnings: 2800, change: -2.1 },
  { name: 'Styling', earnings: 2200, change: 3.8 },
  { name: 'Manicure', earnings: 1800, change: -1.5 },
  { name: 'Facial', earnings: 1500, change: 4.2 },
];

const EarningsPage = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');

  const totalEarnings = monthlyEarnings.reduce((sum, month) => sum + month.earnings, 0);
  const averageEarnings = totalEarnings / monthlyEarnings.length;
  const lastMonthEarnings = monthlyEarnings[monthlyEarnings.length - 1].earnings;
  const previousMonthEarnings = monthlyEarnings[monthlyEarnings.length - 2].earnings;
  const earningsChange = ((lastMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100;

  // Chart options for monthly earnings
  const lineChartOptions: ApexOptions = {
    series: [{
      name: 'Earnings',
      data: monthlyEarnings.map(item => item.earnings)
    }],
    chart: {
      type: 'line',
      height: 250,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['var(--tw-primary)']
    },
    xaxis: {
      categories: monthlyEarnings.map(item => item.month),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: 'var(--tw-gray-600)',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'var(--tw-gray-600)',
          fontSize: '12px'
        },
        formatter: (value) => `${value} EGP`
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${value.toLocaleString()} EGP`
      }
    },
    grid: {
      borderColor: 'var(--tw-gray-200)',
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  // Chart options for earnings sources
  const pieChartOptions: ApexOptions = {
    series: earningsSources.map(item => item.value),
    chart: {
      type: 'pie',
      height: 250
    },
    labels: earningsSources.map(item => item.name),
    legend: {
      position: 'bottom',
      fontSize: '14px',
      labels: {
        colors: 'var(--tw-gray-600)'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`
    },
    colors: ['#0088FE', '#00C49F', '#FFBB28']
  };

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Header with Time Frame Selection */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-gray-900">Reports & Earnings</h3>
        <select className="select select-sm w-36" value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Earnings</span>
            <KeenIcon icon="dollar" className="text-xl text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalEarnings.toLocaleString()} EGP</div>
          <div className="text-2sm text-success">+{earningsChange.toFixed(2)}% from last month</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Average Earnings</span>
            <KeenIcon icon="trend-up" className="text-xl text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageEarnings.toLocaleString()} EGP</div>
          <div className="text-2sm text-gray-600">Per month</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Customers</span>
            <KeenIcon icon="profile-2user" className="text-xl text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">1,234</div>
          <div className="text-2sm text-success">+5.2% from last month</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Services Sold</span>
            <KeenIcon icon="shopping-cart" className="text-xl text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">3,567</div>
          <div className="text-2sm text-success">+12% from last month</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Monthly Earnings</h3>
          </div>
          <div className="card-body">
            <ApexChart
              options={lineChartOptions}
              series={lineChartOptions.series}
              type="line"
              height={250}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Earnings Sources</h3>
          </div>
          <div className="card-body">
            <ApexChart
              options={pieChartOptions}
              series={pieChartOptions.series}
              type="pie"
              height={250}
            />
          </div>
        </div>
      </div>

      {/* Top Services Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Top Performing Services</h3>
          <span className="text-2sm text-gray-600">Services generating the most revenue</span>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-left">Service</th>
                  <th className="text-left">Earnings</th>
                  <th className="text-left">Change</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map((service) => (
                  <tr key={service.name}>
                    <td className="text-gray-900 font-medium">{service.name}</td>
                    <td>{service.earnings.toLocaleString()} EGP</td>
                    <td>
                      <div className={`flex items-center gap-1 ${service.change > 0 ? 'text-success' : 'text-danger'}`}>
                        <KeenIcon 
                          icon={service.change > 0 ? 'arrow-up' : 'arrow-down'} 
                          className="text-sm" 
                        />
                        {Math.abs(service.change)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary">
          <KeenIcon icon="download" className="mr-2" />
          Download Full Report
        </button>
      </div>
    </div>
  );
};

export { EarningsPage };