import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RiUserAddLine } from "react-icons/ri";

import s from './Contacts.module.css'

import Form from '../../Components/Form/Form';
import ContactList from '../../Components/ContactList/ContactList';
import Filter from '../../Components/Filter/Filter';
import Spinner from '../../Components/Spinner/Spinner';
import Modal from '../../Components/Modal/Modal';

import { getContacts } from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';

export default function Contacts() {
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();
  const { items, error, isLoading } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div className={s.container}  >
        <button className={s.button} onClick={() => setModalActive(true)}><RiUserAddLine size={'20px'} style={{marginRight:'5px'}}/>Add</button>

        {items.length > 0 && <Filter />}
      </div>
      {items.length > 0 && <ContactList />}

      <Modal active={modalActive} setActive={setModalActive}>
        <Form setActive={setModalActive} />
      </Modal>
      {isLoading && !error && <Spinner />}
    </div>
  );
}
