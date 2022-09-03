import React, { FC, memo } from 'react';
import { HiCloudUpload, HiOutlinePlus } from 'react-icons/hi';
import { IModal } from '../../../models/IModal';
import { EModal } from '../../../models/EModal';

interface SidebarButtonsProps {
  setModal: (payload: IModal) => void;
}

const SidebarButtons: FC<SidebarButtonsProps> = ({ setModal }) => {
  const handleOpenCreateDirModal = () => {
    setModal({ id: EModal.createDir, type: EModal.createDir, option: {} });
  };
  return (
    <div className='sidebar__buttons'>
      <button className='btn-reset sidebar__button sidebar__button-accent'>
        <HiCloudUpload className='sidebar__uploadIcon' size={25} />
        Загрузить
      </button>
      <button
        onClick={handleOpenCreateDirModal}
        className='btn-reset sidebar__button'
      >
        <HiOutlinePlus className='sidebar__uploadIcon' size={25} />
        Создать
      </button>
    </div>
  );
};

export default memo(SidebarButtons);
