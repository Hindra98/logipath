
import { useParams } from 'react-router';

export default function UserProfile() {

  const {id} = useParams();

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className='bg-cameroun-red'>Un test user {id}</h1>
      </div>
      <div className="overflow-x-auto">
       <b> bonjour ici</b>
      </div>
    </div>
  );
}
