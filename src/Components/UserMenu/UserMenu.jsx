import { useDispatch } from 'react-redux';
import { GrLogout } from 'react-icons/gr';
import { LiaUserSecretSolid } from 'react-icons/lia';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useAuth } from '../../hooks/index';
import { logOut } from '../../redux/auth/operations';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      Notify.success('You have successfully logged out',{position:'center-top'});
    } catch (error) {
      Notify.failure('Logout failed. Please try again.',{position:'center-top'});
    }
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>
        <LiaUserSecretSolid size="30px" /> {user.name}
      </p>
      <button className={css.button} type="button" onClick={handleLogout}>
        <GrLogout size="17px" />
      </button>
    </div>
  );
};
