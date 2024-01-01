'use server';

// Libs
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/utils/db';
import { revalidatePath } from 'next/cache';

// Types
import type { Destination, Tour } from '@/types';

const GENERATION_CONFIG = {
  temperature: 0,
  maxOutputTokens: 100,
};
// remove these hard coded value once Gemini API starts returning tokenCount for a request-response
const TOUR_RESPONSE_TOKENS = 450;
const CHAT_RESPONSE_TOKENS = 200;
const IMAGE_API_URL = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const chat = model.startChat({
  generationConfig: GENERATION_CONFIG,
});

export const generateChatResponse = async (chatMessage: string) => {
  try {
    const result = await chat.sendMessage(chatMessage);
    const response = result.response;
    return { message: response.text(), tokens: CHAT_RESPONSE_TOKENS };
  } catch (error) {
    return null;
  }
};

const getTourPrompt = ({ city, country }: Destination) => `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour in at max 4 words",
    "description": "two line description of the city and tour",
    "stops": ["one line description of stop 1 ", "one line description of stop 2","one line description of stop 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;

export const generateTourResponse = async (destination: Destination) => {
  const prompt = getTourPrompt(destination);
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const tourData = JSON.parse(text);
    if (!tourData.tour) {
      return null;
    }
    return { tour: tourData.tour, tokens: TOUR_RESPONSE_TOKENS };
  } catch (error) {
    return null;
  }
};

export const generateImageForDestination = async ({ city }: Destination) => {
  const response = await fetch(`${IMAGE_API_URL}${city}`);
  const data = await response.json();
  return data?.results?.[0]?.urls?.regular;
};

export const getExistingTour = async ({ city, country }: Destination) =>
  prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });

export const createNewTour = async (tour: Omit<Tour, 'id' | 'stops'> & { stops: string[] }) =>
  prisma.tour.create({
    data: tour,
  });

export const connectUserWithTour = (userId: string, tourId: string) =>
  prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tours: {
        connect: { id: tourId },
      },
    },
  });

export const fetchUserById = async (userId: string) =>
  prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

export const createUserFromId = async (userId: string) =>
  prisma.user.create({
    data: {
      id: userId,
    },
  });

export const getAllToursForUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      tours: true,
    },
  });
  return user?.tours;
};

export const getSingleTour = async (id: string) =>
  prisma.tour.findUnique({
    where: {
      id,
    },
  });

export const fetchOrCreateUser = async (userId: string) => {
  const result = await fetchUserById(userId);
  if (result) {
    return result;
  }
  return createUserFromId(userId);
};

export const subtractTokensAndConnectUserWithTour = async (userId: string, tourId: string, tokens: number) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
      tours: {
        connect: { id: tourId },
      },
    },
  });
  revalidatePath('/profile');
  return result.tokens;
};

export const subtractTokens = async (userId: string, tokens: number) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath('/profile');
  return result.tokens;
};
