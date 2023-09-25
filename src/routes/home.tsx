import { auth } from '../firebase';

function Home() {
  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={signOut}>logout</button>
    </div>
  );
}

export default Home;
