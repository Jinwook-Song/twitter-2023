import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function OAuthButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      onClick={onClick}
      className='px-3 py-1 rounded-2xl shadow-md border-none w-full text-lg active:brightness-105 bg-white text-black flex justify-center items-center gap-x-4'
    >
      <img className='w-6 h-6' src='/github.svg' alt='github logo' />
      <span>Continue with Github</span>
    </button>
  );
}

export default OAuthButton;
