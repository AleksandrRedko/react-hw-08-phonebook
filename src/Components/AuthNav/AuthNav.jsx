import { NavLink } from 'react-router-dom';


export const AuthNav = () => {
  return (
    <div>
      <NavLink
        className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}
        to="/register"
      >
        Register
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink')}
        to="/login"
      >
        Log In
      </NavLink>
    </div>
  );
};
