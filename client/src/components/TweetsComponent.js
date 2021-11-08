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
  // comment,
  setCommentIDHandler,
  setCommentImageHandler,
  commentLikeHandler,
  windowWidth,
}) => {
  const actionStyles = (item, twt) => {
    const style = {
      transform:
        Object.values(item)[0] === 'Comments'
          ? 'rotateY(180deg)'
          : 'rotateY(180deg)',
      color:
        Object.values(item)[0] === 'Save' && twt.saved.includes(user.id)
          ? '#2D9CDB'
          : Object.values(item)[0] === 'Like' &&
            twt.userLikedID.includes(user.id)
          ? '#EB5757'
          : Object.values(item)[0] === 'Retweet' &&
            twt.userRetweetedID.includes(user.id)
          ? '#27AE60'
          : '#4f4f4f',
      marginRight: windowWidth <= 417 && '5px',
    };

    return style;
  };

  const actionTextStyles = (item, twt) => {
    const style = {
      color:
        Object.values(item)[0] === 'Save' && twt.saved.includes(user.id)
          ? '#2D9CDB'
          : Object.values(item)[0] === 'Like' &&
            twt.userLikedID.includes(user.id)
          ? '#EB5757'
          : Object.values(item)[0] === 'Retweet' &&
            twt.userRetweetedID.includes(user.id)
          ? '#27AE60'
          : '#4f4f4f',
      fontSize: windowWidth <= 417 && '10px',
    };

    return style;
  };

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
                  <p className='CountText'>{`${abbrNum(
                    twt.saved.length,
                    2
                  )} Saved`}</p>
                </div>
              </div>

              <div className='TweetActionContainer' data-twtid={twt._id}>
                {tweetActionOptions.map((item, i) => (
                  <div
                    key={i}
                    className='TweetAction'
                    onClick={tweetActionHandler}
                    data-twtid={twt._id}
                    data-username={user.name}
                    data-userid={user.id}
                    style={
                      windowWidth <= 417
                        ? { width: '25%', padding: '5px 8px' }
                        : { width: '' }
                    }
                  >
                    <i
                      className='material-icons'
                      style={actionStyles(item, twt)}
                    >
                      {Object.keys(item)[0] === 'bookmark_border' &&
                      twt.saved.includes(user.id)
                        ? 'bookmark'
                        : Object.keys(item)}
                    </i>

                    <p
                      title={
                        Object.values(item)[0] === 'Save' &&
                        twt.saved.includes(user.id)
                          ? 'Saved'
                          : Object.values(item)[0] === 'Like' &&
                            twt.userLikedID.includes(user.id)
                          ? 'Liked'
                          : Object.values(item)[0] === 'Retweet' &&
                            twt.userRetweetedID.includes(user.id)
                          ? 'Undo Retweet'
                          : Object.values(item)
                      }
                      style={actionTextStyles(item, twt)}
                    >
                      {Object.values(item)[0] === 'Save' &&
                      twt.saved.includes(user.id)
                        ? 'Saved'
                        : Object.values(item)[0] === 'Like' &&
                          twt.userLikedID.includes(user.id)
                        ? 'Liked'
                        : Object.values(item)[0] === 'Retweet' &&
                          twt.userRetweetedID.includes(user.id)
                        ? 'Retweeted'
                        : Object.values(item)}
                    </p>
                  </div>
                ))}
              </div>

              {twt.whoCanReply === 'Everyone' ? (
                <div className='UserTweetReplyContainer'>
                  <UserPhotoComponent user={user} />
                  <div className='ReplyInputGroup'>
                    <input
                      onKeyDown={commentHandler}
                      onChange={setCommentHandler}
                      type='text'
                      // value={comment}
                      onClick={setCommentIDHandler}
                      placeholder='Tweet your reply'
                      data-tweetid={twt._id}
                      spellCheck
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
              ) : twt.whoCanReply === 'People you follow' &&
                user.followers.includes(twt.user) ? (
                <div className='UserTweetReplyContainer'>
                  <UserPhotoComponent user={user} />
                  <div className='ReplyInputGroup'>
                    <input
                      onKeyDown={commentHandler}
                      onChange={setCommentHandler}
                      type='text'
                      // value={comment}
                      onClick={setCommentIDHandler}
                      placeholder='Tweet your reply'
                      data-tweetid={twt._id}
                      spellCheck
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
              ) : twt.user !== user.id ? (
                <div className='UserTweetReplyContainer'>
                  <UserPhotoComponent user={user} />
                  <div className='ReplyInputGroup'>
                    <input
                      onKeyDown={commentHandler}
                      onChange={setCommentHandler}
                      type='text'
                      // value={comment}
                      onClick={setCommentIDHandler}
                      placeholder='Tweet your reply'
                      data-tweetid={twt._id}
                      spellCheck
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
              ) : null}

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
                        <div
                          className='Likes'
                          onClick={commentLikeHandler}
                          title={
                            item.likes.includes(user.id) ? 'Unlike' : 'Like'
                          }
                          data-commentid={item._id}
                        >
                          <i
                            className='material-icons'
                            style={
                              item.likes.includes(user.id)
                                ? { color: '#EB5757' }
                                : { color: '#bdbdbd' }
                            }
                          >
                            {item.likes.includes(user.id)
                              ? 'favorite'
                              : 'favorite_border'}
                          </i>
                          <p
                            style={
                              item.likes.includes(user.id)
                                ? { color: '#EB5757' }
                                : { color: '#bdbdbd' }
                            }
                          >
                            {item.likes.includes(user.id) ? 'Liked' : 'Like'}
                          </p>
                        </div>

                        <p>
                          {item.likes.length > 1
                            ? `${abbrNum(item.likes.length, 2)} Likes`
                            : item.likes.length <= 1
                            ? `${item.likes.length} Like`
                            : ''}
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
