import React, { useState } from 'react';
import { KeenIcon } from '@/components';

type SectionId = 
  | 'header' 
  | 'customerInfo' 
  | 'serviceSelection' 
  | 'dateTime' 
  | 'bookingSummary' 
  | 'payment' 
  | 'footer';

interface Section {
  id: SectionId;
  label: string;
  icon: string;
  fields: Field[];
}

interface Field {
  type: 'toggle' | 'text' | 'checkbox' | 'select';
  label: string;
  key: string;
  options?: string[];
  default?: boolean | string;
}

const Layout: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<SectionId>('header');
  const [showPreview, setShowPreview] = useState(false);
  const [sectionConfigs, setSectionConfigs] = useState<Record<string, any>>({});

  const sections: Section[] = [
    {
      id: 'header',
      label: 'Header',
      icon: 'abstract-24',
      fields: [
        { type: 'toggle', label: 'Show Logo', key: 'showLogo', default: true },
        { type: 'text', label: 'Header Title', key: 'title', default: 'Book Now' },
        { type: 'toggle', label: 'Show Navigation', key: 'showNav', default: true }
      ]
    },
    {
      id: 'customerInfo',
      label: 'Customer Information',
      icon: 'user',
      fields: [
        { type: 'toggle', label: 'Required Fields', key: 'required', default: true },
        { 
          type: 'checkbox', 
          label: 'Fields to Display', 
          key: 'fields',
          options: ['Name', 'Email', 'Phone', 'Address'] 
        }
      ]
    },
    {
      id: 'serviceSelection',
      label: 'Service Selection',
      icon: 'briefcase',
      fields: [
        { type: 'toggle', label: 'Show Service Images', key: 'showImages', default: true },
        { type: 'toggle', label: 'Show Description', key: 'showDesc', default: true },
        { type: 'toggle', label: 'Show Duration', key: 'showDuration', default: true },
        { type: 'toggle', label: 'Show Price', key: 'showPrice', default: true }
      ]
    },
    {
      id: 'dateTime',
      label: 'Date and Time Selection',
      icon: 'calendar',
      fields: [
        { type: 'select', label: 'Calendar Type', key: 'calendarType', options: ['Monthly', 'Weekly', 'Daily'] },
        { type: 'toggle', label: 'Show Unavailable Slots', key: 'showUnavailable', default: true },
        { type: 'toggle', label: 'Enable Multiple Slots', key: 'multipleSlots', default: false }
      ]
    },
    {
      id: 'bookingSummary',
      label: 'Booking Summary',
      icon: 'clipboard',
      fields: [
        { type: 'toggle', label: 'Show Price Breakdown', key: 'showBreakdown', default: true },
        { type: 'toggle', label: 'Show Service Details', key: 'showDetails', default: true },
        { type: 'toggle', label: 'Show Date & Time', key: 'showDateTime', default: true }
      ]
    },
    {
      id: 'payment',
      label: 'Payment Information',
      icon: 'two-credit-cart',
      fields: [
        { type: 'toggle', label: 'Allow Online Payment', key: 'onlinePayment', default: true },
        { type: 'toggle', label: 'Require Deposit', key: 'requireDeposit', default: false },
        { type: 'toggle', label: 'Show Price Summary', key: 'showSummary', default: true }
      ]
    },
    {
      id: 'footer',
      label: 'Footer',
      icon: 'abstract-25',
      fields: [
        { type: 'toggle', label: 'Show Contact Info', key: 'showContact', default: true },
        { type: 'toggle', label: 'Show Social Links', key: 'showSocial', default: true },
        { type: 'text', label: 'Footer Text', key: 'footerText', default: '' }
      ]
    }
  ];

  const handleFieldChange = (sectionId: SectionId, key: string, value: any) => {
    setSectionConfigs(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [key]: value
      }
    }));
  };

  const getCurrentSection = () => sections.find(s => s.id === selectedSection);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-5">
      {/* Left Sidebar - Section Editor */}
      <div className="card">
        <div className="card-header" id="section_editor">
          <h3 className="card-title">Section Editor</h3>
        </div>
        <div className="card-body lg:py-7.5">
          <div className="grid gap-2.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`flex items-center justify-start gap-2.5 w-full p-3.5 rounded-lg text-left ${
                  selectedSection === section.id
                    ? 'bg-primary-light text-primary'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <KeenIcon icon={section.icon} className="text-xl" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Configuration */}
      <div className="card">
        <div className="card-header flex items-center justify-between" id="configuration">
          <h3 className="card-title">Configuration</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-light btn-sm"
          >
            <KeenIcon icon="eye" className="text-xl mr-2" />
            <span className="text-sm font-medium">Preview</span>
          </button>
        </div>
        <div className="card-body lg:py-7.5">
          {showPreview ? (
            <PreviewMode config={sectionConfigs} />
          ) : (
            <EditMode
              section={getCurrentSection()}
              config={sectionConfigs[selectedSection] || {}}
              onChange={(key, value) => handleFieldChange(selectedSection, key, value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface EditModeProps {
  section?: Section;
  config: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

const EditMode: React.FC<EditModeProps> = ({ section, config, onChange }) => {
  if (!section) return null;

  return (
    <div className="grid gap-5">
      {section.fields.map((field, index) => (
        <div key={index} className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-2.5">
          <div className="text-sm font-medium text-gray-800">{field.label}</div>
          <div className="grow">
            {field.type === 'toggle' ? (
              <label className="switch">
                <input
                  type="checkbox"
                  checked={config[field.key] ?? field.default}
                  onChange={(e) => onChange(field.key, e.target.checked)}
                  value="1"
                />
                <span className="switch-label text-gray-800">{config[field.key] ? 'On' : 'Off'}</span>
              </label>
            ) : field.type === 'text' ? (
              <input
                className="input"
                type="text"
                value={config[field.key] ?? field.default}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder="Enter value"
              />
            ) : field.type === 'select' && field.options ? (
              <select
                className="select"
                value={config[field.key] ?? field.options[0]}
                onChange={(e) => onChange(field.key, e.target.value)}
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' && field.options ? (
              <div className="flex flex-col gap-4">
                {field.options.map((option) => (
                  <label key={option} className="checkbox-group">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={config[field.key]?.includes(option)}
                      onChange={(e) => {
                        const currentValues = config[field.key] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v: string) => v !== option);
                        onChange(field.key, newValues);
                      }}
                      value={option}
                    />
                    <span className="checkbox-label">{option}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
      <div className="flex justify-end pt-2.5">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

const PreviewMode: React.FC<{ config: Record<string, any> }> = ({ config }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="max-w-4xl mx-auto">
        {/* Header Preview */}
        {config.header?.showLogo && (
          <div className="card mb-5">
            <div className="card-header">
              <h3 className="card-title">{config.header?.title || 'Book Now'}</h3>
            </div>
            <div className="card-body lg:py-7.5">
              {config.header?.showNav && (
                <div className="flex gap-5">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-primary">Home</a>
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-primary">Services</a>
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-primary">Contact</a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Service Selection Preview */}
        {config.serviceSelection?.showImages && (
          <div className="card mb-5">
            <div className="card-header">
              <h3 className="card-title">Services</h3>
            </div>
            <div className="card-body lg:py-7.5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="border border-gray-200 rounded-xl p-3.5">
                  <div className="w-full h-32 bg-gray-100 rounded-lg mb-2.5" />
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Sample Service</h4>
                  {config.serviceSelection?.showDesc && (
                    <p className="text-2sm text-gray-700 mb-2">Service description goes here</p>
                  )}
                  <div className="flex items-center justify-between">
                    {config.serviceSelection?.showDuration && (
                      <span className="text-2sm text-gray-700">60 min</span>
                    )}
                    {config.serviceSelection?.showPrice && (
                      <span className="text-sm font-medium text-gray-900">$99</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Date Time Preview */}
        <div className="card mb-5">
          <div className="card-header">
            <h3 className="card-title">Select Date & Time</h3>
          </div>
          <div className="card-body lg:py-7.5">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="text-center text-gray-700">Calendar Preview</div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        {config.bookingSummary?.showDetails && (
          <div className="card mb-5">
            <div className="card-header">
              <h3 className="card-title">Booking Summary</h3>
            </div>
            <div className="card-body lg:py-7.5">
              <div className="grid gap-2.5">
                {config.bookingSummary?.showDateTime && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Date & Time</span>
                    <span className="text-sm font-medium text-gray-900">Dec 29, 2024 10:00 AM</span>
                  </div>
                )}
                {config.bookingSummary?.showBreakdown && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Total</span>
                    <span className="text-sm font-medium text-gray-900">$99.00</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {(config.footer?.showContact || config.footer?.showSocial) && (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Footer</h3>
            </div>
            <div className="card-body lg:py-7.5">
              <div className="grid gap-5">
                {config.footer?.showContact && (
                  <div className="flex flex-col items-center gap-2.5">
                    <span className="text-sm text-gray-700">Contact Information:</span>
                    <div className="text-sm font-medium text-gray-900">
                      Email: contact@example.com
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Phone: (555) 123-4567
                    </div>
                  </div>
                )}
                {config.footer?.showSocial && (
                  <div className="flex flex-col items-center gap-2.5">
                    <span className="text-sm text-gray-700">Follow Us:</span>
                    <div className="flex items-center gap-5">
                      <a href="#" className="btn btn-icon btn-light">
                        <KeenIcon icon="facebook" className="text-xl text-gray-500 hover:text-primary" />
                      </a>
                      <a href="#" className="btn btn-icon btn-light">
                        <KeenIcon icon="twitter" className="text-xl text-gray-500 hover:text-primary" />
                      </a>
                      <a href="#" className="btn btn-icon btn-light">
                        <KeenIcon icon="instagram" className="text-xl text-gray-500 hover:text-primary" />
                      </a>
                    </div>
                  </div>
                )}
                {config.footer?.footerText && (
                  <div className="text-center text-2sm text-gray-700">
                    {config.footer.footerText}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Layout };