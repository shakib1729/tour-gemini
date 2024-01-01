// Libs
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { auth } from '@clerk/nextjs';

// Components
import ToursPage from '@/components/tours/allTours/ToursPage';

// Utils
import { getAllToursForUser } from '@/utils/actions';

const AllToursPage = async () => {
  const queryClient = new QueryClient();
  const { userId } = auth();

  await queryClient.prefetchQuery({
    queryKey: ['tours', userId],
    queryFn: () => getAllToursForUser(userId as string),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPage />
    </HydrationBoundary>
  );
};

export default AllToursPage;
