import { useEffect, useState } from 'react';
import { TweetModel } from '../models/tweet';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Tweet from './Tweet';

function Timeline() {
  const [tweets, setTweets] = useState<TweetModel[]>([]);

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { uid, tweet, creator, photo, createdAt } =
        doc.data() as TweetModel;
      return {
        id: doc.id,
        uid,
        tweet,
        creator,
        photo,
        createdAt,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <div className='flex flex-col gap-y-4'>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}

export default Timeline;
