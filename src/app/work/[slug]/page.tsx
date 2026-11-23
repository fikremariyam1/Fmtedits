import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/siteConfig';
import { getVideoObjectSchema, getBreadcrumbSchema } from '@/lib/schema';
import CaseStudyClientView from './CaseStudyClientView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Video Edit Case Study`;
  const description = `${project.subtitle} — ${project.caseStudy.projectOverview.summary || project.oneLiner} Professional video editing and motion design by FMTEDITZ.`;
  const imageUrl = project.posterImage || project.caseStudy.heroPoster || `${siteConfig.siteUrl}/images/editor.png`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      ...project.editingType,
      'Video Editor in Ethiopia',
      'Video Editor Addis Ababa',
      'FMTEDITZ',
      'Fikremariyam Tadesse',
      'Video Editing Case Study',
    ],
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | FMTEDITZ Video Editing Case Study`,
      description,
      url: `${siteConfig.siteUrl}/work/${project.slug}`,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: `${project.title} video edit by FMTEDITZ in Ethiopia`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} // Video Edit | FMTEDITZ`,
      description,
      creator: '@fmtedits',
      images: [imageUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const nextProject = projects.find((p) => p.slug === project.caseStudy.nextProjectSlug) || projects[0];

  const videoSchema = getVideoObjectSchema(project);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Selected Work', url: '/#work' },
    { name: project.title, url: `/work/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CaseStudyClientView project={project} nextProject={nextProject} />
    </>
  );
}
