import isEmpty from 'lodash/isEmpty';
import { type AriaAttributes } from 'react';
import { MenuItem } from './MenuItem';
import type { TMenuItemBase, TMenuItemEnhanced } from './MenuItem.d';

export const createMenu = (menuItems: TMenuItemBase[], onClick?: (event: React.MouseEvent<HTMLElement>) => void, basePath?: string) =>
  menuItems.map(menuItem => (
    <MenuItemEnhanced key={menuItem.label} basePath={basePath} {...menuItem} onClick={onClick} classModifierItem={menuItem.classModifierItem} />
  ));

const MenuItemEnhanced = ({
  url,
  label,
  classModifier,
  children,
  basePath,
  classModifierItem,
  createMenuFn = createMenu,
  ...props
}: TMenuItemEnhanced) => {
  const newClassModifier = [classModifier, classModifierItem, children ? 'haschild' : ''].join(' ').trim();
  const ariaProps = url
    ? {
        ariaHaspopup: 'true' as AriaAttributes['aria-haspopup'],
        ariaExpanded: 'false' as AriaAttributes['aria-expanded'],
        ariaLabel: label,
      }
    : {};
  const newUrl = !isEmpty(basePath) && !isEmpty(url) ? `${basePath}/${url}` : url;

  return (
    <MenuItem {...props} basePath={basePath} createMenuFn={createMenuFn} url={newUrl} label={label} classModifier={newClassModifier} {...ariaProps}>
      {children}
    </MenuItem>
  );
};

export default MenuItemEnhanced;
