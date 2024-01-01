// Libs
import Link from 'next/link';
import { redirect } from 'next/navigation';

// Components
import TourInfo from '@/components/tours/TourInfo';

// Utils
import { getSingleTour } from '@/utils/actions';

const SingleTourPage = async ({ params }: { params: { id: string } }) => {
  const tour = await getSingleTour(params.id);
  if (!tour) {
    redirect('/tours');
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Link href="/tours" className="btn btn-primary mb-12">
        back to tours
      </Link>
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
