// HeaderTop.tsx
import { KeenIcon } from '@/components';
import { MenuItem, MenuLink, MenuTitle, Menu, MenuToggle, MenuSub } from '@/components/menu';
import { Link } from 'react-router-dom';

const HeaderTop = () => {
  const months = [
    { title: 'UrbanNest' },
    { title: 'Celestial Finds' },
    { title: 'BohoChic Bazaar' }
  ];

  return (
    <div className="flex items-center gap-2"> {/* Parent element */}
      <Menu className="menu-default w-[120px]">
        <MenuItem
          toggle="dropdown"
          trigger="hover"
          dropdownProps={{
            placement: 'bottom-start',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 0]
                }
              }
            ]
          }}
        >
          <MenuToggle className="btn btn-light btn-sm flex-nowrap">
            <span className="flex items-center me-1">
              <KeenIcon icon="shop" className="!text-md" />
            </span>
            <span className="hidden md:inline text-nowrap">RafaShop</span>
            <span className="flex items-center">
              <KeenIcon icon="down" className="!text-xs" />
            </span>
          </MenuToggle>
          <MenuSub className="menu-default w-48 py-2 scrollable-y max-h-[250px]">
            {months.map((item, index) => (
              <MenuItem key={index}>
                <MenuLink path="#">
                  <MenuTitle>{item.title}</MenuTitle>
                </MenuLink>
              </MenuItem>
            ))}
          </MenuSub>
        </MenuItem>
      </Menu>
      <div className="border-e border-gray-200 h-5 mx-4"></div>
      <div className="flex items-center gap-1.5 lg:gap-3.5">
        <div className="flex flex-col items-end pt-0.5">
          <span className="inline-flex gap-0.5 text-gray-800 font-medium text-2xs uppercase">
            <KeenIcon icon="crown-2" style="solid" />
            free
          </span>
          <span className="text-gray-700 text-xs">
            182/200 <span className="hidden sm:inline-block">Uploads</span>
          </span>
        </div>

        <Link to="/account/security/privacy-settings" className="btn btn-sm btn-primary">
          Upgrade
          <KeenIcon icon="arrow-up" />
        </Link>
      </div>
    </div>
  );
};

export { HeaderTop };