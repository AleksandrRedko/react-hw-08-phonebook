import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { addContact } from '../../redux/contacts/operations';
import { getContacts } from '../../redux/contacts/selectors';

import s from './Form.module.css';

export default function Form({ setActive }) {
  const dispatch = useDispatch();
  const { items } = useSelector(getContacts);

  const initialFormData = {
    name: '',
    number: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const nameUniquenessCheck = newName => {
    return items.some(contact => contact.name === newName);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (nameUniquenessCheck(formData.name)) {
      Notify.info('such contact already exists',{position:'center-top'});
      setFormData(initialFormData);
      setActive(false);
      return;
    }
    try {
      await dispatch(addContact(formData)).unwrap();
      Notify.success('new contact added',{position:'center-top'});
      setFormData(initialFormData);
      setActive(false);
    } catch (error) {
      Notify.failure('something went wrong...',{position:'center-top'});
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label>
        <input
          className={s.input}
          placeholder="Name"
          type="text"
          name="name"
          value={formData.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          className={s.input}
          placeholder="Number"
          type="tel"
          name="number"
          value={formData.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>

      <button className={s.button}>add contact</button>
    </form>
  );
}
