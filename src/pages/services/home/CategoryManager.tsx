import { useState, useEffect } from 'react';
import { KeenIcon } from '@/components';
import { DataGrid } from '@/components';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

interface CategoryManagerProps {
  businessType: string;
  defaultCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

interface CategoryItem {
  id: number;
  name: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

const CategoryManager = ({ businessType, defaultCategories, onCategoriesChange }: CategoryManagerProps) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const formattedCategories = defaultCategories.map((cat, index) => ({
      id: index + 1,
      name: cat,
      createdAt: new Date().toISOString(),
      status: 'active' as const
    }));
    setCategories(formattedCategories);
  }, [businessType, defaultCategories]);

  const handleAddCategory = () => {
    if (newCategory && !categories.find(cat => cat.name === newCategory)) {
      const newCategoryItem: CategoryItem = {
        id: categories.length + 1,
        name: newCategory,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      const updatedCategories = [...categories, newCategoryItem];
      setCategories(updatedCategories);
      onCategoriesChange(updatedCategories.map(cat => cat.name));
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(updatedCategories);
    onCategoriesChange(updatedCategories.map(cat => cat.name));
  };

  const columns = useMemo<ColumnDef<CategoryItem>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'name',
        header: () => 'Category Name',
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <div className="flex items-center gap-2">
              <KeenIcon icon="category" className="text-gray-500" />
              <span className="text-gray-800">{value}</span>
            </div>
          );
        },
        meta: {
          className: 'min-w-[200px]'
        }
      },
      {
        accessorFn: (row) => row.createdAt,
        id: 'createdAt',
        header: () => 'Created Date',
        cell: (info) => {
          const date = new Date(info.getValue() as string);
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
      {
        accessorFn: (row) => row.status,
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <div className="badge badge-sm badge-outline badge-success">
              {value}
            </div>
          );
        },
        meta: {
          className: 'min-w-[100px]'
        }
      },
      {
        id: 'actions',
        header: () => '',
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <button 
                className="btn btn-icon btn-sm btn-light"
                onClick={() => handleDeleteCategory(info.row.original.id)}
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
    []
  );

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Category Management</h3>
        <div className="flex items-center gap-2">
          <label className="input input-sm">
            <KeenIcon icon="magnifier" className="text-sm" />
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </label>
          <button className="btn btn-primary btn-sm" onClick={handleAddCategory}>
            <KeenIcon icon="plus" className="text-sm me-2" />
            Add Category
          </button>
        </div>
      </div>
      <div className="card-body">
        <DataGrid
          columns={columns}
          data={categories}
          pagination={{ size: 5 }}
          sorting={[{ id: 'name', desc: false }]}
        />
      </div>
    </div>
  );
};

export { CategoryManager };