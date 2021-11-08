import React from 'react';
import noPhoto from '../images/noProfilePhoto.png';

const photoStyle = (user, windowWidth) => {
  const style = {
    backgroundImage: `url(${
      user.userImage === '' || null || !user.userImage
        ? noPhoto
        : user.userImage
    })`,
    marginRight: windowWidth <= 417 ? '-19px' : null,
  };

  return style;
};

// margin-right: -19px;
// windowWidth <= 417
//               ? { marginRight: '10px' }
//               : { marginRight: '40px' }

const UserPhotoComponent = ({ user, windowWidth }) => {
  return (
    <div
      className='userPhoto'
      // style={{
      //   backgroundImage: `url(${
      //     user.userImage === '' || null || !user.userImage
      //       ? noPhoto
      //       : user.userImage
      //   })`,
      // }}
      style={photoStyle(user, windowWidth)}
      title={!user.userImage ? 'Add image' : 'User image'}
    ></div>
  );
};

export default UserPhotoComponent;
