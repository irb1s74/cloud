import React, { FC } from 'react';
import './Avatar.scss';
import { IUser } from '../../../models/IUser';
import { HiOutlineUser } from 'react-icons/hi';

interface AvatarProps {
  user?: IUser;
}

const Avatar: FC<AvatarProps> = ({ user = {} as IUser }) => {
  return (
    <div className='avatar'>
      <img
        loading='lazy'
        src={'avatar' in user ? user.avatar : undefined}
        alt={'nickname' in user ? user.nickname : ''}
        className='avatar__image'
      />
      <HiOutlineUser size={25} className='avatar__icon' />
    </div>
  );
};

export default Avatar;
