// Libs
import { UserButton, auth, currentUser } from '@clerk/nextjs';

// Utils
import { fetchOrCreateUser } from '@/utils/actions';

const USER_BUTTON_PROPS = {
  afterSignOutUrl: '/',
  appearance: {
    elements: {
      userButtonAvatarBox: { width: 24, height: 24 },
    },
  },
};

const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  await fetchOrCreateUser(userId as string);

  return (
    <div className="pl-1 flex items-center gap-2">
      <UserButton {...USER_BUTTON_PROPS} />
      <h4 className="text-sm">{user?.emailAddresses[0].emailAddress}</h4>
    </div>
  );
};

export default MemberProfile;
