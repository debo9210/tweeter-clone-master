import React, { useState } from 'react';
import ShowProfileComponent from './ShowProfileComponent';
import { actionItem, tweetOptions } from '../utils/tempTweetContainer';
import ActionItem from './ActionItem';
import '../css/TweeterBookmark.css';

const TweeterCloneBookmarks = ({
  savedTweets,
  showOthersProfile,
  tweet_Image,
  tweet_Likes,
  tweet_Replies,
  specificUserTweets,
  ownerTweetsArray,
  saved_tweet_Likes,
  saved_tweet_Replies,
  saved_tweet_Media,
  windowWidth,
}) => {
  const [tweets, setTweets] = useState(true);
  const [tweetsAndReplies, setTweetsAndReplies] = useState(false);
  const [media, setMedia] = useState(false);
  const [likes, setLikes] = useState(false);

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
              {tweets
                ? tweetOptions(savedTweets, 'No saved tweet yet...')
                : tweetsAndReplies
                ? tweetOptions(saved_tweet_Replies, 'No tweet with Replies')
                : media
                ? tweetOptions(saved_tweet_Media, 'No tweet with image')
                : likes
                ? tweetOptions(saved_tweet_Likes, 'No Liked Tweet')
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

export default TweeterCloneBookmarks;
