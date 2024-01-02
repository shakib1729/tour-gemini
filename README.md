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
        <li><a href="#workflow">Workflow</a></li>
        <li><a href="#database-schema">Database Schema</a></li>
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

- Tour Generation:
  - Users can enter a place name.
  - The AI will generate a one-day tour itinerary for that place.
  - The tour itinerary includes a list of attractions and an image of the place.

- Saved Tours:
  - Users can view a list of their previously generated tours.
  - They can also access and view the details of each tour.

- Token Management:
  - Each user has a limited number of tokens available.
  - Tokens are consumed with each chat message sent and tour generation request.
  - Users are notified of the number of tokens available after each request.
  - They can view their available token amount in the profile section also.

<img width="1707" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/4e1fa4ca-d28d-485a-a059-9624275a31bd">
<img width="1693" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/e07a02a6-a79b-4db0-ab8f-cb956eae5316">
<img width="1698" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/70b29590-4ff3-4aff-b2eb-d1820e25ed3a">
<img width="1700" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/986ace57-58c4-417e-911f-9f26ade57244">
<img width="1695" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/883ee509-5327-4a68-9a25-3dafab9ef6e4">


### Built With

This web app is developed using the following:

- [Next.js](https://nextjs.org/)
- [Google Gemini API](https://ai.google.dev/)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.com/)
- [Unsplash API](https://unsplash.com/)
- Deployment: [PlanetScale](https://planetscale.com/), [Vercel](https://vercel.com/)
- Additional libraries/packages used:  [Tailwind](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/), [React Query](https://tanstack.com/query/v3/), [React Hot Toast](https://react-hot-toast.com/), [React Icons](https://react-icons.github.io/react-icons/)

### Workflow:
- All communication with the database and external APIs (`Gemini` and `Unsplash`) is handled in `Server Actions`.
- The authentication of users is managed by `Clerk`.


- Chat
  - The user enters a message and this is passed to the `Gemini`'s `sendMessage` function.
  - The received response and previous messages are then displayed to the user.
  - This API internally manages the current chat session context, so we don't need to pass historical messages along with the current message.
  - The response output is restricted to 100 tokens for now.

- New Tour:
  - User enters a city and its country.
  - If this place is already present in the database, then the tour is returned from the database directly.
  - If it is not present in the database, we create a prompt in which we ask `Gemini` to create a one-day tour and return the response in a specific `JSON` format.
  - If `Gemini` can generate a tour and returns the response in the specified `JSON` format, we call the `Unsplash API` to get the image of this place.
  - This tour is stored in the database (to avoid any subsequent calls to `Gemini` for the same place).
  - We also push the current place in the current user's tours list.

- Saved Tours:
  - From the database, we fetch all the tours generated previously by the current user.
  - We can also search for a specific place among the previous tours (using `useDeferredValue` to avoid intermediate re-renderings while the user is typing for a place and keeping the UI responsive).

- Token Management:
  - Each user is allotted some amount of token on initial login.
  - Whenever we make a call to the `Gemini API`, we subtract some amount of tokens from the current user.
  - Tokens are not subtracted when fetching a tour from the database.

### Database Schema
<img width="418" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/a01ed89c-57ae-44cd-bb5a-be894f63552b"> <img width="322" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/9ebe0f24-3309-4572-a64b-ab1c9c7c0278">

- The `ID` of a tour is generated by the database.
- The `ID` of a user is the same as the `Clerk ID`.
- To represent this `many-to-many` relation (each user can have multiple tours and each tour can belong to multiple users), `Prisma` internally creates another table `_TourToUser`.

   <img width="372" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/520b2d82-318e-4256-a727-e03d66c37a1c">

- `_TourToUser` contains 2 columns: the first column is the ID of the `Tour` and the second column is the ID of the `User`.
  <img width="1295" alt="image" src="https://github.com/shakib1729/tour-gemini/assets/39847281/03322afd-f9b2-4a68-a92b-6225408df914">




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
4. Run the project
   ```sh
   npm run dev
   ```