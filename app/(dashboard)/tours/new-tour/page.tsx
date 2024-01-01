// Libs
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

// Components
import NewTour from '@/components/tours/NewTour';

const NewTourPage = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour />
    </HydrationBoundary>
  );
};

export default NewTourPage;
