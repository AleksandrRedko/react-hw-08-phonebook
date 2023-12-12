import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import s from './Contact.module.css';

function Contact({ id, name, number, fnDelete, handleEditContact }) {
  return (
    <li className={s.item} >
      <p>
        <strong>{name}</strong>: {number}
      </p>
      <div>
        <button
          className={s.buttonEdite}
          onClick={() => handleEditContact({ id, name, number })}
        >
          <FaUserEdit color="white" />
        </button>
        <button className={s.button} onClick={() => fnDelete(id)}>
          <MdDelete color="white" />
        </button>
      </div>
    </li>
  );
}

export default Contact;
