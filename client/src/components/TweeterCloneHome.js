import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserPhotoComponent from './UserPhotoComponent';
import ActionItem from './ActionItem';
import '../css/TweeterHome.css';
import { addCoverPhoto } from '../redux/actions/updateUserAction';
import { createUserTweet } from '../redux/actions/userTweetsAction';
import {
  iconOptions,
  actionItem,
  tweetOptions,
} from '../utils/tempTweetContainer';
import { abbrNum } from '../utils/abbrNum';
import Loader from './Loader';

const TweeterCloneHome = ({
  user,
  allUsers,
  // otherUser,
  showOthersProfile,
  othersProfileLinkHandler,
  userFollowersTweets,
  loading,
  specificUserTweets,
  ownerTweetsArray,
  specificTweetsLoading,
  tweet_Replies,
  tweet_Image,
  tweet_Likes,
  followBtnHandler,
  allTweets,
  windowWidth,
}) => {
  const dispatch = useDispatch();

  const [userTweet, setUserTweet] = useState('');
  const [whoCanReply, setWhoCanReply] = useState('Everyone');
  const [tweetImage, setTweetImage] = useState('');
  const [tweets, setTweets] = useState(true);
  const [tweetsAndReplies, setTweetsAndReplies] = useState(false);
  const [media, setMedia] = useState(false);
  const [likes, setLikes] = useState(false);

  const whoCanReplyRef = useRef(null);
  const showWhoCanReplyRef = useRef(null);

  const { user: otherUser } = useSelector((state) => state.getUser);

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
      .filter((item) => !item.followers.includes(user.id))
      .map((item, i) => (
        <div key={i} className='FollowSuggestionContainer'>
          {/* {console.log(item)} */}
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
                {/* {console.log(item.name)} */}
              </p>
              <p className='FollowSuggestionFollowers'>
                {abbrNum(item.followers.length, 2)} followers
              </p>
            </div>

            <div className='AsideFollowButton'>
              <button
                className='FollowBtn'
                onClick={followBtnHandler}
                data-name={item.name}
                title={
                  !user.following.includes(item._id) ? 'Follow' : 'Unfollow'
                }
              >
                <i className='material-icons'>
                  {!user.following.includes(item._id) ? 'person_add_alt_1' : ''}
                </i>
                <span>
                  {!user.following.includes(item._id) ? 'Follow' : 'Following'}
                </span>
              </button>
            </div>
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

  // get user tweet and split string with words that have hash tag
  var regex = RegExp('[#]');
  let wordList = [];
  if (allTweets) {
    const getSplitTweet = allTweets
      .map((twt) => twt.userTweet)
      .filter((twt) => twt.includes('#'));

    for (let i = 0; i < getSplitTweet.length; i++) {
      const wordSplit = getSplitTweet[i]
        .split(' ')
        .filter((el) => regex.test(el));

      for (let j = 0; j < wordSplit.length; j++) {
        wordList.push(wordSplit[j].toLowerCase());
      }
    }
  }

  // count number of items in word list and convert to key/value pair
  const trendCount = wordList.reduce((allTrends, trend) => {
    if (trend in allTrends) {
      allTrends[trend]++;
    } else {
      allTrends[trend] = 1;
    }
    return allTrends;
  }, {});

  //sort trendlist by highest value
  const trendList = Object.fromEntries(
    Object.entries(trendCount).sort((a, b) => b[1] - a[1])
  );

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
                    spellCheck
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
            ) : userFollowersTweets && userFollowersTweets.length === 0 ? (
              <h1>No tweets</h1>
            ) : (
              userFollowersTweets
            )}
          </main>

          <aside className='TweeterHomeAside'>
            <div className='TrendsContainer'>
              <div className='Trends'>
                <p>Trends for you</p>
              </div>

              {Object.keys(trendList)
                .slice(0, 6)
                .map((key) => [String(key), trendCount[key]])
                .map((item, i) => (
                  <div key={i} className='TrendList'>
                    <p className='TrendListTitle'>{item[0]}</p>
                    <p className='TrendListText'>
                      {item[1] <= 1
                        ? `${abbrNum(item[1], 2)} Tweet`
                        : `${abbrNum(item[1], 2)} Tweets`}
                    </p>
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
                <div
                  className='OthersProfileAboutContainer'
                  // style={
                  //   windowWidth <= 417 ? { width: '90%' } : { width: '65%' }
                  // }
                >
                  <div className='OthersProfileImageContainer'>
                    <div
                      className='OthersProfileImage'
                      style={{ backgroundImage: `url(${otherUser.userImage})` }}
                    ></div>
                  </div>
                  <div className='OthersProfileAbout'>
                    <div className='ProfileAbout'>
                      <p
                        className='ProfileAboutName'
                        style={{ marginTop: '25px' }}
                      >
                        {otherUser.name}
                      </p>
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
                    <p
                      className='ProfileAboutInfo'
                      style={{ marginTop: '20px' }}
                    >
                      {otherUser.about}
                    </p>
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
                      : null}
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
