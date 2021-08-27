import React from 'react';
import noPhoto from '../images/noProfilePhoto.png';

const UserPhotoComponent = ({ user }) => {
  return (
    <div
      className='userPhoto'
      style={{
        backgroundImage: `url(${
          user.userImage === '' || null || !user.userImage
            ? noPhoto
            : user.userImage
        })`,
      }}
      title={!user.userImage ? 'Add image' : 'User image'}
    ></div>
  );
};

export default UserPhotoComponent;
