import Tyrion from '../images/tyrion.jpeg';
import Varys from '../images/varys.jpg';
import Jamie from '../images/jaime.jpg';
import Cersei from '../images/cersei.jpeg';
import PhotoWeather from '../images/photo-weather.jpeg';
import Woodey from '../images/woodey.jpeg';

export const tempTweetContainer = [
  {
    image: Cersei,
    name: 'Mikael Stanley',
    time: '24 August at 20:43',
    tweetText:
      '“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin',
    tweetImage: Woodey,
    tweetReply: [],
    retweeted: ['Daniel Jensen'],
  },
  {
    image: Tyrion,
    name: 'Peyton Lyons',
    time: '24 August at 20:43',
    tweetText:
      'Traveling – it leaves you speechless, then turns you into a storyteller.',
    tweetImage: PhotoWeather,
    tweetReply: [
      {
        image: Varys,
        name: 'Lord Varys',
        time: '24 August at 20:43 ',
        text: 'I’ve seen awe-inspiring things that I thought I’d never be able to explain to another person.',
        replyImage: PhotoWeather,
      },
      {
        image: Jamie,
        name: 'Sir Jamie',
        time: '24 August at 20:43',
        text: 'I’ve felt this pull many times, like while road tripping through Morocco. Seeking out the vastness of the desert, and looking inward at the same time.',
        replyImage: PhotoWeather,
      },
    ],
    retweeted: [],
  },
  {
    image: Cersei,
    name: 'Mikael Stanley',
    time: '24 August at 20:43',
    tweetText:
      '“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton',
    // tweetImage: Woodey,
    tweetReply: [
      {
        image: Varys,
        name: 'Lord Varys',
        time: '24 August at 20:43 ',
        text: 'I’ve seen awe-inspiring things that I thought I’d never be able to explain to another person.',
      },
    ],
    retweeted: ['Peyton Lyons'],
  },
];

export const tempTrendList = [
  {
    '#programming': '213k Tweets',
  },
  {
    '#devchallenges': '123k Tweets',
  },
  {
    '#frontend': '34k Tweets',
  },
  {
    '#helsinki': '11k Tweets',
  },
  {
    '#100DaysOfCode': '5k Tweets',
  },
  {
    '#learntocode': '1k Tweets',
  },
];

export const tempFollowList = [
  {
    userImage: Jamie,
    userName: 'Mikael Stanley',
    numFollowers: '230k followers',
    coverImage: PhotoWeather,
    userAbout: 'Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰',
  },
  {
    userImage: Cersei,
    userName: 'Austin Neill',
    numFollowers: '120k followers',
    coverImage: PhotoWeather,
    userAbout: 'Follow me on IG: @arstyy',
  },
];

export const tweetActionOptions = [
  { chat_bubble_outline: 'Comments' },
  { sync: 'Retweet' },
  { favorite_border: 'Like' },
  { bookmark_border: 'Saved' },
];

export const iconOptions = [
  { public: 'Everyone' },
  { people: 'People you follow' },
];

export const selectActionHandler = (e) => {
  const itemList = document.querySelectorAll('.ActionListItem');
  itemList.forEach((item) => {
    if (item.textContent === e.target.textContent) {
      item.style.borderLeft = '2px solid #2f80ed';
    } else {
      item.style.borderLeft = 'unset';
    }
  });
};

export const actionItem = ['Tweets', 'Tweets & replies', 'Media', 'Likes'];
