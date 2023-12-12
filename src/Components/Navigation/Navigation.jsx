import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/index';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}
        to="/"
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}
          to="/contacts"
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
