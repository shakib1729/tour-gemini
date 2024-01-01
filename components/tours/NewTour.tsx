'use client';

// Libs
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import type { FormEventHandler } from 'react';

// Components
import TourInfo from '@/components/tours/TourInfo';

// Utils
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  generateImageForDestination,
  connectUserWithTour,
  fetchUserById,
  subtractTokensAndConnectUserWithTour,
} from '@/utils/actions';

// Types
import type { Destination } from '@/types';

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth() as { userId: string };

  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination: Destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) {
        await connectUserWithTour(userId, existingTour.id);
        await queryClient.invalidateQueries({ queryKey: ['tours', userId] });
        return existingTour;
      }

      const user = await fetchUserById(userId);
      const currentTokens = user?.tokens;
      if (currentTokens && currentTokens < 300) {
        toast.error('Token balance too low...');
        return null;
      }

      let newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error('No matching city found...');
        return null;
      }

      const imageUrl = await generateImageForDestination(destination);
      if (imageUrl) {
        newTour = { ...newTour, tour: { ...newTour.tour, imageUrl } };
      }

      const createdTour = await createNewTour(newTour.tour);
      const newTokens = await subtractTokensAndConnectUserWithTour(userId, createdTour.id, newTour.tokens);
      await queryClient.invalidateQueries({ queryKey: ['tours', userId] });
      toast.success(`${newTokens} tokens remaining...`);
      return newTour.tour;
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination as Destination);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit} className="lg:w-1/2 mb-12">
          <h2 className="mb-3">Enter your dream destination</h2>
          <div className="join w-full">
            <input
              type="text"
              className="input input-bordered join-item w-full"
              placeholder="city"
              name="city"
              required
            />
            <input
              type="text"
              className="input input-bordered join-item w-full"
              placeholder="country"
              name="country"
              required
            />
            <button className="btn btn-primary join-item lg:w-48" type="submit">
              {isPending ? 'generating tour...' : 'generate tour'}
            </button>
          </div>
        </form>
      </div>
      {isPending ? (
        <div className="flex justify-center h-[calc(100vh-20rem)]">
          <span className="loading loading-dots loading-lg" />
        </div>
      ) : null}
      {!isPending && tour ? <TourInfo tour={tour} /> : null}
    </>
  );
};

export default NewTour;
