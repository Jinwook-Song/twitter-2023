import { auth, db, storage } from '../firebase';
import { ChangeEvent, useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { TweetModel } from '../models/tweet';
import Tweet from '../components/Tweet';

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<TweetModel[]>([]);

  const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      setAvatar(URL.createObjectURL(file));
      const avatarRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(avatarRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, 'tweets'),
      where('uid', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, uid, creator, photo } =
        doc.data() as TweetModel;
      return {
        tweet,
        createdAt,
        uid,
        creator,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <section className='w-full flex flex-col items-center gap-y-4'>
      <label
        htmlFor='avatar'
        className='w-16 aspect-square rounded-full flex justify-center items-center border-2 cursor-pointer overflow-hidden shrink-0'
      >
        {avatar ? (
          <img className='object-cover' src={avatar} alt='avatar' />
        ) : (
          <svg
            className='w-[80%]'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path d='M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z' />
          </svg>
        )}
      </label>
      <input
        onChange={onAvatarChange}
        type='file'
        accept='image/*'
        id='avatar'
        className='hidden'
      />
      <h2>{user?.displayName ?? 'Anonymous'}</h2>
      <section className='w-full flex flex-col gap-y-4'>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </section>
    </section>
  );
}
