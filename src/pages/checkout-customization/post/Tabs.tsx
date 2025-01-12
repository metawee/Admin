/* eslint-disable no-unused-vars */
import { KeenIcon } from '@/components';

interface ITabsProps {
  postId: number;
  activeTab: string;
  setActiveTab: (newTab: string) => void;
  className?: string;
}

const Tabs = ({
  postId,
  activeTab,
  setActiveTab,
  className
}: ITabsProps) => {
  return (
    <div
      data-tabs="true"
      className={`flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-2.5 py-3 mb-4 ${className}`}
    >
      <button
        className={`${activeTab === 'layout' ? 'active' : ''} group btn px-3 text-gray-700 hover:text-primary tab-active:bg-primary-light tab-active:border-primary-clarity tab-active:text-primary`}
        onClick={() => {
          setActiveTab('layout');
        }}
        data-tab-toggle={`#post_${postId}_layout`}
      >
        <KeenIcon
          icon="message-text"
          className="text-gray-500 group-hover:text-primary tab-active:text-primary"
        />
         Layout
      </button>
      <button
        className={`${activeTab === 'style' ? 'active' : ''} group btn px-3 text-gray-700 hover:text-primary tab-active:bg-primary-light tab-active:border-primary-clarity tab-active:text-primary`}
        onClick={() => {
          setActiveTab('style');
        }}
        data-tab-toggle={`#post_${postId}_style`}
      >
        <KeenIcon
          icon="heart"
          className="text-gray-500 group-hover:text-primary tab-active:text-primary"
        />
         Style
      </button>
    </div>
  );
};

export { Tabs, type ITabsProps };
