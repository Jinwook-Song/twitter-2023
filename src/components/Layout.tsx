import { Link, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useRef } from 'react';

function Layout() {
  const ref = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const onConfirm = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <>
      <section className='flex flex-col sm:flex-row w-full max-w-2xl p-5 sm:p-20 gap-8'>
        <aside className='flex flex-row sm:flex-col gap-8'>
          <Link to={'/'}>
            <button className='w-10 h-10 border border-white p-1 rounded-full flex justify-center items-center'>
              <img src='/icons/home.svg' alt='home icon' />
            </button>
          </Link>
          <Link to={'/profile'}>
            <button className='w-10 h-10 border border-white p-1 rounded-full flex justify-center items-center'>
              <img src='/icons/profile.svg' alt='profile icon' />
            </button>
          </Link>
          <button
            onClick={() => ref.current?.showModal()}
            className='w-10 h-10 border border-white p-1 rounded-full flex justify-center items-center'
          >
            <img src='/icons/signout.svg' alt='signout icon' />
          </button>
        </aside>

        <Outlet />
      </section>
      <dialog className='bg-amber-100 shadow-md rounded-lg p-4' ref={ref}>
        <h1 className='pb-8'>Are you sure you want to sign out?</h1>
        <form
          className='flex gap-x-4 justify-center items-center'
          method='dialog'
        >
          <button
            className='bg-white rounded-md px-4 py-2'
            onClick={() => ref.current?.close()}
          >
            close
          </button>
          <button
            className='bg-amber-500 active:brightness-105 text-white rounded-md px-4 py-2'
            onClick={onConfirm}
          >
            confirm
          </button>
        </form>
      </dialog>
    </>
  );
}

export default Layout;
