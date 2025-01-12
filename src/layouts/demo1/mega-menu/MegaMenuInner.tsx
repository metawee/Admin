import { Fragment, useEffect, useState } from 'react';
import { useResponsive } from '@/hooks';
import { KeenIcon } from '@/components';
import { TMenuConfig, MenuItem, MenuLink, MenuTitle, MenuArrow, Menu } from '@/components/menu';
import {
  MegaMenuSubProfiles,
  MegaMenuSubAccount,
  MegaMenuSubNetwork,
  MegaMenuSubAuth,
  MegaMenuSubHelp
} from '@/partials/menu/mega-menu';
import { useDemo1Layout } from '../Demo1LayoutProvider';
import { Link } from 'react-router-dom';
import { HeaderTop } from './HeaderTop';

const MegaMenuInner = () => {
  const desktopMode = useResponsive('up', 'lg');
  const [disabled, setDisabled] = useState(true); // Initially set disabled to true
  const { layout, sidebarMouseLeave, setMegaMenuEnabled } = useDemo1Layout();

  // Change disabled state to false after a certain time (e.g., 5 seconds)
  useEffect(() => {
    setDisabled(true);

    const timer = setTimeout(() => {
      setDisabled(false);
    }, 1000); // 1000 milliseconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [layout.options.sidebar.collapse, sidebarMouseLeave]);

  useEffect(() => {
    setMegaMenuEnabled(true);
  });

  const build = (items: TMenuConfig) => {
    const homeItem = items[0];
    const publicProfilesItem = items[1];
    const myAccountItem = items[2];
    const networkItem = items[3];
    const authItem = items[4];
    const helpItem = items[5];

    const linkClass = 'menu-link text-sm text-gray-700 font-medium menu-link-hover:text-primary menu-item-active:text-gray-900 menu-item-show:text-primary menu-item-here:text-gray-900';
    const titleClass = 'text-nowrap';

    return (
      <Fragment>
        <MenuItem key="home">
          <MenuLink path={homeItem.path} className={linkClass}>
            <MenuTitle className={titleClass}>{homeItem.title}</MenuTitle>
          </MenuLink>
        </MenuItem>

        <MenuItem
          key="public-profiles"
          toggle={desktopMode ? 'dropdown' : 'accordion'}
          trigger={desktopMode ? 'hover' : 'click'}
          dropdownProps={{
            placement: 'bottom-start'
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{publicProfilesItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubProfiles(items)}
        </MenuItem>

        <MenuItem
          key="my-account"
          toggle={desktopMode ? 'dropdown' : 'accordion'}
          trigger={desktopMode ? 'hover' : 'click'}
          dropdownProps={{
            placement: 'bottom-start',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-300, 0] // [skid, distance]
                }
              }
            ]
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{myAccountItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubAccount(items)}
        </MenuItem>

        <MenuItem
          key="network"
          toggle={desktopMode ? 'dropdown' : 'accordion'}
          trigger={desktopMode ? 'hover' : 'click'}
          dropdownProps={{
            placement: 'bottom-start',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-300, 0] // [skid, distance]
                }
              }
            ]
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{networkItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubNetwork(items)}
        </MenuItem>

        <MenuItem
          key="auth"
          toggle={desktopMode ? 'dropdown' : 'accordion'}
          trigger={desktopMode ? 'hover' : 'click'}
          dropdownProps={{
            placement: 'bottom-start',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-300, 0] // [skid, distance]
                }
              }
            ]
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{authItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubAuth(items)}
        </MenuItem>

        <MenuItem
          key="help"
          toggle={desktopMode ? 'dropdown' : 'accordion'}
          trigger={desktopMode ? 'hover' : 'click'}
          dropdownProps={{
            placement: 'bottom-start',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-20, 0] // [skid, distance]
                }
              }
            ]
          }}
        >
          <MenuLink className={linkClass}>
            <MenuTitle className={titleClass}>{helpItem.title}</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {MegaMenuSubHelp(items)}
        </MenuItem>
      </Fragment>
    );
  };

  const buildArrow = () => {
    return (
      <MenuArrow className="flex lg:hidden text-gray-400">
        <KeenIcon icon="plus" className="text-2xs menu-item-show:hidden" />
        <KeenIcon icon="minus" className="text-2xs hidden menu-item-show:inline-flex" />
      </MenuArrow>
    );
  };

  return (
    <div className="flex items-center gap-2">
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

export { MegaMenuInner };
