/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { DataGrid, DefaultTooltip, KeenIcon } from '@/components';

import { Layout, Style, Tabs } from '../post/';


const CheckoutCustomizationPage = () => {

  const [activeTab, setActiveTab] = useState('layout');

  return (
    <div className="card">
      <div className="card-body">
        <div>
          <Tabs
            postId={1}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === 'layout' && (
            <div id="post_1_layout">
              <Layout />
            </div>
          )}
          {activeTab === 'style' && (
            <div id="post_1_style">
              <Style />
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export { CheckoutCustomizationPage };
