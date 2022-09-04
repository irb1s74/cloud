import React, { FC, memo, useRef } from 'react';
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
  const files = useRef(document.createElement('input'));

  const handleUpdateFiles = () => {
    if (files.current.files) {
      console.log(files.current.files);
    }
  };

  const handleSelectFiles = () => {
    files.current.click();
  };

  return (
    <div className='sidebar__buttons'>
      <button
        onClick={handleSelectFiles}
        className='btn-reset sidebar__button sidebar__button-accent'
      >
        <HiCloudUpload className='sidebar__uploadIcon' size={25} />
        Загрузить
        <input
          ref={files}
          type='file'
          multiple
          onChange={handleUpdateFiles}
          hidden
        />
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
