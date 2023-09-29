import PostTweet from '../components/PostTweet';
import Timeline from '../components/Timeline';

function Home() {
  return (
    <section className='w-full flex flex-col gap-y-8'>
      <PostTweet />
      <Timeline />
    </section>
  );
}

export default Home;
