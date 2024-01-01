// Libs
import Link from 'next/link';
import { SiOpenaigym } from 'react-icons/si';

export default function Home() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold text-primary">TourGemini</h1>
          <p className="text-lg leading-loose">Generate Tours using AI!</p>
          <SiOpenaigym size="64px" className="text-primary" />
          <Link className="btn btn-secondary max-w-fit" href="/chat">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
