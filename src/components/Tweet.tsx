import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { TweetModel } from '../models/tweet';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { cls } from '../libs/utils';

function Tweet({ id, uid, creator, tweet, photo }: TweetModel) {
  const [fullScreen, setFullScreen] = useState(false);
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok) return;
    try {
      await deleteDoc(doc(db, `tweets/${id}`));
      if (photo) {
        const fileRef = ref(storage, `tweets/${user!.uid}/${id}`);
        await deleteObject(fileRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      setFullScreen(false);
    };
  }, []);
  return (
    <article className='border rounded-md flex p-4'>
      <div className='text-sm basis-3/5 flex flex-col justify-between'>
        <div>
          <h3>{creator}</h3>
          <h3>{tweet}</h3>
        </div>
        {user?.uid === uid && (
          <button
            onClick={onDelete}
            className='bg-red-500 p-1 rounded-md shadow-md w-16 mt-10'
          >
            DELETE
          </button>
        )}
      </div>

      {photo && (
        <div
          onClick={toggleFullScreen}
          className={cls(
            'basis-2/5',
            fullScreen ? 'fixed w-full h-screen inset-0' : ''
          )}
        >
          <img
            className={cls(
              'rounded-md cursor-pointer w-full h-full',
              fullScreen
                ? 'object-contain backdrop-blur-2xl -backdrop-hue-rotate-180'
                : 'aspect-square object-cover'
            )}
            src={photo}
            alt={creator}
          />
        </div>
      )}
    </article>
  );
}

export default Tweet;
