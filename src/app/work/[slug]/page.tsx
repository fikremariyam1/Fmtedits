import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import CaseStudyClientView from './CaseStudyClientView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const nextProject = projects.find((p) => p.slug === project.caseStudy.nextProjectSlug) || projects[0];
  return <CaseStudyClientView project={project} nextProject={nextProject} />;
}
