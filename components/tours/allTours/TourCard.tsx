// Libs
import Link from 'next/link';

// Types
import type { Tour } from '@/types';

const TourCard = ({ tour }: { tour: Tour }) => {
  const { city, id, country } = tour;

  return (
    <Link href={`/tours/${id}`} className="card card-compact rounded-xl bg-base-100 hover:text-primary">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center capitalize">
          {city}, {country}
        </h2>
      </div>
    </Link>
  );
};
export default TourCard;
