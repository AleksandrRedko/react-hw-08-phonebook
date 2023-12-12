
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { updateContact } from '../../redux/contacts/operations';
import s from './EditForm.module.css';

function EditForm({ currentContact, setActive }) {
  const dispatch = useDispatch();

  const initialFormData = {
    name: '',
    number: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, number } = formData;
    try {
      await dispatch(updateContact({ currentContact, name, number })).unwrap();
      Notify.success('contact changed',{position:'center-top'});
      setActive(false);
      setFormData(initialFormData);
    } catch (error) {
      Notify.failure('something went wrong...',{position:'center-top'});
    }
  };
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label>
        <input
          className={s.input}
          onChange={handleChange}
          type="text"
          name="name"
          defaultValue={currentContact?.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <input
          className={s.input}
          onChange={handleChange}
          type="tel"
          name="number"
          defaultValue={currentContact?.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={s.button}>Edit contact</button>
    </form>
  );
}

export default EditForm;
