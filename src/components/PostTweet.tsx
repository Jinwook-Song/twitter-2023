import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function PostTweet() {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChnage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setTweet(value);
  };
  const onFilechange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (loading || !tweet || !user) return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        uid: user.uid,
        creator: user.displayName,
        createdAt: Date.now(),
      });
      if (file) {
        const fileRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(fileRef, file);
        const photoUrl = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: photoUrl,
        });
      }
      setTweet('');
      setFile(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-y-4 w-full'>
      <textarea
        onChange={onChnage}
        className='border border-white focus:border-amber-500 p-3 rounded-md shadow-lg text-lg outline-none bg-black resize-none placeholder:opacity-30'
        placeholder='what is happening?'
        required
        value={tweet}
        rows={2}
        maxLength={200}
      ></textarea>
      {file && (
        <div className='relative'>
          <img
            className='w-full aspect-[4/3] object-cover rounded-md border border-white'
            src={URL.createObjectURL(file)}
            alt='preview'
          />
          <button
            onClick={() => setFile(null)}
            className='absolute top-4 right-4 bg-white w-6 h-6 rounded-full text-sm'
          >
            ❌
          </button>
        </div>
      )}

      <label
        htmlFor='file'
        className='w-full border border-amber-500 hover:border-dashed text-amber-500 py-2 cursor-pointer bg-black text-center rounded-md'
      >
        Add photo
      </label>
      <input
        onChange={onFilechange}
        className='hidden'
        type='file'
        id='file'
        accept='image/*'
      />
      <button
        disabled={loading}
        className='w-full py-2 cursor-pointer bg-amber-500 text-center rounded-md active:brightness-105'
      >
        {loading ? 'Posting...' : 'Post Tweet'}
      </button>
    </form>
  );
}

export default PostTweet;
