import { useState, useMemo } from 'react';
import { KeenIcon } from '@/components';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const weeklyData = [
  { x: 'Mon', bookings: 4, revenue: 200 },
  { x: 'Tue', bookings: 3, revenue: 150 },
  { x: 'Wed', bookings: 2, revenue: 100 },
  { x: 'Thu', bookings: 6, revenue: 300 },
  { x: 'Fri', bookings: 8, revenue: 400 },
  { x: 'Sat', bookings: 10, revenue: 500 },
  { x: 'Sun', bookings: 12, revenue: 600 },
];

const monthlyData = [
  { x: 'Jan', bookings: 100, revenue: 5000 },
  { x: 'Feb', bookings: 120, revenue: 6000 },
  { x: 'Mar', bookings: 140, revenue: 7000 },
  { x: 'Apr', bookings: 160, revenue: 8000 },
  { x: 'May', bookings: 180, revenue: 9000 },
  { x: 'Jun', bookings: 200, revenue: 10000 },
];

const reports = [
  { id: 1, name: 'Monthly Revenue Report', date: '2024-12-30', type: 'Revenue' },
  { id: 2, name: 'Customer Analytics', date: '2024-12-29', type: 'Analytics' },
  { id: 3, name: 'Service Performance', date: '2024-12-28', type: 'Performance' },
];

const ReportsPage = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');
  const data = timeFrame === 'weekly' ? weeklyData : monthlyData;

  const bookingsChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data.map(item => item.x),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      title: {
        text: 'Bookings'
      }
    },
    fill: {
      opacity: 1,
      colors: ['var(--tw-primary)']
    },
    grid: {
      borderColor: 'var(--tw-gray-200)',
      strokeDashArray: 4,
    }
  };

  const revenueChartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 250,
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['var(--tw-success)']
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data.map(item => item.x),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      title: {
        text: 'Revenue'
      }
    },
    grid: {
      borderColor: 'var(--tw-gray-200)',
      strokeDashArray: 4,
    }
  };

  const pieChartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      height: 250,
    },
    labels: reports.map(report => report.type),
    colors: ['#0088FE', '#00C49F', '#FFBB28'],
    legend: {
      position: 'bottom'
    }
  };

  const bookingsSeries = [{
    name: 'Bookings',
    data: data.map(item => item.bookings)
  }];

  const revenueSeries = [{
    name: 'Revenue',
    data: data.map(item => item.revenue)
  }];

  const pieSeries = reports.map(report => report.id);

  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Reports and Statistics</h3>
          <div className="flex items-center gap-2.5">
            <select 
              className="select select-sm w-36"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
            {/* Bookings Chart */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Number of Bookings</h3>
              </div>
              <div className="card-body">
                <ApexChart
                  options={bookingsChartOptions}
                  series={bookingsSeries}
                  type="bar"
                  height={250}
                />
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Revenue</h3>
              </div>
              <div className="card-body">
                <ApexChart
                  options={revenueChartOptions}
                  series={revenueSeries}
                  type="line"
                  height={250}
                />
              </div>
            </div>

            {/* Revenue Distribution */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Revenue Distribution</h3>
              </div>
              <div className="card-body">
                <ApexChart
                  options={pieChartOptions}
                  series={pieSeries}
                  type="pie"
                  height={250}
                />
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="card mt-5">
            <div className="card-header">
              <h3 className="card-title">Generated Reports</h3>
              <div className="flex items-center gap-2.5">
                <select className="select select-sm w-36">
                  <option value="daily">Daily Report</option>
                  <option value="weekly">Weekly Report</option>
                  <option value="monthly">Monthly Report</option>
                  <option value="yearly">Yearly Report</option>
                </select>
                <button className="btn btn-sm btn-primary">
                  <KeenIcon icon="document" className="text-lg" />
                  Generate Report
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Report Name</th>
                      <th>Date Generated</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.name}</td>
                        <td>{report.date}</td>
                        <td>
                          <span className="badge badge-sm badge-outline badge-primary">
                            {report.type}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-light">
                            <KeenIcon icon="download" className="text-lg" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReportsPage };