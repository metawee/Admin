/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataGrid, DefaultTooltip, KeenIcon } from '@/components';

import { ReservationData, IReservationData } from '.';

const ReservationsPage = () => {
  const storageFilterId = 'reservations-filter';

  const columns = useMemo<ColumnDef<IReservationData>[]>(
    () => [
      {
        accessorFn: (row: IReservationData) => row.reservations,
        id: 'Reservation',
        header: () => 'Name', 
        enableSorting: true,
        cell: ({ row }) => {  // 'row' argumentini cell funksiyasiga qo'shdik
          return (
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="leading-none font-medium text-sm text-gray-900">
                  {row.original.reservations.name}
                </span>
                <span className="text-2sm text-gray-700 font-normal">
                  {row.original.reservations.branch}
                </span>
              </div>
            </div>
          );
        },
        meta: {
          className: 'min-w-[200px]',
          cellClassName: 'text-gray-800 font-normal',
        }
      },
      {
        accessorFn: (row) => row.Service,
        id: 'Service',
        header: () => 'Service',
        enableSorting: true,
        cell: (info) => {
          return info.row.original.Service;
        },
        meta: {
          className: 'w-[170px]',
        }
      },   
      {
        accessorFn: (row) => row.Date,
        id: 'Date',
        header: () => 'Date',
        enableSorting: true,
        cell: (info) => {                    
          return info.row.original.Date;
        },
        meta: {
          className: 'w-[170px]',
          cellClassName: 'text-gray-800 font-normal',
        }
      },
      {
        accessorFn: (row) => row.Time,
        id: 'Time',
        header: () => (
          <>
            <DefaultTooltip title="Scheduling time slots available for your appointment" placement="left" className="max-w-48">
              <KeenIcon icon="information-2" className="text-lg leading-none" />
            </DefaultTooltip>
            Time
          </>
        ),
        enableSorting: true, 
        meta: {
          className: 'w-[170px]' 
        }
      },
      {
        accessorFn: (row) => row.Status,
        id: 'Status',
        header: () => 'Status',
        enableSorting: false,
        cell: (info) => {
          const status = info.row.original.Status;
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
          className: 'text-gray-700 font-normal min-w-[220px]'
        },
      },
      {
        accessorFn: (row) => row.Notes,
        id: 'Notes',
        header: () => 'Notes',
        enableSorting: true,
        cell: (info) => {                    
          return info.row.original.Notes;
        },
        meta: {
          className: 'w-[170px]',
          cellClassName: 'text-gray-800 font-normal',
        }
      },
      {
        id: 'edit',
        header: () => '',
        enableSorting: false,
        cell: () => {                    
          return (
            <button className="btn btn-sm btn-icon btn-clear btn-light">
              <KeenIcon icon="notepad-edit" /> 
            </button>
          );
        },
        meta: {
          className: 'w-[70px]'
        }
      },     
    ],
    []
  );

  const data: IReservationData[] = useMemo(() => ReservationData, []);

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
      (reservations) =>
        reservations.reservations.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservations.reservations.branch.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  return (
    <div className="card card-grid h-full min-w-full">
      <div className="card-header">
        <h3 className="card-title">Manage Reservations</h3>

        <div className="flex gap-6">
          <div className="relative">
            <KeenIcon
              icon="magnifier"
              className="leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3"
            />
            <input
              type="text"
              placeholder="Search Reservations"
              className="input input-sm pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>

          <button className="btn btn-primary btn-sm"> 
					  Add Reservation
				  </button>

        </div>

      </div>

      <div className="card-body">
        <DataGrid 
          columns={columns} 
          data={filteredData} 
          rowSelect={true} 
          pagination={{ size: 10 }}
          sorting={[{ id: 'Reservation', desc: false }]}
        />
      </div>
    </div>
  )
};

export { ReservationsPage };
