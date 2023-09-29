import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { TweetModel } from '../models/tweet';
import { deleteObject, ref } from 'firebase/storage';

function Tweet({ id, uid, creator, tweet, photo }: TweetModel) {
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
        <div className='basis-2/5'>
          <img
            className='aspect-square object-cover rounded-md'
            src={photo}
            alt={creator}
          />
        </div>
      )}
    </article>
  );
}

export default Tweet;
