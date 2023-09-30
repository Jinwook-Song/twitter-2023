import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { TweetModel } from '../models/tweet';
import { deleteObject, ref } from 'firebase/storage';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { cls } from '../libs/utils';

function Tweet({ id, uid, creator, tweet, photo }: TweetModel) {
  const [fullScreen, setFullScreen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const user = auth.currentUser;

  const onEdit = async () => {
    setEdit((prev) => !prev);
  };

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editTweet) return;
    await updateDoc(doc(db, `tweets/${id}`), {
      tweet: editTweet,
    });
    setEdit(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTweet(e.currentTarget.value);
  };

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
      setEdit(false);
      setFullScreen(false);
    };
  }, []);

  return (
    <article className='border rounded-md flex p-4'>
      <div className='text-sm basis-3/5 flex flex-col justify-between'>
        <div className='flex flex-col gap-y-1 pr-2'>
          <h3 className='font-semibold text-lg'>{creator}</h3>
          {edit ? (
            <form onSubmit={onUpdate} className='flex gap-x-2'>
              <input
                required
                className='text-black px-1 rounded-md w-full'
                onChange={onChange}
                defaultValue={tweet}
              />
              <button className='bg-amber-500 text-white rounded-md shadow-md px-1'>
                SAVE
              </button>
            </form>
          ) : (
            <h3 className='whitespace-pre-line'>{tweet}</h3>
          )}
        </div>
        {user?.uid === uid && (
          <section className='flex gap-x-2'>
            <button
              onClick={onEdit}
              className='bg-white text-red-500 p-1 rounded-md shadow-md w-16 mt-10'
            >
              EDIT
            </button>
            <button
              onClick={onDelete}
              className='bg-red-500 p-1 rounded-md shadow-md w-16 mt-10'
            >
              DELETE
            </button>
          </section>
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
