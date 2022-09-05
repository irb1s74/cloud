import React, { FC, memo, useRef } from 'react';
import { HiCloudUpload, HiOutlinePlus } from 'react-icons/hi';
import { IModal } from '../../../models/IModal';
import { EModal } from '../../../models/EModal';
import fileAPI from '../../../api/FileService';
import { useSearchParams } from 'react-router-dom';
import { IUser } from '../../../models/IUser';

interface SidebarButtonsProps {
  user: IUser;
  setModal: (payload: IModal) => void;
}

const SidebarButtons: FC<SidebarButtonsProps> = ({ setModal, user }) => {
  const [usePath] = useSearchParams();
  const [uploadFile] = fileAPI.useUploadFileMutation();

  const handleOpenCreateDirModal = () => {
    setModal({ id: EModal.createDir, type: EModal.createDir, option: {} });
  };
  const files = useRef(document.createElement('input'));

  const handleUpdateFiles = () => {
    const path = usePath.get('path');
    if (files.current.files && files.current.files.length) {
      Array.from(files.current.files).forEach(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', path ? path : '');
        await uploadFile({
          token: user.token,
          formData,
        });
      });
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
