import React from 'react';

const Footer = ({
  windowWidth,
  tweeterHome,
  showHomeHandler,
  showHomeRef,
  tweeterExplore,
  showExploreHandler,
  showExploreRef,
  tweeterBookmarks,
  showBookmarksHandler,
  showBookmarksRef,
}) => {
  const footerStyle = {
    width: windowWidth <= 417 && '100%',
    // position: windowWidth <= 417 && 'fixed',
  };

  // console.log(tweeterHome);
  // console.log(tweeterExplore);
  // console.log(tweeterBookmarks);

  const iconStyle = (icon) => {
    const style = {
      color: icon ? '#0F719C' : '#828282',
      fontSize: '24px',
    };
    return style;
  };

  return (
    <div>
      {windowWidth > 850 ? (
        <footer className='Footer'>
          <p className='FooterText'>created by debo9210 - devChallenges.io</p>
        </footer>
      ) : windowWidth <= 850 ? (
        <div className='NavLink2' style={footerStyle}>
          <i
            className='material-icons LinkItem'
            style={iconStyle(tweeterHome)}
            onClick={showHomeHandler}
            ref={showHomeRef}
            title='Home'
          >
            home
          </i>
          <i
            className='material-icons LinkItem'
            style={iconStyle(tweeterExplore)}
            onClick={showExploreHandler}
            ref={showExploreRef}
            title='Explore'
          >
            explore
          </i>
          <i
            className='material-icons LinkItem'
            style={iconStyle(tweeterBookmarks)}
            onClick={showBookmarksHandler}
            ref={showBookmarksRef}
            title='Bookmark'
          >
            bookmark
          </i>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
