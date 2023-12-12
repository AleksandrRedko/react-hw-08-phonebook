import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchContacts, deleteContact } from '../../redux/contacts/operations';
import { getContacts, getFilter } from '../../redux/contacts/selectors';
import Contact from '../Contact/Contact';
import EditForm from '../EditForm/EditForm';
import Modal from '../Modal/Modal';

import s from './ContactsList.module.css';

const ContactList = () => {
  const [modalActive, setModalActive] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const dispatch = useDispatch();
  const { items } = useSelector(getContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filter = useSelector(getFilter);

  const getVisibleContactsList = () => {
    const normolizedFilter = filter.request.toLowerCase().trim();
    return items.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter)
    );
  };
  const visibleContacts = getVisibleContactsList();

  const handleEditContact = contact => {
    setModalActive(true);
    setCurrentContact(contact);
  };

  const fnDelete = id => {
    dispatch(deleteContact(id));
    Notify.success('contact deleted',{position:'center-top'});
  };

  return (
    <>
      <ol className={s.list}>
        {visibleContacts.map(({ id, name, number }) => (
          <Contact
            key={id}
            handleEditContact={handleEditContact}
            id={id}
            name={name}
            number={number}
            fnDelete={fnDelete}
          />
        ))}
      </ol>
      <Modal active={modalActive} setActive={setModalActive}>
        <EditForm currentContact={currentContact} setActive={setModalActive} />
      </Modal>
    </>
  );
};

export default ContactList;
