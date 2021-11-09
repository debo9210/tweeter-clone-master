import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoverPhoto } from '../redux/actions/updateUserAction';
import ActionItem from './ActionItem';
import { abbrNum } from '../utils/abbrNum';
import { actionItem, tweetOptions } from '../utils/tempTweetContainer';

const TweeterCloneUserProfile = ({
  user,
  userTweets,
  tweet_Replies,
  tweet_Likes,
  tweet_Image,
}) => {
  const dispatch = useDispatch();

  const [tweets, setTweets] = useState(true);
  const [tweetsAndReplies, setTweetsAndReplies] = useState(false);
  const [media, setMedia] = useState(false);
  const [likes, setLikes] = useState(false);

  const coverPhotoHandler = (e) => {
    let formData = new FormData();
    formData.append('coverPhoto', e.target.files[0]);
    formData.append('userID', user.id);

    dispatch(addCoverPhoto(formData));
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

  //   console.log(userTweets);

  return (
    <div className='ShowProfileContainer'>
      {user && (
        <div>
          <div className='CoverPhotoContainer'>
            {user.coverPhoto ? (
              <div
                className='CoverPhoto'
                style={{ backgroundImage: `url(${user.coverPhoto})` }}
              ></div>
            ) : user && !user.coverPhoto ? (
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
                  style={{ backgroundImage: `url(${user.userImage})` }}
                ></div>
              </div>
              <div className='OthersProfileAbout'>
                <div className='ProfileAbout'>
                  <p className='ProfileAboutName' style={{ marginTop: '25px' }}>
                    {user.name}
                  </p>
                  <div className='ProfileAboutFollowingContainer'>
                    <p className='ProfileAboutFollowing'>
                      {abbrNum(user.following.length, 2)} <span>Following</span>
                    </p>
                    <p className='ProfileAboutFollowing'>
                      {abbrNum(user.followers.length, 2)}{' '}
                      <span>
                        {user.followers.length === 1 ? 'Follower' : 'Followers'}
                      </span>
                    </p>
                  </div>
                </div>
                <p className='ProfileAboutInfo' style={{ marginTop: '20px' }}>
                  {user.about}
                </p>
              </div>

              {/* {tweetOwnerID(userTweetsArray) === user.id ? (
                <div></div>
              ) : (
                <div className='FollowBtnContainer'>
                  <button
                    className='FollowBtn'
                    onClick={followBtnHandler}
                    data-name={user.name}
                    title={
                      !user.following.includes(user._id) ? 'Follow' : 'Unfollow'
                    }
                  >
                    <i className='material-icons'>
                      {!user.following.includes(user._id)
                        ? 'person_add_alt_1'
                        : ''}
                    </i>
                    <span>
                      {!user.following.includes(user._id)
                        ? 'Follow'
                        : 'Following'}
                    </span>
                  </button>
                </div>
              )} */}
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
                {/* {specificTweetsLoading && <Loader />} */}
                {tweets
                  ? tweetOptions(userTweets, 'No tweet yet')
                  : tweetsAndReplies
                  ? tweetOptions(tweet_Replies, 'No tweet with Replies')
                  : media
                  ? tweetOptions(tweet_Image, 'No tweet with image')
                  : likes
                  ? tweetOptions(tweet_Likes, 'No Liked Tweet')
                  : null}
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweeterCloneUserProfile;
