import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { register } from '../../redux/auth/operations';

import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialFormData = {
    name: '',
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      Notify.success('You have successfully registered. Please log in.',{position:'center-top'});
      resetForm();
    } catch (error) {
      Notify.failure('Registration failed. Please try again later.',{position:'center-top'});
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Welcome! Sign Up</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            className={css.name}
            placeholder="name"
            required
          />
        </label>
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
        <label className={css.label}>
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
          <span>SignUp</span>
        </button>
        <Link to="/login">
          <button type="button" className={css.signin}>
            <span>Login</span>
          </button>
        </Link>
      </form>
    </div>
  );
};
