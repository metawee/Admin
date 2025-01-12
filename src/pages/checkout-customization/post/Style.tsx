import React, { useState } from 'react';
import { KeenIcon } from '@/components';

type StyleCategory = 'colors' | 'typography' | 'spacing' | 'borders';

type ColorKey = keyof StyleValues['colors'];
type TypographyKey = keyof StyleValues['typography'];
type SpacingKey = keyof StyleValues['spacing'];
type BorderKey = keyof StyleValues['borders'];

interface StyleSection {
  id: StyleCategory;
  label: string;
  icon: string;
}

interface SpacingValue {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface StyleValues {
  colors: {
    background: string;
    text: string;
    button: string;
    buttonText: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
  spacing: {
    padding: SpacingValue;
    margin: SpacingValue;
  };
  borders: {
    width: number;
    style: string;
    color: string;
    radius: number;
  };
}

interface ColorEditorProps {
  values: StyleValues['colors'];
  onChange: (key: ColorKey, value: string) => void;
}

interface TypographyEditorProps {
  values: StyleValues['typography'];
  onChange: (key: TypographyKey, value: string) => void;
}

interface SpacingEditorProps {
  values: StyleValues['spacing'];
  onChange: (key: SpacingKey, value: SpacingValue) => void;
}

interface BorderEditorProps {
  values: StyleValues['borders'];
  onChange: (key: BorderKey, value: string | number) => void;
}

const Style: React.FC = () => {
  const [activeStyleSection, setActiveStyleSection] = useState<StyleCategory>('colors');
  const [styleValues, setStyleValues] = useState<StyleValues>({
    colors: {
      background: '#ffffff',
      text: '#1e293b',
      button: '#3b82f6',
      buttonText: '#ffffff',
      accent: '#0ea5e9',
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 'base',
      fontWeight: 'normal'
    },
    spacing: {
      padding: { top: 16, right: 16, bottom: 16, left: 16 },
      margin: { top: 16, right: 16, bottom: 16, left: 16 }
    },
    borders: {
      width: 1,
      style: 'solid',
      color: '#e5e7eb',
      radius: 8
    }
  });

  const styleCategories: StyleSection[] = [
    { id: 'colors', label: 'Colors', icon: 'flask' },
    { id: 'typography', label: 'Typography', icon: 'text-bold' },
    { id: 'spacing', label: 'Spacing', icon: 'grid' },
    { id: 'borders', label: 'Borders', icon: 'slider-vertical' }
  ];

  const handleColorChange = (key: ColorKey, value: string) => {
    handleStyleChange('colors', key, value);
  };

  const handleTypographyChange = (key: TypographyKey, value: string) => {
    handleStyleChange('typography', key, value);
  };

  const handleSpacingChange = (key: SpacingKey, value: SpacingValue) => {
    handleStyleChange('spacing', key, value);
  };

  const handleBorderChange = (key: BorderKey, value: string | number) => {
    handleStyleChange('borders', key, value);
  };

  const handleStyleChange = <K extends keyof StyleValues>(
    category: K,
    key: keyof StyleValues[K],
    value: StyleValues[K][keyof StyleValues[K]]
  ) => {
    setStyleValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-5">
      {/* Style Categories */}
      <div className="card">
        <div className="card-header" id="style_options">
          <h3 className="card-title">Style Options</h3>
        </div>
        <div className="card-body lg:py-7.5">
          <div className="grid gap-2.5">
            {styleCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveStyleSection(category.id)}
                className={`flex items-center justify-start gap-2.5 w-full p-3.5 rounded-lg text-left ${
                  activeStyleSection === category.id
                    ? 'bg-primary-light text-primary'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <KeenIcon icon={category.icon} className="text-xl" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Style Editor */}
      <div className="grid gap-5">
        <div className="card">
          <div className="card-header" id="style_editor">
            <h3 className="card-title">Style Editor</h3>
          </div>
          <div className="card-body lg:py-7.5">
            {activeStyleSection === 'colors' && (
              <ColorEditor 
                values={styleValues.colors} 
                onChange={(key, value) => handleStyleChange('colors', key, value)} 
              />
            )}
            {activeStyleSection === 'typography' && (
              <TypographyEditor 
                values={styleValues.typography} 
                onChange={(key, value) => handleStyleChange('typography', key, value)} 
              />
            )}
            {activeStyleSection === 'spacing' && (
              <SpacingEditor 
                values={styleValues.spacing} 
                onChange={(key, value) => handleStyleChange('spacing', key, value)} 
              />
            )}
            {activeStyleSection === 'borders' && (
              <BorderEditor 
                values={styleValues.borders} 
                onChange={(key, value) => handleStyleChange('borders', key, value)} 
              />
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="card">
          <div className="card-header" id="live_preview">
            <h3 className="card-title">Live Preview</h3>
          </div>
          <div className="card-body lg:py-7.5">
            <div 
              className="border border-gray-200 rounded-xl p-5"
              style={{
                backgroundColor: styleValues.colors.background,
                color: styleValues.colors.text,
                fontFamily: styleValues.typography.fontFamily,
                fontSize: getFontSize(styleValues.typography.fontSize),
                fontWeight: getFontWeight(styleValues.typography.fontWeight),
                borderWidth: styleValues.borders.width,
                borderStyle: styleValues.borders.style,
                borderColor: styleValues.borders.color,
                borderRadius: styleValues.borders.radius,
                padding: `${styleValues.spacing.padding.top}px ${styleValues.spacing.padding.right}px ${styleValues.spacing.padding.bottom}px ${styleValues.spacing.padding.left}px`,
                margin: `${styleValues.spacing.margin.top}px ${styleValues.spacing.margin.right}px ${styleValues.spacing.margin.bottom}px ${styleValues.spacing.margin.left}px`
              }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-5">Sample Heading</h3>
              <p className="text-sm text-gray-700 mb-5">This is a preview of how your content will look with the current styles.</p>
              <button className="btn btn-primary">
                Sample Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorEditor: React.FC<ColorEditorProps> = ({ values, onChange }) => {
  return (
    <div className="grid gap-5">
      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Background Color</label>
        <div className="grow flex items-center gap-2.5">
          <input
            type="color"
            className="size-10 rounded-lg border border-gray-200"
            value={values.background}
            onChange={(e) => onChange('background', e.target.value)}
          />
          <input
            type="text"
            className="input w-32"
            value={values.background}
            onChange={(e) => onChange('background', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Text Color</label>
        <div className="grow flex items-center gap-2.5">
          <input
            type="color"
            className="size-10 rounded-lg border border-gray-200"
            value={values.text}
            onChange={(e) => onChange('text', e.target.value)}
          />
          <input
            type="text"
            className="input w-32"
            value={values.text}
            onChange={(e) => onChange('text', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Button Color</label>
        <div className="grow flex items-center gap-2.5">
          <input
            type="color"
            className="size-10 rounded-lg border border-gray-200"
            value={values.button}
            onChange={(e) => onChange('button', e.target.value)}
          />
          <input
            type="text"
            className="input w-32"
            value={values.button}
            onChange={(e) => onChange('button', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Button Text Color</label>
        <div className="grow flex items-center gap-2.5">
          <input
            type="color"
            className="size-10 rounded-lg border border-gray-200"
            value={values.buttonText}
            onChange={(e) => onChange('buttonText', e.target.value)}
          />
          <input
            type="text"
            className="input w-32"
            value={values.buttonText}
            onChange={(e) => onChange('buttonText', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Accent Color</label>
        <div className="grow flex items-center gap-2.5">
          <input
            type="color"
            className="size-10 rounded-lg border border-gray-200"
            value={values.accent}
            onChange={(e) => onChange('accent', e.target.value)}
          />
          <input
            type="text"
            className="input w-32"
            value={values.accent}
            onChange={(e) => onChange('accent', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const TypographyEditor: React.FC<TypographyEditorProps> = ({ values, onChange }) => {
  const fontFamilies = ['Cairo', 'Inter', 'Roboto', 'Poppins', 'Open Sans', 'Montserrat'];

  return (
    <div className="grid gap-5">
      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Font Family</label>
        <select 
          className="select grow"
          value={values.fontFamily}
          onChange={(e) => onChange('fontFamily', e.target.value)}
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Font Size</label>
        <select 
          className="select grow"
          value={values.fontSize}
          onChange={(e) => onChange('fontSize', e.target.value)}
        >
          <option value="sm">Small</option>
          <option value="base">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Font Weight</label>
        <select 
          className="select grow"
          value={values.fontWeight}
          onChange={(e) => onChange('fontWeight', e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="semibold">Semibold</option>
          <option value="bold">Bold</option>
        </select>
      </div>
    </div>
  );
};

const SpacingEditor: React.FC<SpacingEditorProps> = ({ values, onChange }) => {
  const handleSpacingChange = (type: 'padding' | 'margin', direction: keyof SpacingValue, value: number) => {
    onChange(type, {
      ...values[type],
      [direction]: value
    });
  };

  return (
    <div className="grid gap-5">
      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Padding</label>
        <div className="grow grid grid-cols-2 gap-2.5">
          <input
            type="number"
            className="input"
            placeholder="Top"
            value={values.padding.top}
            onChange={(e) => handleSpacingChange('padding', 'top', parseInt(e.target.value))}
          />
          <input
            type="number"
            className="input"
            placeholder="Right"
            value={values.padding.right}
            onChange={(e) => handleSpacingChange('padding', 'right', parseInt(e.target.value))}
          />
          <input
            type="number"
            className="input"
            placeholder="Bottom"
            value={values.padding.bottom}
            onChange={(e) => handleSpacingChange('padding', 'bottom', parseInt(e.target.value))}
          />
          <input
            type="number"
            className="input"
            placeholder="Left"
            value={values.padding.left}
            onChange={(e) => handleSpacingChange('padding', 'left', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Margin</label>
        <div className="grow grid grid-cols-2 gap-2.5">
          <input
            type="number"
            className="input"
            placeholder="Top"
            value={values.margin.top}
            onChange={(e) => handleSpacingChange('margin', 'top', parseInt(e.target.value))}
          />
          <input
            type="number"
            className="input"
            placeholder="Right"
            value={values.margin.right}
            onChange={(e) => handleSpacingChange('margin', 'right', parseInt(e.target.value))}
          />
          <input
            type="number"
            className="input"
            placeholder="Bottom"
            value={values.margin.bottom}
            onChange={(e) => handleSpacingChange('margin', 'bottom', parseInt(e.target.value))}
          />
          <input
            type="number"
            className="input"
            placeholder="Left"
            value={values.margin.left}
            onChange={(e) => handleSpacingChange('margin', 'left', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

const BorderEditor: React.FC<BorderEditorProps> = ({ values, onChange }) => {
  return (
    <div className="grid gap-5">
      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Border Width</label>
        <input
          type="number"
          className="input grow"
          value={values.width}
          onChange={(e) => onChange('width', parseInt(e.target.value))}
        />
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Border Style</label>
        <select 
          className="select grow"
          value={values.style}
          onChange={(e) => onChange('style', e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Border Color</label>
        <div className="grow flex items-center gap-2.5">
          <input
            type="color"
            className="size-10 rounded-lg border border-gray-200"
            value={values.color}
            onChange={(e) => onChange('color', e.target.value)}
          />
          <input
            type="text"
            className="input w-32"
            value={values.color}
            onChange={(e) => onChange('color', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        <label className="form-label max-w-56">Border Radius</label>
        <input
          type="number"
          className="input grow"
          value={values.radius}
          onChange={(e) => onChange('radius', parseInt(e.target.value))}
        />
      </div>

      <div className="flex justify-end pt-2.5">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

// Helper functions
const getFontSize = (size: string): string => {
  const sizeMap: Record<string, string> = {
    'sm': '0.875rem',
    'base': '1rem',
    'lg': '1.125rem',
    'xl': '1.25rem'
  };
  return sizeMap[size] || '1rem';
};

const getFontWeight = (weight: string): string => {
  const weightMap: Record<string, string> = {
    'normal': '400',
    'medium': '500',
    'semibold': '600',
    'bold': '700'
  };
  return weightMap[weight] || '400';
};

export { Style };