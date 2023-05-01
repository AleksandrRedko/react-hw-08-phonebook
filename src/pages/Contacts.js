import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Form from '../Components/Form/Form';
import ContactList from '../Components/ContactList/ContactList';
import Filter from '../Components/Filter/Filter';
import Spinner from '../Components/Spinner/Spinner';

import { getContacts } from '../redux/contacts/selectors';
import { fetchContacts } from '../redux/contacts/operations';

export default function Contacts() {
  const dispatch = useDispatch();
  const { items, error, isLoading } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <Form />
      {items.length > 0 && (
        <>
          <h2 className="title">Contacts</h2>
          <Filter />
          <ContactList />
        </>
      )}
      {isLoading && !error && <Spinner />}
    </div>
  );
}
