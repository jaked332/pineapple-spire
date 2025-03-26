import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ChangeRoleForm from '@/components/ChangeRoleForm';

/**
 * ChangeRolePage renders the form to change the user's role.
 * @param params - Contains the user ID parameter from route.
 */
export default async function ChangeRolePage({
  params,
}: {
  params: { id: string | string[] };
}) {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  const user: User | null = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return notFound();
  }

  return (
    <main>
      <ChangeRoleForm user={user} />
    </main>
  );
}
