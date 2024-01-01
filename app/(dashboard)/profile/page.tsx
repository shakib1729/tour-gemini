// Libs
import { auth, UserProfile } from '@clerk/nextjs';

// Utils
import { fetchUserById } from '@/utils/actions';

const UserProfilePage = async () => {
  const { userId } = auth();
  const user = await fetchUserById(userId as string);
  const currentTokens = user?.tokens;

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 ml-8 text-xl font-extrabold">Token Amount: {currentTokens}</h2>
      <UserProfile />
    </div>
  );
};
export default UserProfilePage;
