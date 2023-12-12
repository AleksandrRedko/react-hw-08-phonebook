import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/contacts/selectors';

import { changeFilter } from '../../redux/contacts/sliceFilter';
import s from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChangeFilter = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  return (
    <label className={s.label}>
      <input
        type="text"
        value={filter.request}
        onChange={handleChangeFilter}
        placeholder="Find contacts by name"
      />
    </label>
  );
};

export default Filter;
