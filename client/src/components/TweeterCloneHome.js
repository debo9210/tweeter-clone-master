import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserPhotoComponent from './UserPhotoComponent';
// import TweetsComponent from './TweetsComponent';
import ActionItem from './ActionItem';
import '../css/TweeterHome.css';
import { addCoverPhoto } from '../redux/actions/updateUserAction';
import { createUserTweet } from '../redux/actions/userTweetsAction';
import { followUser } from '../redux/actions/userFollowAction';
import {
  tempTrendList,
  iconOptions,
  selectActionHandler,
  actionItem,
} from '../utils/tempTweetContainer';
import Loader from './Loader';

const TweeterCloneHome = ({
  user,
  allUsers,
  otherUser,
  showOthersProfile,
  othersProfileLinkHandler,
  allUsersTweets,
  loading,
  specificUserTweets,
  ownerTweetsArray,
  specificTweetsLoading,
}) => {
  const dispatch = useDispatch();

  const [userTweet, setUserTweet] = useState('');
  const [whoCanReply, setWhoCanReply] = useState('Everyone');
  const [tweetImage, setTweetImage] = useState('');

  const whoCanReplyRef = useRef(null);
  const showWhoCanReplyRef = useRef(null);

  //   console.log('hi');

  const getOtherUserID = (otherUsers, name) => {
    let otherUserID;
    if (otherUsers) {
      otherUsers
        .filter((user) => user.name === name)
        .map((user) => (otherUserID = user._id));
    }
    return otherUserID;
  };

  const followBtnHandler = (e) => {
    const followBtn = document.querySelectorAll('.FollowBtn');

    followBtn.forEach((btn) => {
      if (btn.contains(e.target)) {
        if (btn.children[1].textContent === 'Follow') {
          followUser(
            user.name,
            getOtherUserID(allUsers, btn.dataset.name),
            btn.children[1].textContent
          );

          btn.children[1].textContent = 'Following';
          btn.children[0].textContent = '';
        } else {
          followUser(
            user.name,
            getOtherUserID(allUsers, btn.dataset.name),
            btn.children[1].textContent
          );

          btn.children[1].textContent = 'Follow';
          btn.children[0].textContent = 'person_add_alt_1';
        }
      }
    });
  };

  // const tweetOwner =
  //   ownerTweetsArray && ownerTweetsArray.slice(0, 1).map((twt) => twt.user);

  const tweetOwnerID = (array) => {
    let ownerID;
    if (array) {
      array.slice(0, 1).map((twt) => (ownerID = twt.user));
    }
    return ownerID;
  };

  const whoToFollow =
    allUsers &&
    allUsers
      .filter((item) => item.name !== user.name)
      .map((item, i) => (
        <div key={i} className='FollowSuggestionContainer'>
          <div className='FollowSuggestion'>
            <div
              className='TweetOwnerPic'
              style={{
                backgroundImage: `url(${item.userImage})`,
                marginRight: 0,
              }}
            ></div>
            <div className='FollowSuggestionTitle'>
              <p
                className='FollowSuggestionName'
                onClick={() => othersProfileLinkHandler(item.name)}
              >
                {item.name}
              </p>
              <p className='FollowSuggestionFollowers'>{item.numFollowers}</p>
            </div>
            {/* {console.log(user.following)} */}
            {/* <p>{user.name}</p> */}
            <button
              className='FollowBtn'
              onClick={followBtnHandler}
              data-name={item.name}
            >
              <i className='material-icons'>person_add_alt_1</i>
              <span>Follow</span>
            </button>
          </div>
          <p className='SuggestionBio'>{item.about}</p>

          <div
            className='CoverPhoto'
            style={{ backgroundImage: `url(${item.coverPhoto})` }}
          ></div>
        </div>
      ));

  const whoCanReplyHandler = (e) => {
    whoCanReplyRef.current.children[0].textContent =
      e.currentTarget.children[0].textContent;

    whoCanReplyRef.current.children[1].textContent =
      e.currentTarget.children[1].textContent === 'Everyone'
        ? 'Everyone can reply'
        : e.currentTarget.children[1].textContent;

    setWhoCanReply(e.currentTarget.children[1].textContent);
  };

  // show and  hide who can reply container
  window.addEventListener('click', (e) => {
    if (whoCanReplyRef.current == null) return;

    if (!whoCanReplyRef.current.contains(e.target)) {
      showWhoCanReplyRef.current.style.display = 'none';
    } else if (whoCanReplyRef.current.contains(e.target)) {
      showWhoCanReplyRef.current.style.display = 'block';
    }
  });

  const coverPhotoHandler = (e) => {
    let formData = new FormData();
    formData.append('coverPhoto', e.target.files[0]);
    formData.append('userID', user.id);

    dispatch(addCoverPhoto(formData));
  };

  const userTweetHandler = () => {
    let userTweetData = new FormData();
    userTweetData.append('username', user.name);
    userTweetData.append('userID', user.id);
    userTweetData.append('userimage', user.userImage);
    userTweetData.append('userTweet', userTweet);
    userTweetData.append('whoCanReply', whoCanReply);
    userTweetData.append('tweetImage', tweetImage);

    dispatch(createUserTweet(userTweetData));
    setUserTweet('');
    setTweetImage('');
  };

  return (
    <div>
      {showOthersProfile ? (
        <div className='TweeterHomeContainer'>
          <main className='TweeterHome'>
            <section className='UserTweet'>
              <div className='UserTweetContainer'>
                <p>Tweet something</p>

                <div className='TweetBox'>
                  <UserPhotoComponent user={user} />
                  <textarea
                    name='tweet-box'
                    placeholder='What’s happening?'
                    onChange={(e) => setUserTweet(e.target.value)}
                    value={userTweet}
                  ></textarea>
                </div>

                <div className='TweetButtonContainer'>
                  <div className='IconBtnContainer'>
                    <div className='IconBtn'>
                      <label>
                        <i className='material-icons' title='Add image'>
                          crop_original
                        </i>
                        <input
                          type='file'
                          onChange={(e) => setTweetImage(e.target.files[0])}
                        />
                      </label>
                    </div>
                    <div
                      className='IconBtn IconBtn2'
                      title='Who can reply?'
                      ref={whoCanReplyRef}
                    >
                      <i className='material-icons'>public</i>
                      <span>Everyone can reply</span>
                    </div>
                  </div>
                  <div className='TweetButton'>
                    <button onClick={userTweetHandler}>Tweet</button>
                  </div>
                </div>
              </div>

              <div className='WhoCanReplyContainer' ref={showWhoCanReplyRef}>
                <div className='WhoCanReplyBody'>
                  <p className='WhoCanReplyText'>Who can reply?</p>
                  <p className='ChooseWhoCanReplyText'>
                    Choose who can reply to this Tweet.
                  </p>
                  {iconOptions.map((item, i) => (
                    <div
                      key={i}
                      className='WhoCanReply'
                      onClick={whoCanReplyHandler}
                    >
                      <i className='material-icons'>{Object.keys(item)}</i>
                      <span>{Object.values(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {loading ? (
              <Loader />
            ) : allUsersTweets && allUsersTweets.length === 0 ? (
              <h1>No tweets</h1>
            ) : (
              allUsersTweets
            )}
          </main>
          <aside className='TweeterHomeAside'>
            <div className='TrendsContainer'>
              <div className='Trends'>
                <p>Trends for you</p>
              </div>

              {tempTrendList.map((item, i) => (
                <div key={i} className='TrendList'>
                  <p className='TrendListTitle'>{Object.keys(item)}</p>
                  <p className='TrendListText'>{Object.values(item)}</p>
                </div>
              ))}
            </div>

            <div className='WhoToFollowContainer'>
              <div className='WhoToFollow'>
                <p>Who to follow</p>
              </div>
              {whoToFollow}
            </div>
          </aside>
        </div>
      ) : (
        <div className='ShowProfileContainer'>
          {otherUser && (
            <div>
              <div className='CoverPhotoContainer'>
                {otherUser.coverPhoto ? (
                  <div
                    className='CoverPhoto'
                    style={{ backgroundImage: `url(${otherUser.coverPhoto})` }}
                  ></div>
                ) : otherUser && !otherUser.coverPhoto ? (
                  <div className='NoCoverPhoto'>
                    <p>Show people what you care about</p>
                    <label>
                      <input type='file' onChange={coverPhotoHandler} />
                      <i className='material-icons'>add</i>
                      <span>cover photo</span>
                    </label>
                  </div>
                ) : (
                  <div className='NoCoverPhoto'></div>
                )}
              </div>

              <div className='ShowProfile'>
                <div className='OthersProfileAboutContainer'>
                  <div className='OthersProfileImageContainer'>
                    <div
                      className='OthersProfileImage'
                      style={{ backgroundImage: `url(${otherUser.userImage})` }}
                    ></div>
                  </div>
                  <div className='OthersProfileAbout'>
                    <div className='ProfileAbout'>
                      <p className='ProfileAboutName'>{otherUser.name}</p>
                      <p className='ProfileAboutFollowing'>
                        2,569 <span>Following</span>
                      </p>
                      <p className='ProfileAboutFollowing'>
                        10.8K <span>Followers</span>
                      </p>
                    </div>
                    <p className='ProfileAboutInfo'>{otherUser.about}</p>
                  </div>

                  {tweetOwnerID(ownerTweetsArray) === user.id ? (
                    <div></div>
                  ) : (
                    <div className='FollowBtnContainer'>
                      <button
                        className='FollowBtn'
                        onClick={followBtnHandler}
                        data-name={otherUser.name}
                      >
                        <i className='material-icons'>person_add_alt_1</i>
                        <span>Follow</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className='OthersProfileMain'>
                  <aside className='TweeterHomeAside'>
                    <div className='ActionListContainer'>
                      <ActionItem
                        actionItem={actionItem}
                        selectActionHandler={selectActionHandler}
                      />
                    </div>
                  </aside>

                  <main className='TweeterHome'>
                    {specificTweetsLoading ? <Loader /> : specificUserTweets}
                  </main>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TweeterCloneHome;
