import { Fragment, useState, useEffect } from 'react';
import { Container } from '@/components/container';
import { KeenIcon } from '@/components';
import { CategoryManager } from './CategoryManager';
import ServiceList from './ServiceList';
import { serviceTypes, ServiceType, ServiceField } from './service-types';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/demo1/toolbar';
import { Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownCard2 } from '@/partials/dropdowns/general';

interface Service {
  id: number;
  status?: 'active' | 'inactive';
  createdAt?: string;
  [key: string]: any;
}

const ServicesPage = () => {
  // Initial demo data
  const initialServices: Service[] = [
    {
      id: 1,
      name: "Classic Haircut",
      description: "Professional haircut service",
      price: 200,
      duration: 30,
      category: "Haircut",
      status: "active",
      createdAt: "2024-03-15T10:30:00"
    },
    {
      id: 2,
      name: "Hair Coloring",
      description: "Professional hair coloring service",
      price: 500,
      duration: 120,
      category: "Coloring",
      status: "active",
      createdAt: "2024-03-15T11:00:00"
    },
    {
      id: 3,
      name: "Hair Styling",
      description: "Professional styling service",
      price: 300,
      duration: 60,
      category: "Styling",
      status: "inactive",
      createdAt: "2024-03-15T12:00:00"
    }
  ];

  // States
  const [businessType, setBusinessType] = useState<string>('salon');
  const [services, setServices] = useState<Service[]>(initialServices);
  const [newService, setNewService] = useState<Service>({} as Service);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);

  // Effects
  useEffect(() => {
    setServices(initialServices);
    setNewService({} as Service);
    setEditingService(null);
    setCategories(serviceTypes[businessType].defaultCategories);
  }, [businessType]);

  // Handlers
  const handleAddService = () => {
    if (Object.keys(newService).length > 0) {
      const serviceToAdd: Service = {
        ...newService,
        id: services.length + 1,
        status: 'active' as const,
        createdAt: new Date().toISOString()
      };
      setServices([...services, serviceToAdd]);
      setNewService({} as Service);
      setIsAddingService(false);
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setNewService(service);
    setIsAddingService(true);
  };

  const handleUpdateService = () => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? newService : s));
      setNewService({} as Service);
      setEditingService(null);
      setIsAddingService(false);
    }
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleCategoriesChange = (updatedCategories: string[]) => {
    setCategories(updatedCategories);
    const categoryField = serviceTypes[businessType].fields.find(
      field => ['category', 'sport_type', 'speciality'].includes(field.name)
    );
    if (categoryField) {
      categoryField.options = updatedCategories;
    }
  };

  const renderField = (field: ServiceField) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5" key={field.name}>
            <label className="form-label max-w-56">{field.label || field.name}</label>
            <input
              className="input"
              type={field.type}
              value={newService[field.name] || ''}
              onChange={(e) => setNewService({ ...newService, [field.name]: e.target.value })}
              required={field.required}
              placeholder={`Enter ${field.label || field.name}`}
            />
          </div>
        );
      case 'select':
        return (
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5" key={field.name}>
            <label className="form-label max-w-56">{field.label || field.name}</label>
            <select 
              className="select"
              value={newService[field.name] || ''}
              onChange={(e) => setNewService({ ...newService, [field.name]: e.target.value })}
            >
              <option value="">Select {field.label || field.name}</option>
              {(field.options || categories).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'multiselect':
        return (
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5" key={field.name}>
            <label className="form-label max-w-56">{field.label || field.name}</label>
            <div className="flex flex-col gap-2">
              {field.options?.map((option) => (
                <label key={option} className="checkbox-group">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={(newService[field.name] || []).includes(option)}
                    onChange={(e) => {
                      const currentValues = newService[field.name] || [];
                      const updatedValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((value: string) => value !== option);
                      setNewService({ ...newService, [field.name]: updatedValues });
                    }}
                  />
                  <span className="checkbox-label">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
      <div className="grid gap-5 lg:gap-7.5">
        <Toolbar>
          <ToolbarHeading title="Services Management" description="Manage your business services" />
          <ToolbarActions>
            <Menu className="items-stretch">
              <MenuItem
                toggle="dropdown"
                trigger="click"
                dropdownProps={{
                  placement: 'bottom-end',
                  modifiers: [{ name: 'offset', options: { offset: [0, 10] } }]
                }}
              >
                <MenuToggle className="btn btn-sm btn-icon btn-light">
                  <KeenIcon icon="dots-vertical" />
                </MenuToggle>
                {DropdownCard2()}
              </MenuItem>
            </Menu>
            <button className="btn btn-light btn-sm">
              <KeenIcon icon="cloud-download" className="text-sm me-2" />
              Export
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                setIsAddingService(true);
                setEditingService(null);
                setNewService({} as Service);
              }}
            >
              <KeenIcon icon="plus" className="text-sm me-2" />
              Add Service
            </button>
          </ToolbarActions>
        </Toolbar>

          {/* Direct Form */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Service Details</h3>
            </div>
            <div className="card-body">
              <div className="grid gap-5">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label max-w-56">Business Type</label>
                  <select 
                    className="select"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  >
                    {Object.values(serviceTypes).map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                {serviceTypes[businessType].fields.map((field) => (
                  <Fragment key={field.name}>
                    {renderField(field)}
                  </Fragment>
                ))}

                <div className="flex justify-end">
                  <button 
                    className="btn btn-primary"
                    onClick={editingService ? handleUpdateService : handleAddService}
                  >
                    {editingService ? (
                      <>
                        <KeenIcon icon="check" className="text-sm me-2" />
                        Update Service
                      </>
                    ) : (
                      <>
                        <KeenIcon icon="plus" className="text-sm me-2" />
                        Add Service
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Form */}
          {isAddingService && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button 
                  className="btn btn-icon btn-sm btn-light"
                  onClick={() => {
                    setIsAddingService(false);
                    setEditingService(null);
                    setNewService({} as Service);
                  }}
                >
                  <KeenIcon icon="cross" className="text-sm" />
                </button>
              </div>
              <div className="card-body">
                <div className="grid gap-5">
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                    <label className="form-label max-w-56">Business Type</label>
                    <select 
                      className="select"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                    >
                      {Object.values(serviceTypes).map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  {serviceTypes[businessType].fields.map((field) => renderField(field))}

                  <div className="flex justify-end gap-2">
                    <button 
                      className="btn btn-light"
                      onClick={() => {
                        setIsAddingService(false);
                        setEditingService(null);
                        setNewService({} as Service);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={editingService ? handleUpdateService : handleAddService}
                    >
                      {editingService ? (
                        <>
                          <KeenIcon icon="check" className="text-sm me-2" />
                          Update Service
                        </>
                      ) : (
                        <>
                          <KeenIcon icon="plus" className="text-sm me-2" />
                          Add Service
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ServiceList
            services={services}
            fields={serviceTypes[businessType].fields}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />

          <CategoryManager
            businessType={businessType}
            defaultCategories={serviceTypes[businessType].defaultCategories}
            onCategoriesChange={handleCategoriesChange}
          />
      </div>
  );
};

export { ServicesPage };