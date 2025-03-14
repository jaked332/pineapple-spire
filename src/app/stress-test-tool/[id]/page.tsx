import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StressScenario } from '@prisma/client';

interface StressScenarioPageProps {
  params: {
    id: string;
  };
}

export default async function StressScenarioPage({ params }: StressScenarioPageProps) {
  const { id } = params;

  const scenario: StressScenario | null = await prisma.stressScenario.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!scenario) {
    notFound();
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>{scenario.title}</h1>
      <p>{scenario.description}</p>
      {scenario.excelWorkbookUrl && (
        <p>
          <Link
            href={scenario.excelWorkbookUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Stress Test Workbook
          </Link>
        </p>
      )}
    </main>
  );
}
