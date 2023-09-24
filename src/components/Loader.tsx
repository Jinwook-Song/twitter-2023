import { ClimbingBoxLoader } from 'react-spinners';

function Loader() {
  return (
    <section className='w-full h-screen flex justify-center items-center'>
      <ClimbingBoxLoader size={30} />
    </section>
  );
}

export default Loader;
