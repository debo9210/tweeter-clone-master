import React, { useState } from 'react';
import ActionItem from './ActionItem';
import ShowProfileComponent from './ShowProfileComponent';
import { tweetOptions } from '../utils/tempTweetContainer';
import { abbrNum } from '../utils/abbrNum';
import '../css/TweeterExplore.css';

const TweeterCloneExplore = ({
  tempTweets,
  showOthersProfile,
  tweet_Image,
  tweet_Likes,
  tweet_Replies,
  specificUserTweets,
  ownerTweetsArray,
  latest_Tweets,
  allUsers,
  user,
  followBtnHandler,
  othersProfileLinkHandler,
  windowWidth,
}) => {
  const [actionItem] = useState(['Top', 'Latest', 'People', 'Media']);

  const [top, setTop] = useState(true);
  const [latest, setLatest] = useState(false);
  const [people, setPeople] = useState(false);
  const [media, setMedia] = useState(false);

  const selectActionHandler = (e) => {
    const itemList = document.querySelectorAll('.ActionListItem');
    itemList.forEach((item) => {
      if (item.textContent === e.target.textContent) {
        item.style.borderLeft = '2px solid #2f80ed';
      } else {
        item.style.borderLeft = 'unset';
      }
    });

    switch (e.target.textContent) {
      case 'Top':
        setTop(true);
        setLatest(false);
        setMedia(false);
        setPeople(false);
        break;
      case 'Latest':
        setTop(false);
        setLatest(true);
        setMedia(false);
        setPeople(false);
        break;
      case 'Media':
        setTop(false);
        setLatest(false);
        setMedia(true);
        setPeople(false);
        break;
      case 'People':
        setTop(false);
        setLatest(false);
        setMedia(false);
        setPeople(true);
        break;
      default:
        setTop(true);
        break;
    }
  };

  // most populer people. Edit 'item.followers.length to desired value.
  const popularPeople =
    allUsers &&
    allUsers
      .filter((item) => item.name !== user.name)
      .filter((item) => item.followers.length > 1)
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
              <p className='FollowSuggestionFollowers'>
                {abbrNum(item.followers.length, 2)} followers
              </p>
            </div>

            <button
              className='FollowBtn'
              onClick={followBtnHandler}
              data-name={item.name}
              title={!user.following.includes(item._id) ? 'Follow' : 'Unfollow'}
            >
              <i className='material-icons'>
                {!user.following.includes(item._id) ? 'person_add_alt_1' : ''}
              </i>
              <span>
                {!user.following.includes(item._id) ? 'Follow' : 'Following'}
              </span>
            </button>
          </div>
          <p className='SuggestionBio'>{item.about}</p>

          <div
            className='CoverPhoto'
            style={{ backgroundImage: `url(${item.coverPhoto})` }}
          ></div>
        </div>
      ));

  const POPULAR_PEOPLE =
    popularPeople.length === 0 ? (
      <div className='SavedTweet'>
        <h3>No popular people yet</h3>
      </div>
    ) : (
      popularPeople
    );

  return (
    <div>
      {showOthersProfile ? (
        <div
          className='TweeterHomeContainer'
          style={windowWidth <= 417 ? { width: '95%' } : { width: '65%' }}
        >
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
              <div className='SearchExploreContainer'>
                <i className='material-icons SearchIcon'>search</i>
                <input
                  type='text'
                  placeholder='Search'
                  className='ExploreSearchInput'
                />
                <button className='ExploreSearchBtn'>Search</button>
              </div>
              {top
                ? tempTweets
                : latest
                ? tweetOptions(latest_Tweets, 'No recent tweet yet')
                : people
                ? POPULAR_PEOPLE
                : media
                ? tweetOptions(tweet_Image, 'No tweet with image')
                : null}
            </main>
          </div>
        </div>
      ) : (
        <ShowProfileComponent
          tweet_Image={tweet_Image}
          tweet_Likes={tweet_Likes}
          tweet_Replies={tweet_Replies}
          specificUserTweets={specificUserTweets}
          ownerTweetsArray={ownerTweetsArray}
        />
      )}
    </div>
  );
};

export default TweeterCloneExplore;
