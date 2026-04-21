import { redirect } from 'next/navigation';

// Root "/" redirects to privacy — the main public landing for the app store listing.
export default function RootPage() {
  redirect('/privacy');
}
