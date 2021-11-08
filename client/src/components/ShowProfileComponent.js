import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ActionItem from './ActionItem';
import Loader from './Loader';
import { addCoverPhoto } from '../redux/actions/updateUserAction';
import { followUser } from '../redux/actions/userFollowAction';
import { getUser } from '../redux/actions/getUserActions';
import { abbrNum } from '../utils/abbrNum';
import { actionItem, tweetOptions } from '../utils/tempTweetContainer';

const ShowProfileComponent = ({
  specificTweetsLoading,
  tweet_Image,
  tweet_Likes,
  tweet_Replies,
  specificUserTweets,
  ownerTweetsArray,
}) => {
  const dispatch = useDispatch();

  const [tweets, setTweets] = useState(true);
  const [tweetsAndReplies, setTweetsAndReplies] = useState(false);
  const [media, setMedia] = useState(false);
  const [likes, setLikes] = useState(false);

  const { user } = useSelector((state) => state.currentUser);
  const { user: otherUser } = useSelector((state) => state.getUser);
  const { users: allUsers } = useSelector((state) => state.getAllUsers);

  const tweetOwnerID = (array) => {
    let ownerID;
    if (array) {
      array.slice(0, 1).map((twt) => (ownerID = twt.user));
    }
    return ownerID;
  };

  const coverPhotoHandler = (e) => {
    let formData = new FormData();
    formData.append('coverPhoto', e.target.files[0]);
    formData.append('userID', user.id);

    dispatch(addCoverPhoto(formData));
  };

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
          btn.title = 'Unfollow';
          setTimeout(() => {
            dispatch(getUser(btn.dataset.name));
          }, 1000);
        } else {
          followUser(
            user.name,
            getOtherUserID(allUsers, btn.dataset.name),
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

  const selectActionHandler = (e) => {
    const itemList = document.querySelectorAll('.ActionListItem');
    itemList.forEach((item) => {
      if (item.textContent === e.target.textContent) {
        item.style.borderLeft = '2px solid #2f80ed';
      } else {
        item.style.borderLeft = 'unset';
      }
    });

    // console.log(e.target.textContent);

    switch (e.target.textContent) {
      case 'Tweets':
        setTweets(true);
        setTweetsAndReplies(false);
        setMedia(false);
        setLikes(false);
        break;
      case 'Tweets & replies':
        setTweets(false);
        setTweetsAndReplies(true);
        setMedia(false);
        setLikes(false);
        break;
      case 'Media':
        setTweets(false);
        setTweetsAndReplies(false);
        setMedia(true);
        setLikes(false);
        break;
      case 'Likes':
        setTweets(false);
        setTweetsAndReplies(false);
        setMedia(false);
        setLikes(true);
        break;
      default:
        setTweets(true);
        break;
    }
  };

  return (
    <div>
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
                    <div className='ProfileAboutFollowingContainer'>
                      <p className='ProfileAboutFollowing'>
                        {abbrNum(otherUser.following.length, 2)}{' '}
                        <span>Following</span>
                      </p>
                      <p className='ProfileAboutFollowing'>
                        {abbrNum(otherUser.followers.length, 2)}{' '}
                        <span>
                          {otherUser.followers.length === 1
                            ? 'Follower'
                            : 'Followers'}
                        </span>
                      </p>
                    </div>
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
                      title={
                        !user.following.includes(otherUser._id)
                          ? 'Follow'
                          : 'Unfollow'
                      }
                    >
                      <i className='material-icons'>
                        {!user.following.includes(otherUser._id)
                          ? 'person_add_alt_1'
                          : ''}
                      </i>
                      <span>
                        {!user.following.includes(otherUser._id)
                          ? 'Follow'
                          : 'Following'}
                      </span>
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
                  {specificTweetsLoading && <Loader />}
                  {tweets
                    ? specificUserTweets
                    : tweetsAndReplies
                    ? tweetOptions(tweet_Replies, 'No tweet with Replies')
                    : media
                    ? tweetOptions(tweet_Image, 'No tweet with image')
                    : likes
                    ? tweetOptions(tweet_Likes, 'No Liked Tweet')
                    : ''}
                </main>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProfileComponent;
