/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataGrid, DefaultTooltip, KeenIcon } from '@/components';

import { CustomerManagementData, ICustomerManagementData } from '.';

const CustomerManagementPage = () => {
  const storageFilterId = 'customerManagement-filter';

  const columns = useMemo<ColumnDef<ICustomerManagementData>[]>(
    () => [
      {
        accessorFn: (row) => row.Name,
        id: 'Name',
        header: () => 'Name',
        enableSorting: true,
        cell: (info) => {
          return info.row.original.Name;
        },
        meta: {
          className: 'w-[170px]',
        }
      },
      {
        accessorFn: (row) => row.Email,
        id: 'Email',
        header: () => 'Email',
        enableSorting: true,
        cell: (info) => {
          return info.row.original.Email;
        },
        meta: {
          className: 'w-[170px]',
        }
      },   
      {
        accessorFn: (row) => row.Phone,
        id: 'Phone',
        header: () => 'Phone',
        enableSorting: true,
        cell: (info) => {                    
          return info.row.original.Phone;
        },
        meta: {
          className: 'w-[170px]',
          cellClassName: 'text-gray-800 font-normal',
        }
      },
      {
        accessorFn: (row) => row.LastVisit,
        id: 'LastVisit',
        header: () => (
          <>
            <DefaultTooltip title="Scheduling time slots available for your appointment" placement="left" className="max-w-48">
              <KeenIcon icon="information-2" className="text-lg leading-none" />
            </DefaultTooltip>
            Last Visit
          </>
        ),
        enableSorting: true, 
        meta: {
          className: 'w-[170px]' 
        }
      },
      {
        accessorFn: (row) => row.TotalVisits,
        id: 'TotalVisits',
        header: () => 'Total Visits',
        enableSorting: false,
        cell: (info) => {
          const status = info.row.original.TotalVisits;
          return (
            <div className="flex flex-wrap gap-2.5 mb-2">
              {typeof status === 'string' && (
                <span className="badge badge-sm badge-light badge-outline">
                  {status}
                </span>
              )}
              {Array.isArray(status) && status.map((role, index) => (
                <span key={index} className="badge badge-sm badge-light badge-outline">
                  {role}
                </span>
              ))}
            </div>
          );
        },
        meta: {
          className: 'text-gray-700 font-normal'
        },
      },
      {
        id: 'actions',
        header: () => 'Actions',
        enableSorting: false,
        cell: () => {                    
          return (
            <div className="flex items-center gap-2">
              <button className="btn btn-sm btn-icon btn-clear btn-light" title="Edit">
                <KeenIcon icon="notepad-edit" /> 
              </button>
              <button className="btn btn-sm btn-icon btn-clear btn-light" title="Delete">
                <KeenIcon icon="trash" /> 
              </button>
              <button className="btn btn-sm btn-icon btn-clear btn-light" title="View">
                <KeenIcon icon="eye" /> 
              </button>
            </div>
          );
        },
        meta: {
          className: 'w-[120px]'
        }
      }     
    ],
    []
  );

  const data: ICustomerManagementData[] = useMemo(() => CustomerManagementData, []);

  // Initialize search term from localStorage if available
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(storageFilterId) || '';
  });

  // Update localStorage whenever the search term changes
  useEffect(() => {
    localStorage.setItem(storageFilterId, searchTerm);
  }, [searchTerm]);

  // Filtered data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data; // If no search term, return full data

    return data.filter(
      (customerManagement) =>
        customerManagement.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  return (
    <div className="card card-grid h-full min-w-full">
      <div className="card-header">
        <h3 className="card-title">Customer Management</h3>

        <div className="flex gap-6">
          <div className="relative">
            <KeenIcon
              icon="magnifier"
              className="leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3"
            />
            <input
              type="text"
              placeholder="Search Customer"
              className="input input-sm pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>

          <button className="btn btn-primary btn-sm"> 
          Add New Customer
				  </button>

        </div>

      </div>

      <div className="card-body">
        <DataGrid 
          columns={columns} 
          data={filteredData} 
          rowSelect={true} 
          pagination={{ size: 10 }}
          sorting={[{ id: 'CustomerManagement', desc: false }]}
        />
      </div>
    </div>
  )
};

export { CustomerManagementPage };
