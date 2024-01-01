'use client';

// Hooks
import { useDeferredValue, useState } from 'react';

// Components
import ToursList from '@/components/tours/allTours/ToursList';

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const deferredSearchValue = useDeferredValue(searchValue);

  return (
    <>
      <div className="w-full flex justify-center">
        <form className="lg:w-1/2 mb-12">
          <div className="join w-full">
            <input
              type="text"
              placeholder="enter city or country here..."
              className="input input-bordered join-item w-full"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              required
            />
            <button className="btn btn-primary join-item lg:w-36" type="button" onClick={() => setSearchValue('')}>
              reset
            </button>
          </div>
        </form>
      </div>
      <ToursList searchValue={deferredSearchValue} />
    </>
  );
};
export default ToursPage;
