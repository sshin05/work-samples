'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * This signin page is called by NextAuth at certain times. Because we want
 * to always have users sign in with Keycloak, we must call the signIn function
 * directly to send the user to Keycloak. Or, if the user is directed to this page
 * and they are already authenticated, we redirect to the home page. This page has
 * no user interface.
 */

const Signin = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('keycloak');
    } else if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);

  return null;
};

export default Signin;
