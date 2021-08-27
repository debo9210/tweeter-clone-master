import React, { useState } from 'react';
import ActionItem from './ActionItem';
import { selectActionHandler } from '../utils/tempTweetContainer';
import '../css/TweeterExplore.css';

const TweeterCloneExplore = ({ tempTweets }) => {
  const [actionItem] = useState(['Top', 'Latest', 'People', 'Media']);

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
          {tempTweets}
        </main>
      </div>
    </div>
  );
};

export default TweeterCloneExplore;
