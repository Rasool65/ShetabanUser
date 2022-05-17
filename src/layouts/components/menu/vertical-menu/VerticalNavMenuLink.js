// ** React Imports
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';

const VerticalNavMenuLink = ({ item, activeItem, setActiveItem, currentActiveItem }) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink;

  // ** Hooks
  const { t } = useTranslation();
  const location = useNavigate();

  useEffect(() => {
    if (currentActiveItem) {
      setActiveItem(currentActiveItem);
    }
  }, [location]);

  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem,
      })}
    >
      <LinkTag
        className={({ isActive }) => {
          if (isActive) {
            currentActiveItem = item.navLink;
          }
          return 'd-flex align-items-center';
        }}
        target={item.newTab ? '_blank' : undefined}
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/',
            }
          : {
              to: item.navLink || '/',
            })}
        onClick={(e) => {
          if (item.navLink.length === 0 || item.navLink === '#' || item.disabled === true) {
            e.preventDefault();
          }
        }}
      >
        {item.icon}
        <span className="menu-item text-truncate">{t(item.title)}</span>

        {item.badge && item.badgeText ? (
          <Badge className="ms-auto me-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  );
};

export default VerticalNavMenuLink;
