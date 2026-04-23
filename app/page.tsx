'use client';

import { useEffect } from 'react';

const RESET_PASSWORD_PATH = '/reset-password';
const PRIVACY_PATH = '/privacy';

function isRecoveryRedirect(search: string, hash: string) {
  const queryParams = new URLSearchParams(search);
  const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);

  return (
    hashParams.has('access_token') ||
    queryParams.has('code') ||
    (queryParams.get('type') === 'recovery' && queryParams.has('token_hash'))
  );
}

// Root "/" normally redirects to privacy, but Supabase recovery emails can land
// here when the reset request omits redirectTo. Preserve the token URL intact.
export default function RootPage() {
  useEffect(() => {
    const target = isRecoveryRedirect(window.location.search, window.location.hash)
      ? `${RESET_PASSWORD_PATH}${window.location.search}${window.location.hash}`
      : PRIVACY_PATH;

    window.location.replace(target);
  }, []);

  return null;
}
