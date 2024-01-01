import type { User as DBUser, Tour as DBTour } from '@prisma/client';

export type Tour = DBTour;
export type User = DBUser & { tours: Tour[] };
export type Destination = Pick<Tour, 'city' | 'country'>;
export type ChatMessage = { role: string; parts: string };
