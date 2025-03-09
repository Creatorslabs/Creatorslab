"use client"

import { usePrivy } from '@privy-io/react-auth';
import LogoutButton from "../components/logout-button"
import LoginButton from '../components/login-button';

export default function User() {
  const {ready, authenticated, user } = usePrivy();

  if (!(ready && authenticated) || !user) {
    return <LoginButton/>;
  }

  console.log(user);
  

  return (
    <div>
      <p>User {user.id} has linked the following accounts:</p>
      <ul>
        <li>Apple: {user.apple ? user.apple.email : 'None'}</li>
        <li>Discord: {user.discord ? user.discord.username : 'None'}</li>
        <li>Email: {user.email ? user.email.address : 'None'}</li>
        <li>Farcaster: {user.farcaster ? user.farcaster.username : 'None'}</li>
        <li>GitHub: {user.github ? user.github.username : 'None'}</li>
        <li>Google: {user.google ? user.google.email : 'None'}</li>
        <li>Instagram: {user.instagram ? user.instagram.username : 'None'}</li>
        <li>LinkedIn: {user.linkedin ? user.linkedin.email : 'None'}</li>
        <li>Phone: {user.phone ? user.phone.number : 'None'}</li>
        <li>Spotify: {user.spotify ? user.spotify.email : 'None'}</li>
        <li>Telegram: {user.telegram ? user.telegram.username : 'None'}</li>
        <li>Twitter: {user.twitter ? user.twitter.username : 'None'}</li>
        <li>Wallet: {user.wallet ? user.wallet.address : 'None'}</li>
      </ul>
      <LogoutButton />
    </div>
  );
}