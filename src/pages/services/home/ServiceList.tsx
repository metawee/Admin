import { DataGrid } from '@/components';
import { KeenIcon } from '@/components';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ServiceField } from './service-types';

interface ServiceListProps {
  services: any[];
  fields: ServiceField[];
  onEdit: (service: any) => void;
  onDelete: (id: number) => void;
}

const ServiceList = ({ services, fields, onEdit, onDelete }: ServiceListProps) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      // Service Name column
      {
        accessorFn: (row) => row.name,
        id: 'name',
        header: () => 'Service Name',
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary-light">
                <KeenIcon icon="basket" className="text-primary text-lg" />
              </div>
              <span className="text-gray-900 font-medium">{value}</span>
            </div>
          );
        },
        meta: {
          className: 'min-w-[200px]'
        }
      },
      // Price column
      {
        accessorFn: (row) => row.price || row.price_per_hour,
        id: 'price',
        header: () => 'Price',
        cell: (info) => {
          const value = info.getValue() as number | string;
          return (
            <div className="text-gray-800">
              {typeof value === 'number' 
                ? `${value} EGP` 
                : value}
            </div>
          );
        },
        meta: {
          className: 'min-w-[100px]'
        }
      },
      // Category/Sport Type/Speciality column
      {
        accessorFn: (row) => row.category || row.sport_type || row.speciality,
        id: 'category',
        header: () => 'Category',
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <div className="badge badge-sm badge-outline badge-primary">
              {value}
            </div>
          );
        },
        meta: {
          className: 'min-w-[150px]'
        }
      },
      // Description column
      {
        accessorFn: (row) => row.description,
        id: 'description',
        header: () => 'Description',
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <div className="text-gray-600 truncate">
              {value || '-'}
            </div>
          );
        },
        meta: {
          className: 'min-w-[200px]'
        }
      },
      // Duration column (for applicable services)
      {
        accessorFn: (row) => row.duration,
        id: 'duration',
        header: () => 'Duration',
        cell: (info) => {
          const value = info.getValue() as number;
          return value ? (
            <div className="text-gray-800">
              {value} mins
            </div>
          ) : null;
        },
        meta: {
          className: 'min-w-[100px]'
        }
      },
      // Status column
      {
        accessorFn: (row) => row.status || 'active',
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <div className={`badge badge-sm badge-outline ${value === 'active' ? 'badge-success' : 'badge-warning'}`}>
              {value}
            </div>
          );
        },
        meta: {
          className: 'min-w-[100px]'
        }
      },
      // Created Date column
      {
        accessorFn: (row) => row.createdAt,
        id: 'createdAt',
        header: () => 'Created Date',
        cell: (info) => {
          const value = info.getValue() as string;
          if (!value) return '-';
          const date = new Date(value);
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        },
        meta: {
          className: 'min-w-[150px]'
        }
      },
      // Actions column
      {
        id: 'actions',
        header: () => '',
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <button 
                className="btn btn-icon btn-sm btn-light"
                onClick={() => onEdit(info.row.original)}
                title="Edit"
              >
                <KeenIcon icon="pencil" className="text-sm" />
              </button>
              <button 
                className="btn btn-icon btn-sm btn-danger"
                onClick={() => onDelete(info.row.original.id)}
                title="Delete"
              >
                <KeenIcon icon="trash" className="text-sm" />
              </button>
            </div>
          );
        },
        meta: {
          className: 'w-[100px]'
        }
      }
    ],
    [onEdit, onDelete]
  );

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Services List</h3>
        <div className="flex items-center gap-2">
          <label className="input input-sm">
            <KeenIcon icon="magnifier" className="text-sm" />
            <input placeholder="Search services..." type="text" />
          </label>
          <select className="select select-sm">
            <option value="">Filter by Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="card-body">
        <DataGrid
          columns={columns}
          data={services}
          pagination={{ size: 5 }}
          sorting={[{ id: 'name', desc: false }]}
          rowSelect={false}
        />
      </div>
    </div>
  );
};

export default ServiceList;