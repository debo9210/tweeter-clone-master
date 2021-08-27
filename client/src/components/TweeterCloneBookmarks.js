import React from 'react';
import ActionItem from './ActionItem';
import { selectActionHandler, actionItem } from '../utils/tempTweetContainer';

const TweeterCloneBookmarks = ({ tempTweets }) => {
  return (
    <div className='TweeterHomeContainer'>
      <div className='OthersProfileMain'>
        <aside className='TweeterHomeAside'>
          <div className='ActionListContainer'>
            <ActionItem
              actionItem={actionItem}
              selectActionHandler={selectActionHandler}
            />
          </div>
        </aside>

        <main className='TweeterHome'>{tempTweets}</main>
      </div>
    </div>
  );
};

export default TweeterCloneBookmarks;
