import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
// eslint-disable-next-line
import { getUser, getAllUsers } from '../redux/actions/getUserActions';
import {
  getAllTweets,
  getSpecificUserTweets,
  createUserComment,
  createUserRetweet,
} from '../redux/actions/userTweetsAction';
import BrandLogo from '../images/tweeter.svg';
import TweeterCloneHome from './TweeterCloneHome';
import TweeterCloneExplore from './TweeterCloneExplore';
import TweeterCloneBookmarks from './TweeterCloneBookmarks';
import UserPhotoComponent from './UserPhotoComponent';
import TweetsComponent from './TweetsComponent';
import '../css/TweeterCloneMain.css';

const TweeterCloneMain = () => {
  // eslint-disable-next-line
  const history = useHistory();
  const dispatch = useDispatch();

  const [tweeterHome, setTweeterHome] = useState(true);
  const [tweeterExplore, setTweeterExplore] = useState(false);
  const [tweeterBookmarks, setTweeterBookmarks] = useState(false);
  const [showOthersProfile, setShowOthersProfile] = useState(true);
  const [commentImage, setCommentImage] = useState('');
  const [comment, setComment] = useState('');
  const [commentID, setCommentID] = useState('');

  const showHomeRef = useRef(null);
  const showExploreRef = useRef(null);
  const showBookmarksRef = useRef(null);
  const userMenuDropDown = useRef(null);
  const dropDownRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.currentUser);
  const { users } = useSelector((state) => state.getAllUsers);
  const { user: otherUser } = useSelector((state) => state.getUser);

  const { allTweets, loading } = useSelector((state) => state.getAllTweets);

  const { tweets, loading: specificTweetsLoading } = useSelector(
    (state) => state.specificUserTweets
  );

  const showMenuHandler = (e) => {
    if (e.target.textContent === 'arrow_drop_down') {
      e.target.textContent = 'arrow_drop_up';
      // userMenuDropDown.current.style.opacity = 1;
      userMenuDropDown.current.style.display = 'block';
    } else {
      e.target.textContent = 'arrow_drop_down';
      // userMenuDropDown.current.style.opacity = 0;
      userMenuDropDown.current.style.display = 'none';
    }
  };

  //hide user menu
  window.addEventListener('click', (e) => {
    if (dropDownRef.current == null) return;

    if (!dropDownRef.current.contains(e.target)) {
      userMenuDropDown.current.style.display = 'none';
      dropDownRef.current.textContent = 'arrow_drop_down';
    }
  });

  const profileLinkHandler = () => {
    setTweeterHome(true);
    setTweeterExplore(false);
    setTweeterBookmarks(false);
    showExploreRef.current.style.borderBottom = 'unset';
    showBookmarksRef.current.style.borderBottom = 'unset';
    showHomeRef.current.style.borderBottom = '2px solid #2f80ed';

    dropDownRef.current.textContent = 'arrow_drop_down';
    userMenuDropDown.current.style.display = 'none';
  };

  const othersProfileLinkHandler = (name) => {
    dispatch(getUser(name));
    dispatch(getSpecificUserTweets(name));

    setShowOthersProfile(false);
  };

  const showHomeHandler = (e) => {
    setTweeterHome(true);
    setShowOthersProfile(true);
    setTweeterExplore(false);
    setTweeterBookmarks(false);
    showExploreRef.current.style.borderBottom = 'unset';
    showBookmarksRef.current.style.borderBottom = 'unset';
    e.target.style.borderBottom = '2px solid #2f80ed';
  };

  const showExploreHandler = (e) => {
    setTweeterExplore(true);
    setTweeterBookmarks(false);
    setTweeterHome(false);
    showHomeRef.current.style.borderBottom = 'unset';
    showBookmarksRef.current.style.borderBottom = 'unset';
    e.target.style.borderBottom = '2px solid #2f80ed';
  };

  const showBookmarksHandler = (e) => {
    setTweeterBookmarks(true);
    setTweeterExplore(false);
    setTweeterHome(false);
    showHomeRef.current.style.borderBottom = 'unset';
    showExploreRef.current.style.borderBottom = 'unset';
    e.target.style.borderBottom = '2px solid #2f80ed';
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const commentHandler = (e, id) => {
    const commentData = new FormData();

    commentData.append('name', user.name);
    commentData.append('userImage', user.userImage);
    commentData.append('replyText', comment);
    commentData.append('replyImage', commentImage);
    commentData.append('userID', user.id);
    if (e.keyCode === 13) {
      dispatch(createUserComment(commentData, commentID));
      setComment('');
      setCommentImage('');
    }
  };

  const tweetActionHandler = (e) => {
    const tweetAction = document.querySelectorAll('.TweetAction');

    tweetAction.forEach((action) => {
      if (action.contains(e.target)) {
        if (action.children[1].textContent === 'Saved') {
          action.children[0].style.color = '#2D9CDB';
          action.children[1].style.color = '#2D9CDB';
          action.children[1].textContent = 'Saved';
        }

        if (action.children[1].textContent === 'Comments') {
          const hideShowReplyContainer =
            action.parentElement.nextSibling.nextSibling;

          if (hideShowReplyContainer.style.display === 'block') {
            hideShowReplyContainer.style.display = 'none';
          } else {
            hideShowReplyContainer.style.display = 'block';
          }
        }

        if (action.children[1].textContent === 'Retweet') {
          action.children[0].style.color = '#27AE60';
          action.children[1].style.color = '#27AE60';
          dispatch(
            createUserRetweet(
              action.dataset.username,
              action.children[1].textContent,
              action.dataset.twtid
            )
          );
          action.children[1].textContent = 'Retweeted';
          action.children[1].title = 'Undo Retweet';
        } else if (action.children[1].textContent === 'Retweeted') {
          action.children[0].style.color = '#4f4f4f';
          action.children[1].style.color = '#4f4f4f';
          dispatch(
            createUserRetweet(
              action.dataset.username,
              action.children[1].textContent,
              action.dataset.twtid
            )
          );
          action.children[1].textContent = 'Retweet';
          action.children[1].title = 'Retweet';
        }

        if (action.children[1].textContent === 'Like') {
          action.children[0].style.color = '#EB5757';
          action.children[1].style.color = '#EB5757';
          dispatch(
            createUserRetweet(
              action.dataset.username,
              action.children[1].textContent,
              action.dataset.twtid
            )
          );
          action.children[1].textContent = 'Liked';
          action.children[1].title = 'Unlike';
        } else if (action.children[1].textContent === 'Liked') {
          action.children[0].style.color = '#4F4F4F';
          action.children[1].style.color = '#4F4F4F';
          dispatch(
            createUserRetweet(
              action.dataset.username,
              action.children[1].textContent,
              action.dataset.twtid
            )
          );
          action.children[1].textContent = 'Like';
          action.children[1].title = 'Like';
        }
      }
    });
  };

  window.addEventListener('load', (event) => {
    const tweetAction = document.querySelectorAll('.TweetContainer');

    tweetAction.forEach((action) => {
      if (action.children[1].textContent === user.name) {
        // console.log(action.children[2].children[3].children[1].children[1]);
        action.children[2].children[3].children[1].children[1].textContent =
          'Retweeted';
        action.children[2].children[3].children[1].children[1].style.color =
          '#27AE60';
        action.children[2].children[3].children[1].children[0].style.color =
          '#27AE60';

        if (
          action.children[2].children[3].children[1].children[1].textContent ===
          'Retweeted'
        ) {
          action.children[2].children[3].children[1].children[1].title =
            'Undo Retweet';
        }
      }
    });
  });

  const setCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const setCommentIDHandler = (e) => {
    setCommentID(e.target.dataset.tweetid);
  };

  const setCommentImageHandler = (e) => {
    setCommentImage(e.target.files[0]);
  };

  let allUsersTweets = allTweets && (
    <TweetsComponent
      tweetsArray={allTweets}
      user={user}
      othersProfileLinkHandler={othersProfileLinkHandler}
      tweetActionHandler={tweetActionHandler}
      commentHandler={commentHandler}
      setCommentHandler={setCommentHandler}
      comment={comment}
      setCommentIDHandler={setCommentIDHandler}
      setCommentImageHandler={setCommentImageHandler}
    />
  );

  let specificUserTweets = tweets && (
    <TweetsComponent
      tweetsArray={tweets}
      user={user}
      othersProfileLinkHandler={othersProfileLinkHandler}
      tweetActionHandler={tweetActionHandler}
      commentHandler={commentHandler}
      setCommentHandler={setCommentHandler}
      comment={comment}
      setCommentIDHandler={setCommentIDHandler}
      setCommentImageHandler={setCommentImageHandler}
    />
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }

    showHomeRef.current.style.borderBottom = '2px solid #2f80ed';

    dispatch(getAllTweets());
    dispatch(getAllUsers());
  }, []);

  return (
    <div className='TweeteCloneMainContainer'>
      <nav className='TweeteCloneMainNavBar'>
        <div className='Brand'>
          <img src={BrandLogo} alt='logo' className='BrandImage' />
        </div>

        <div className='NavLink'>
          <p className='LinkItem' onClick={showHomeHandler} ref={showHomeRef}>
            Home
          </p>
          <p
            className='LinkItem'
            onClick={showExploreHandler}
            ref={showExploreRef}
          >
            Explore
          </p>
          <p
            className='LinkItem'
            onClick={showBookmarksHandler}
            ref={showBookmarksRef}
          >
            Bookmarks
          </p>
        </div>

        <div className='UserMenu'>
          <UserPhotoComponent user={user} />
          <p className='UserName'>{user.name}</p>
          <i
            className='material-icons'
            onClick={showMenuHandler}
            ref={dropDownRef}
          >
            arrow_drop_down
          </i>
        </div>
        <div className='userMenuDropDown' ref={userMenuDropDown}>
          <div
            className='MenuOptions MenuOptionTop'
            onClick={profileLinkHandler}
          >
            <i className='material-icons'>account_circle</i>
            <p className='MenuText'>My Profile</p>
          </div>

          <div className='MenuOptions'>
            <i className='material-icons'>people</i>
            <p className='MenuText'>Group Chat</p>
          </div>

          <div
            className='MenuOptions'
            onClick={() => history.push('/settings')}
          >
            <i className='material-icons'>settings</i>
            <p className='MenuText'>Settings</p>
          </div>

          <hr />

          <Link to='/login' style={{ textDecoration: 'none' }}>
            <div
              className='MenuOptions MenuOptionBottom'
              onClick={logoutHandler}
            >
              <i className='material-icons'>exit_to_app</i>
              <p className='MenuText'>Logout</p>
            </div>
          </Link>
        </div>
      </nav>

      {tweeterHome && (
        <TweeterCloneHome
          user={user}
          allUsers={users}
          showOthersProfile={showOthersProfile}
          othersProfileLinkHandler={othersProfileLinkHandler}
          allUsersTweets={allUsersTweets}
          loading={loading}
          otherUser={otherUser}
          specificUserTweets={specificUserTweets}
          ownerTweetsArray={tweets}
          specificTweetsLoading={specificTweetsLoading}
        />
      )}
      {tweeterExplore && <TweeterCloneExplore tempTweets={allUsersTweets} />}
      {tweeterBookmarks && (
        <TweeterCloneBookmarks tempTweets={allUsersTweets} />
      )}
    </div>
  );
};

export default TweeterCloneMain;
