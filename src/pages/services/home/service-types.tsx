export interface ServiceField {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
  label?: string;
}

export interface ServiceType {
  id: string;
  name: string;
  fields: ServiceField[];
  defaultCategories: string[];
}

export const serviceTypes: Record<string, ServiceType> = {
  restaurant: {
    id: 'restaurant',
    name: 'Restaurant',
    fields: [
      { name: 'name', type: 'text', required: true, label: 'Service Name' },
      { name: 'description', type: 'text', required: false, label: 'Description' },
      { name: 'price', type: 'number', required: true, label: 'Price' },
      { name: 'category', type: 'select', options: [], required: true, label: 'Category' },
      { 
        name: 'dietary_options', 
        type: 'multiselect', 
        options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'], 
        required: false,
        label: 'Dietary Options' 
      },
    ],
    defaultCategories: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
  },
  salon: {
    id: 'salon',
    name: 'Salon',
    fields: [
      { name: 'name', type: 'text', required: true, label: 'Service Name' },
      { name: 'description', type: 'text', required: false, label: 'Description' },
      { name: 'price', type: 'number', required: true, label: 'Price' },
      { name: 'duration', type: 'number', required: true, label: 'Duration (minutes)' },
      { name: 'category', type: 'select', options: [], required: true, label: 'Category' },
    ],
    defaultCategories: ['Haircut', 'Coloring', 'Styling', 'Nail Care', 'Facial'],
  },
  sports_facility: {
    id: 'sports_facility',
    name: 'Sports Facility',
    fields: [
      { name: 'name', type: 'text', required: true, label: 'Service Name' },
      { name: 'description', type: 'text', required: false, label: 'Description' },
      { name: 'price_per_hour', type: 'number', required: true, label: 'Price per Hour' },
      { name: 'sport_type', type: 'select', options: [], required: true, label: 'Sport Type' },
      { name: 'max_capacity', type: 'number', required: true, label: 'Maximum Capacity' },
    ],
    defaultCategories: ['Football', 'Basketball', 'Tennis', 'Swimming'],
  },
  clinic: {
    id: 'clinic',
    name: 'Clinic',
    fields: [
      { name: 'name', type: 'text', required: true, label: 'Service Name' },
      { name: 'description', type: 'text', required: false, label: 'Description' },
      { name: 'price', type: 'number', required: true, label: 'Price' },
      { name: 'duration', type: 'number', required: true, label: 'Duration (minutes)' },
      { name: 'speciality', type: 'select', options: [], required: true, label: 'Speciality' },
      { 
        name: 'insurance_accepted', 
        type: 'multiselect', 
        options: ['Medicare', 'Medicaid', 'Private Insurance'], 
        required: false,
        label: 'Accepted Insurance' 
      },
    ],
    defaultCategories: ['General', 'Dental', 'Pediatric', 'Orthopedic'],
  },
};