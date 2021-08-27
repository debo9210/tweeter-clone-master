import React from 'react';
import UserPhotoComponent from './UserPhotoComponent';
import { abbrNum } from '../utils/abbrNum';
import { dateFormatter } from '../utils/daysInMonth';
import {
  tweetActionOptions,
  // tweetActionHandler,
} from '../utils/tempTweetContainer';

const TweetsComponent = ({
  tweetsArray,
  user,
  othersProfileLinkHandler,
  tweetActionHandler,
  commentHandler,
  setCommentHandler,
  comment,
  setCommentIDHandler,
  setCommentImageHandler,
}) => {
  return (
    <div>
      {tweetsArray &&
        tweetsArray.map((twt, i) => (
          <section key={i} className='TweetContainer'>
            {twt.retweets && (
              <div className='Retweeeted'>
                <i className='material-icons'>
                  {twt.retweets.length !== 0 ? 'sync' : ''}
                </i>

                {twt.retweets.slice(0, 1).map((ret, i) => (
                  <p className='RetweetedBy' key={i}>{`${
                    ret.retweetedBy === user.name ? 'You' : ret.retweetedBy
                  } Retweeted`}</p>
                ))}
              </div>
            )}

            {twt.retweets
              .filter((ret) => ret.retweetedBy === user.name)
              .map((ret, i) => (
                <small key={i} style={{ display: 'none' }}>
                  {ret.retweetedBy}
                </small>
              ))}

            <div className='Tweets'>
              <div className='TweetOwnerContainer'>
                <div
                  className='TweetOwnerPic'
                  style={{ backgroundImage: `url(${twt.userImage})` }}
                ></div>
                <div className='TweetOwner'>
                  <p
                    className='TweetOwnerName'
                    onClick={() => othersProfileLinkHandler(twt.name)}
                  >
                    {twt.name}
                  </p>
                  <p className='TweetOwnerTime'>{`${dateFormatter(
                    twt.date,
                    'DD MMMM'
                  )} at ${dateFormatter(twt.date, 'HH:mm')}`}</p>
                </div>
              </div>
              <p className='TweetText'>{twt.userTweet}</p>

              <div className='TweetImageContainer'>
                {twt.tweetImage && (
                  <div
                    className='TweetImage'
                    style={{ backgroundImage: `url(${twt.tweetImage})` }}
                  ></div>
                )}

                <div className='Tweet-Comment-Saved-Count'>
                  <p className='CountText'>
                    {twt.comments.length > 1
                      ? `${abbrNum(twt.comments.length, 2)} Comments`
                      : twt.comments.length <= 1
                      ? `${twt.comments.length} Comment`
                      : ''}
                  </p>
                  <p className='CountText'>
                    {`${abbrNum(twt.retweets.length, 2)} Retweets`}
                  </p>
                  <p className='CountText'>{`${abbrNum(234, 2)} Saved`}</p>
                </div>
              </div>

              <div className='TweetActionContainer'>
                {tweetActionOptions.map((item, i) => (
                  <div
                    key={i}
                    className='TweetAction'
                    onClick={tweetActionHandler}
                    data-twtid={twt._id}
                    data-username={user.name}
                  >
                    <i
                      className='material-icons'
                      style={
                        Object.values(item)[0] ===
                        tweetActionOptions[0].chat_bubble_outline
                          ? { transform: 'rotateY(180deg)' }
                          : { transform: 'rotateY(0deg)' }
                      }
                    >
                      {Object.keys(item)}
                    </i>

                    <p title={Object.values(item)}>{Object.values(item)}</p>
                  </div>
                ))}
              </div>

              <div className='UserTweetReplyContainer'>
                <UserPhotoComponent user={user} />
                <div className='ReplyInputGroup'>
                  <input
                    onKeyDown={commentHandler}
                    onChange={setCommentHandler}
                    type='text'
                    value={comment}
                    onClick={setCommentIDHandler}
                    placeholder='Tweet your reply'
                    data-tweetid={twt._id}
                  />
                  <label>
                    <i className='material-icons' title='Add image'>
                      crop_original
                    </i>
                    <input
                      type='file'
                      onChange={setCommentImageHandler}
                      hidden
                    />
                  </label>
                </div>
              </div>

              <div
                className='hide_Show_ReplyContainer'
                style={
                  twt.comments.length > 1
                    ? { height: '250px' }
                    : { height: '20%' }
                }
              >
                {twt.comments.map((item, i) => (
                  <div key={i} className='UsersTweetReplyContainer'>
                    <div
                      className='TweetOwnerPic'
                      style={{ backgroundImage: `url(${item.userImage})` }}
                    ></div>
                    <div className='UsersTweetReply'>
                      <div className='UsersTweetReplyBody'>
                        <div className='TweetReplyNameContainer'>
                          <p className='TweetReplyName'>{item.name}</p>
                          <p
                            className='TweetOwnerTime'
                            style={{ margin: '0 0 0 10px' }}
                          >
                            {`${dateFormatter(
                              item.date,
                              'DD MMMM'
                            )} at ${dateFormatter(item.date, 'HH:mm')}`}
                          </p>
                        </div>
                        {item.replyImage && (
                          <div
                            className='ReplyImage'
                            style={{
                              backgroundImage: `url(${item.replyImage})`,
                            }}
                          ></div>
                        )}

                        <p className='UsersTweetReplyText'>{item.replyText}</p>
                      </div>

                      <div className='LikesCounterContainer'>
                        <div className='Likes'>
                          <i className='material-icons'>favorite_border</i>
                          <p>Like</p>
                        </div>
                        <p>
                          <span>12k</span> Likes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
    </div>
  );
};

export default TweetsComponent;
