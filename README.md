<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img width="318" alt="logo" src="https://github.com/shakib1729/tour-gemini/assets/39847281/07cbd018-2d2a-43e6-a676-52efbbec9d22">
  <p align="center">
    <br />
    Visit:  https://tour-gemini.vercel.app
    <br />
    <br />
    <a href="https://github.com/shakib1729/tour-gemini/issues/new">Report Bug</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>   
      <ul>
        <li><a href="#project-overview">Project Overview</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
  </ol>
</details>

## About The Project

### Project Overview

- Chat with AI:
    - Users can interact with an AI chatbot, asking questions and receiving responses in a natural language format.
    - Output restricted to 100 tokens for now.

- Tour Generation:
    - Users can enter a place name.
    - The AI will generate a one-day tour itinerary for that place (If that place was already searched before, the response is taken from the database instead).
    - The tour itinerary includes a list of attractions to visit, along with an image of the place.

- Saved Tours:
    - Users can view a list of their previously generated tours.
    - They can also access and view the details of each tour.

- Token Limit:
    - Each user has a limited number of tokens available.
    - Tokens are consumed with each chat message sent and tour generation request.
    - Users are notified of the number of tokens consumed in each request.
    - They can view their available token amount in the profile section.

<img width="1707" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/2df9ba7e-79bf-49fd-8d19-da052302fe3c">
<img width="1697" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/a0a4233b-a5a6-440c-bccf-86215463cbd8">
<img width="1704" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/3618356c-d8c2-47fc-8d47-d5d266cc43df">
<img width="1692" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/8a92c545-0202-453f-876c-f1bae6b09c4a">

### Built With

This web app is developed using the following:

- [Next.js](https://nextjs.org/)
- [Google Gemini API](https://ai.google.dev/)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.com/)
- [Unsplash API](https://unsplash.com/)
- Deployment: [PlanetScale](https://planetscale.com/), [Vercel](https://vercel.com/)
- Additional libraries/packages used:  [Tailwind](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/), [React Query](https://tanstack.com/query/v3/), [React Hot Toast](https://react-hot-toast.com/), [React Icons](https://react-icons.github.io/react-icons/)

## Usage

The live version of this web app is deployed at: https://tour-gemini.vercel.app
<br />
To set up locally, follow these simple steps:

1. Clone the repo
   ```sh
   git clone https://github.com/shakib1729/tour-gemini.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Setup `DATABSAE_URL` (for Prisma) in `.env` file and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `GEMINI_API_KEY`, `UNSPLASH_API_KEY` in `.env.local`
3. Run the project
   ```sh
   npm run dev
   ```