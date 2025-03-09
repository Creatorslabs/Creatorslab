import {usePrivy} from '@privy-io/react-auth';

export default function LogoutButton() {
  const {ready, authenticated, logout} = usePrivy();
  
  const disableLogout = !ready || (ready && !authenticated);

  return (
    <button disabled={disableLogout} onClick={logout}>
      Log out
    </button>
  );
}