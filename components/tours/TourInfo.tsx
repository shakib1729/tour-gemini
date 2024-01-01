// Libs
import Image from 'next/image';

// Types
import type { Tour } from '@/types';

const TourInfo = ({ tour }: { tour: Tour }) => {
  const { title, description, stops, city, imageUrl } = tour;

  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-1/2 flex items-center flex-col">
        <h1 className="text-4xl font-semibold mb-4">{title}</h1>
        {imageUrl ? (
          <div>
            <Image
              src={imageUrl}
              alt={tour.title}
              width={300}
              height={300}
              className="rounded-xl shadow-xl mb-8 h-96 w-96 object-cover"
              priority
            />
          </div>
        ) : null}
        <p className="leading-loose mb-6">{description}</p>
        <ul>
          {(stops as string[]).map(stop => (
            <li key={stop} className="mb-4 bg-base-100 p-4 rounded-xl">
              <p>{stop}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TourInfo;
