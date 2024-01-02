// Libs
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { MdErrorOutline } from 'react-icons/md';

// Components
import TourCard from '@/components/tours/allTours/TourCard';

// Utils
import { getAllToursForUser } from '@/utils/actions';

const ToursList = ({ searchValue }: { searchValue: string }) => {
  const { userId } = useAuth();

  const { data: tours, isPending } = useQuery({
    queryKey: ['tours', userId],
    queryFn: () => getAllToursForUser(userId as string),
  });

  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredTours =
    tours?.filter(
      tour =>
        tour.city.toLowerCase().includes(lowerCaseSearchValue) ||
        tour.country.toLowerCase().includes(lowerCaseSearchValue)
    ) ?? [];

  if (isPending) {
    return (
      <div className="flex justify-center mt-4">
        <span className="loading loading-dots loading-lg" />
      </div>
    );
  }

  if (filteredTours.length === 0) {
    return (
      <div className="flex flex-col items-center mt-4 gap-3">
        <MdErrorOutline size="96px" />
        <h4 className="text-lg block">No tour found...</h4>
        {searchValue.length === 0 ? <h4 className="text-lg">Please create a new tour</h4> : null}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredTours.map(tour => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

const MemoizedToursList = memo(ToursList);

export { MemoizedToursList as default };
