import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './LoginForm.module.css';
import { logIn } from '../../redux/auth/operations';

export const LoginForm = () => {
    const initialFormData = {    
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await dispatch(logIn(formData)).unwrap();
      Notify.success('You have successfully logged in our service',{position:'center-top'});
      resetForm();
    } catch (error) {
      Notify.failure('Login failed. Please check your credentials.',{position:'center-top'});
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Welcome back!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            className={css.email}
            placeholder="email"
            required
          />
        </label>
        <label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className={css.pwd}
            placeholder="password"
            required
          />
        </label>
        <button type="submit" className={css.register}>
          <span>Login</span>
        </button>
        <Link to="/register">
          <button type="button" className={css.signin}>
            <span>SignUp</span>
          </button>
        </Link>
      </form>
      
    </div>
  );
};
