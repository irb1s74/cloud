import React from 'react';
import { HiCloudUpload, HiOutlinePlus } from 'react-icons/hi';

const SidebarButtons = () => {
  return (
    <div className='sidebar__buttons'>
      <button className='btn-reset sidebar__button sidebar__button-acent'>
        <HiCloudUpload className='sidebar__uploadIcon' size={25} />
        Загрузить
      </button>
      <button className='btn-reset sidebar__button'>
        <HiOutlinePlus className='sidebar__uploadIcon' size={25} />
        Создать
      </button>
    </div>

  );
};

export default SidebarButtons;
