import { signInWithEmailAndPassword } from 'firebase/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import OAuthButton from '../components/OAuthButton';

export type LoginForm = {
  email: string;
  password: string;
};

const DEFULAT_DATA: LoginForm = {
  email: '',
  password: '',
};

function CreatAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<LoginForm>(DEFULAT_DATA);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (loading) return;
    const { email, password } = form;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full max-w-2xl h-full flex flex-col mx-auto items-center px-10 pt-20 gap-y-8'>
      <h1 className='text-3xl'>Log into 𝕏</h1>
      <form className='w-full flex flex-col gap-y-4' onSubmit={onSubmit}>
        <input
          className='px-3 py-1 rounded-2xl shadow-md border-none w-full text-lg text-black outline-none'
          onChange={onChange}
          type='email'
          name='email'
          value={form.email}
          placeholder='Email'
          required
        />
        <input
          className='px-3 py-1 rounded-2xl shadow-md border-none w-full text-lg text-black outline-none'
          onChange={onChange}
          type='password'
          name='password'
          value={form.password}
          placeholder='Password'
          required
        />
        <button
          className='px-3 py-1 rounded-2xl shadow-md border-none w-full text-lg active:brightness-105 bg-amber-500 flex justify-center items-center'
          disabled={loading}
        >
          {loading ? <BeatLoader className='py-1' /> : <span>Log in</span>}
        </button>
      </form>
      {error && <p className='text-red-600 w-full'>{error}</p>}
      <p>
        {"Don't have an account?"}{' '}
        <Link className='text-amber-500' to={'/create-account'}>
          Create one &rarr;
        </Link>
      </p>
      <OAuthButton />
    </section>
  );
}

export default CreatAccount;
