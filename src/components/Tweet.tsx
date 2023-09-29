import { TweetModel } from '../models/tweet';

function Tweet({ creator, tweet, photo }: TweetModel) {
  return (
    <article className='border rounded-md flex p-4'>
      <div className='text-sm basis-3/5'>
        <h3>{creator}</h3>
        <h3>{tweet}</h3>
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
