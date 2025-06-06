import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

/**
 * Redirects to the login page if the user is not logged in.
 */
export const loggedInProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  if (!session) {
    redirect('/auth/signin');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an admin.
 */
export const adminProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.randomKey !== Role.ADMIN) {
    redirect('/not-authorized');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an auditor.
 */
export const auditorProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.randomKey !== Role.AUDITOR) {
    redirect('/not-authorized');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an analyst or admin.
 */
export const analystOrAdminProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string } } | null,
) => {
  loggedInProtectedPage(session);
  if (session && session.user.randomKey !== Role.ANALYST && session.user.randomKey !== Role.ADMIN) {
    redirect('/not-authorized');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an analyst or executive.
 */
export const analystOrExecutiveProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string } } | null,
) => {
  loggedInProtectedPage(session);
  if (session && session.user.randomKey !== Role.ANALYST && session.user.randomKey !== Role.EXECUTIVE) {
    redirect('/not-authorized');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user has the USER role.
 */
export const notUserProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.randomKey === Role.USER) {
    redirect('/not-authorized');
  }
};
