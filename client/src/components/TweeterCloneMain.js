import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
// eslint-disable-next-line
import {
  getUser,
  getAllUsers,
  getCurrentUser,
} from '../redux/actions/getUserActions';
import { followUser } from '../redux/actions/userFollowAction';
import {
  getAllTweets,
  createUserComment,
  createUserRetweet,
  createSavedTweet,
  createLikeComment,
} from '../redux/actions/userTweetsAction';
import { getOtherUserID } from '../utils/getOtherUserID';
import { tweetComponent } from '../utils/tempTweetContainer';
import BrandLogo from '../images/tweeter.svg';
import BrandLogo2 from '../images/tweeter-small.svg';
import TweeterCloneHome from './TweeterCloneHome';
import TweeterCloneExplore from './TweeterCloneExplore';
import TweeterCloneBookmarks from './TweeterCloneBookmarks';
import TweeterCloneUserProfile from './TweeterCloneUserProfile';
import UserPhotoComponent from './UserPhotoComponent';
import Footer from './Footer';
import '../css/TweeterCloneMain.css';
import moment from 'moment';

const TweeterCloneMain = () => {
  // eslint-disable-next-line
  const history = useHistory();
  const dispatch = useDispatch();

  const [tweeterHome, setTweeterHome] = useState(true);
  const [tweeterExplore, setTweeterExplore] = useState(false);
  const [tweeterBookmarks, setTweeterBookmarks] = useState(false);
  const [showOthersProfile, setShowOthersProfile] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [commentImage, setCommentImage] = useState('');
  const [comment, setComment] = useState('');
  const [commentID, setCommentID] = useState('');
  const [specificUserName, setSpecificUserName] = useState('');

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showHomeRef = useRef(null);
  const showExploreRef = useRef(null);
  const showBookmarksRef = useRef(null);
  const userMenuDropDown = useRef(null);
  const dropDownRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.currentUser);
  const { users } = useSelector((state) => state.getAllUsers);

  const { allTweets, loading } = useSelector((state) => state.getAllTweets);

  const { allTweets: userRetweet } = useSelector((state) => state.userRetweet);

  const { saveStatus } = useSelector((state) => state.saveTweet);

  window.onresize = (e) => {
    // windowWidth = $(window).width();
    setWindowWidth(window.innerWidth);
  };

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
    setTweeterHome(false);
    setTweeterExplore(false);
    setTweeterBookmarks(false);
    setShowOthersProfile(false);
    setShowUserProfile(true);
    showExploreRef.current.style.borderBottom = 'unset';
    showBookmarksRef.current.style.borderBottom = 'unset';
    showHomeRef.current.style.borderBottom = '2px solid #2f80ed';

    dropDownRef.current.textContent = 'arrow_drop_down';
    userMenuDropDown.current.style.display = 'none';
  };

  const othersProfileLinkHandler = (name) => {
    dispatch(getUser(name));

    setSpecificUserName(name);

    setShowOthersProfile(false);

    dispatch(getCurrentUser(user.name));
  };

  const showHomeHandler = (e) => {
    setTweeterHome(true);
    setShowOthersProfile(true);
    setTweeterExplore(false);
    setTweeterBookmarks(false);
    setShowUserProfile(false);
    showExploreRef.current.style.borderBottom = 'unset';
    showBookmarksRef.current.style.borderBottom = 'unset';
    e.target.style.borderBottom = '2px solid #2f80ed';
  };

  const showExploreHandler = (e) => {
    setTweeterExplore(true);
    setTweeterBookmarks(false);
    setTweeterHome(false);
    setShowOthersProfile(true);
    setShowUserProfile(false);
    showHomeRef.current.style.borderBottom = 'unset';
    showBookmarksRef.current.style.borderBottom = 'unset';
    e.target.style.borderBottom = '2px solid #2f80ed';
  };

  const showBookmarksHandler = (e) => {
    setTweeterBookmarks(true);
    setTweeterExplore(false);
    setTweeterHome(false);
    setShowOthersProfile(true);
    setShowUserProfile(false);
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
      e.target.value = '';
    }
  };

  const tweetActionHandler = (e) => {
    const tweetAction = document.querySelectorAll('.TweetAction');

    tweetAction.forEach((action) => {
      if (action.contains(e.target)) {
        if (action.children[1].textContent === 'Save') {
          action.children[0].style.color = '#2D9CDB';
          action.children[1].style.color = '#2D9CDB';
          action.children[1].textContent = 'Saved';

          // console.log(action.dataset.twtid);
          dispatch(createSavedTweet(action.dataset.twtid, user.id));

          setTimeout(() => {
            dispatch(getCurrentUser(user.name));
            // if (saveStatus) {
            //   if (saveStatus.msg === 'tweet saved') {
            //     // dispatch(getCurrentUser(user.name));
            //   }
            // }
          }, 5000);

          setTimeout(() => {
            if (document.querySelector('.tweetActionMsgs')) {
              document.querySelector('.tweetActionMsgs').style.display = 'flex';
            }
          }, 2000);
        }

        if (action.children[1].textContent === 'Comments') {
          const hideShowReplyContainer =
            action.parentElement.nextSibling.nextSibling ||
            action.parentElement.nextSibling;

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
              action.dataset.twtid,
              action.dataset.userid
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
              action.dataset.twtid,
              action.dataset.userid
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
              action.dataset.twtid,
              action.dataset.userid
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
              action.dataset.twtid,
              action.dataset.userid
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
    // console.log(e.target);
    setCommentImage(e.target.files[0]);
  };

  const commentLikeHandler = (e) => {
    const likeAction = document.querySelectorAll('.Likes');

    likeAction.forEach((action) => {
      if (action.contains(e.target)) {
        if (action.children[1].textContent === 'Like') {
          action.children[0].style.color = '#EB5757';
          action.children[1].style.color = '#EB5757';
          action.children[0].textContent = 'favorite';

          const tweetID =
            action.parentElement.parentElement.parentElement.parentElement
              .parentElement.children[3].dataset.twtid;

          dispatch(
            createLikeComment(
              user.id,
              action.children[1].textContent,
              action.dataset.commentid,
              tweetID
            )
          );

          action.children[1].textContent = 'Liked';
          action.title = 'Unlike';
        } else if (action.children[1].textContent === 'Liked') {
          action.children[0].style.color = '#bdbdbd';
          action.children[1].style.color = '#bdbdbd';
          action.children[0].textContent = 'favorite_border';

          const tweetID =
            action.parentElement.parentElement.parentElement.parentElement
              .parentElement.children[3].dataset.twtid;

          dispatch(
            createLikeComment(
              user.id,
              action.title,
              action.dataset.commentid,
              tweetID
            )
          );

          action.children[1].textContent = 'Like';
          action.title = 'Like';
        }
      }
    });
  };

  //follow button handler
  const followBtnHandler = (e) => {
    const followBtn = document.querySelectorAll('.FollowBtn');

    followBtn.forEach((btn) => {
      if (btn.contains(e.target)) {
        if (btn.children[1].textContent === 'Follow') {
          followUser(
            user.name,
            getOtherUserID(users, btn.dataset.name),
            btn.children[1].textContent
          );

          btn.children[1].textContent = 'Following';
          btn.children[0].textContent = '';
          btn.title = 'Unfollow';
          setTimeout(() => {
            dispatch(getUser(btn.dataset.name));
          }, 1000);
        } else {
          followUser(
            user.name,
            getOtherUserID(users, btn.dataset.name),
            btn.children[1].textContent
          );

          btn.children[1].textContent = 'Follow';
          btn.children[0].textContent = 'person_add_alt_1';
          btn.title = 'Follow';
          setTimeout(() => {
            dispatch(getUser(btn.dataset.name));
          }, 1000);
        }
      }
    });
  };

  let dynamicTweets;
  if (allTweets) {
    dynamicTweets = allTweets;
  } else if (userRetweet) {
    dynamicTweets = userRetweet;
  }
  // if (saveStatus) {
  //   // console.log(saveStatus.tweetsArr);
  //   // dynamicTweets = saveStatus.tweetsArr;
  // }

  // console.log(dynamicTweets);

  // reverse all tweets
  let ALL_TWEETS =
    dynamicTweets && dynamicTweets.map((e, i, a) => a[a.length - 1 - i]);

  // console.log(ALL_TWEETS);

  //get tweets by followers
  const followersTweets =
    ALL_TWEETS && ALL_TWEETS.filter((t) => user.following.includes(t.user));

  // all tweets by followers
  let userFollowersTweets = tweetComponent(
    followersTweets,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // gets user tweets by name
  const specificTweet =
    ALL_TWEETS &&
    specificUserName &&
    ALL_TWEETS.filter((x) => x.name === specificUserName);

  let specificUserTweets = tweetComponent(
    specificTweet,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get tweets with comments
  const tweetsWithComments =
    specificTweet &&
    specificTweet.filter((replies) => replies.comments.length >= 1);

  const tweet_Replies = tweetComponent(
    tweetsWithComments,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get tweets with media/image
  const tweetsWithMedia =
    specificTweet && specificTweet.filter((img) => img.tweetImage);

  const tweet_Image = tweetComponent(
    tweetsWithMedia,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get tweets with likes
  const tweetsWithLikes =
    specificTweet && specificTweet.filter((like) => like.likes.length >= 1);

  const tweet_Likes = tweetComponent(
    tweetsWithLikes,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  //get saved tweets
  // user.savedTweets
  const tweetID = user.savedTweets.map((twt) => twt.userTweetID);

  const saved_Tweets_Arr =
    ALL_TWEETS &&
    ALL_TWEETS.map((twt) => twt).filter((twt) => tweetID.includes(twt._id));

  const savedTweets = tweetComponent(
    saved_Tweets_Arr,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get saved tweets with likes
  const savedTweetsWithLikes =
    saved_Tweets_Arr &&
    saved_Tweets_Arr.filter((like) => like.likes.length >= 1);

  const saved_tweet_Likes = tweetComponent(
    savedTweetsWithLikes,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get saved tweets with image
  const savedTweetsWithMedia =
    saved_Tweets_Arr && saved_Tweets_Arr.filter((img) => img.tweetImage);

  // console.log(savedTweetsWithMedia);

  const saved_tweet_Image = tweetComponent(
    savedTweetsWithMedia,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get saved tweets with replies
  const savedTweetsWithComments =
    saved_Tweets_Arr &&
    saved_Tweets_Arr.filter((replies) => replies.comments.length >= 1);

  const saved_tweet_Replies = tweetComponent(
    savedTweetsWithComments,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  //get latest tweets
  const date = new Date();
  const latestTweets =
    ALL_TWEETS &&
    ALL_TWEETS.filter(
      (twt) =>
        moment(twt.date).format('YYYY-MM-DD') ===
        moment(date).format('YYYY-MM-DD')
    );

  const latest_Tweets = tweetComponent(
    latestTweets,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get tweets with media/image in Explore
  const tweetsImageExplore =
    ALL_TWEETS && ALL_TWEETS.filter((img) => img.tweetImage);

  const tweet_Image_Explore = tweetComponent(
    tweetsImageExplore,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  //get top tweets
  const top_Tweets = tweetComponent(
    allTweets && ALL_TWEETS,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // gets current user tweets
  const currentUserTweet =
    ALL_TWEETS && ALL_TWEETS.filter((x) => x.name === user.name);

  let current_User_Tweets = tweetComponent(
    currentUserTweet,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get current user tweets with likes
  const currentUserTweetsWithLikes =
    currentUserTweet &&
    currentUserTweet.filter((like) => like.likes.length >= 1);

  const current_user_tweet_Likes = tweetComponent(
    currentUserTweetsWithLikes,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get current user tweets with  media/image
  const currentUserTweetsWithImage =
    currentUserTweet && currentUserTweet.filter((img) => img.tweetImage);

  const current_user_tweet_Images = tweetComponent(
    currentUserTweetsWithImage,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  // get current user tweets with  replies
  const currentUserTweetsWithReplies =
    currentUserTweet &&
    currentUserTweet.filter((replies) => replies.comments.length >= 1);

  const current_user_tweet_Replies = tweetComponent(
    currentUserTweetsWithReplies,
    user,
    othersProfileLinkHandler,
    tweetActionHandler,
    commentHandler,
    setCommentHandler,
    // comment,
    setCommentIDHandler,
    setCommentImageHandler,
    commentLikeHandler,
    windowWidth
  );

  const clearTweetActionMsg = (e) => {
    e.target.parentElement.style.display = 'none';
    // tweetActionMsgs.style.display = 'none';
  };

  let saveTweetsMsgStyle;
  if (saveStatus) {
    saveTweetsMsgStyle =
      saveStatus.msg === 'tweet saved already'
        ? { color: '#664D03' }
        : saveStatus.msg === 'tweet saved'
        ? { color: '#0F719C' }
        : saveStatus.msg === 'tweet not saved'
        ? { color: '#E2925A' }
        : { color: null };
  }

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }

    if (window.innerWidth > 0) {
      showHomeRef.current.style.borderBottom = '2px solid #2f80ed';
    }

    dispatch(getAllTweets());
    dispatch(getAllUsers());
  }, [dispatch, history, isAuthenticated]);

  return (
    <div className='TweeteCloneMainContainer'>
      <nav className='TweeteCloneMainNavBar'>
        <div className='Brand'>
          <img
            src={windowWidth <= 417 ? BrandLogo2 : BrandLogo}
            alt='logo'
            className='BrandImage'
          />
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
          <UserPhotoComponent user={user} windowWidth={windowWidth} />
          <p className='UserName'>{user.name}</p>

          <i
            className='material-icons'
            onClick={showMenuHandler}
            ref={dropDownRef}
          >
            {/* {windowWidth <= 417 ? '' : 'arrow_drop_down'} */}
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

      {saveStatus && (
        <div
          className='tweetActionMsgs'
          style={
            saveStatus.msg === 'tweet saved already'
              ? { background: '#FFF3CD' }
              : saveStatus.msg === 'tweet saved'
              ? { background: '#D1E7DD' }
              : saveStatus.msg === 'tweet not saved'
              ? { background: '#F8D7DA' }
              : { background: null }
          }
        >
          <p className='actionMsg' style={saveTweetsMsgStyle}>
            {saveStatus.msg}
          </p>
          <i
            className='material-icons'
            onClick={clearTweetActionMsg}
            style={saveTweetsMsgStyle}
          >
            clear
          </i>
        </div>
      )}

      {tweeterHome && (
        <TweeterCloneHome
          user={user}
          allUsers={users}
          showOthersProfile={showOthersProfile}
          othersProfileLinkHandler={othersProfileLinkHandler}
          userFollowersTweets={userFollowersTweets}
          loading={loading}
          // otherUser={otherUser}
          specificUserTweets={specificUserTweets}
          ownerTweetsArray={specificTweet}
          specificTweetsLoading={loading}
          tweet_Replies={tweet_Replies}
          tweet_Image={tweet_Image}
          tweet_Likes={tweet_Likes}
          followBtnHandler={followBtnHandler}
          allTweets={allTweets}
          windowWidth={windowWidth}
        />
      )}
      {tweeterExplore && (
        <TweeterCloneExplore
          tempTweets={top_Tweets}
          showOthersProfile={showOthersProfile}
          tweet_Image={tweet_Image_Explore}
          tweet_Likes={tweet_Likes}
          tweet_Replies={tweet_Replies}
          specificUserTweets={specificUserTweets}
          ownerTweetsArray={specificTweet}
          latest_Tweets={latest_Tweets}
          allUsers={users}
          user={user}
          followBtnHandler={followBtnHandler}
          othersProfileLinkHandler={othersProfileLinkHandler}
          windowWidth={windowWidth}
        />
      )}
      {tweeterBookmarks && (
        <TweeterCloneBookmarks
          savedTweets={savedTweets}
          showOthersProfile={showOthersProfile}
          ownerTweetsArray={specificTweet}
          tweet_Image={tweet_Image}
          tweet_Likes={tweet_Likes}
          tweet_Replies={tweet_Replies}
          specificUserTweets={specificUserTweets}
          saved_tweet_Likes={saved_tweet_Likes}
          saved_tweet_Replies={saved_tweet_Replies}
          saved_tweet_Media={saved_tweet_Image}
          windowWidth={windowWidth}
        />
      )}
      {showUserProfile && (
        <TweeterCloneUserProfile
          user={user}
          userTweets={current_User_Tweets}
          tweet_Replies={current_user_tweet_Replies}
          tweet_Likes={current_user_tweet_Likes}
          tweet_Image={current_user_tweet_Images}
        />
      )}

      <Footer
        windowWidth={windowWidth}
        tweeterHome={tweeterHome}
        showHomeHandler={showHomeHandler}
        showHomeRef={showHomeRef}
        tweeterExplore={tweeterExplore}
        showExploreHandler={showExploreHandler}
        showExploreRef={showExploreRef}
        tweeterBookmarks={tweeterBookmarks}
        showBookmarksHandler={showBookmarksHandler}
        showBookmarksRef={showBookmarksRef}
      />
    </div>
  );
};

export default TweeterCloneMain;
