import React from 'react';
import '../css/TweeterHome.css';

const ActionItem = ({ actionItem, selectActionHandler }) => {
  return (
    <ul className='ActionList'>
      {actionItem.map((item, i) => (
        <li key={i} className='ActionListItem' onClick={selectActionHandler}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ActionItem;
