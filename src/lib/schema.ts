import { siteConfig } from '@/data/siteConfig';
import { Project } from '@/types/project';
import { parseVideoUrl } from '@/lib/videoUtils';

export function getOrganizationAndPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.name,
        description: siteConfig.heroDescription,
        inLanguage: 'en-US',
        publisher: {
          '@id': `${siteConfig.siteUrl}/#person`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteConfig.siteUrl}/#person`,
        name: siteConfig.creator,
        alternateName: ['FMTEDITZ', 'FMT Edits'],
        url: siteConfig.siteUrl,
        image: `${siteConfig.siteUrl}/images/editor.png`,
        jobTitle: 'Lead Video Editor & Motion Graphics Designer',
        description: siteConfig.extendedBio,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.locationCity,
          addressCountry: 'ET',
        },
        sameAs: [
          siteConfig.links.youtube,
          siteConfig.links.instagram,
          siteConfig.links.telegram,
        ],
        worksFor: {
          '@id': `${siteConfig.siteUrl}/#organization`,
        },
      },
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.name,
        alternateName: 'FMTEDITZ Video Editing & Motion Graphics Services',
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}/images/logo.png`,
        image: `${siteConfig.siteUrl}/images/editor.png`,
        founder: {
          '@id': `${siteConfig.siteUrl}/#person`,
        },
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.locationCity,
          addressRegion: 'Addis Ababa',
          addressCountry: 'ET',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '9.0320',
          longitude: '38.7468',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Addis Ababa',
          },
          {
            '@type': 'Country',
            name: 'Ethiopia',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Worldwide',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Professional Video Editing and Motion Design Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Video Editing Services in Ethiopia',
                description: 'End-to-end professional video editing for Ethiopian creators, enterprises, and international clients.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'YouTube Video Editor Ethiopia',
                description: 'High-retention YouTube essay, talking head, and documentary editing with narrative rhythm.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Short-Form Video Editor (TikTok, Reels, Shorts)',
                description: 'High-retention 9:16 vertical video editing with micro-cuts, kinetic subtitles, and sound foley.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Documentary Video Editing',
                description: 'Cinematic long-form historical and investigative documentary editing with archival grading.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Motion Graphics Designer Ethiopia',
                description: 'Bespoke 2D and 3D kinetic typography, animated maps, UI callout HUDs, and 3D camera tracking.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Commercial Video Editing',
                description: 'High-impact conversion-driven video ads for brands, tech startups, and digital campaigns.',
              },
            },
          ],
        },
      },
    ],
  };
}

export function getVideoObjectSchema(project: Project) {
  const videoInfo = parseVideoUrl(project.caseStudy.heroVideo);
  let embedUrl = project.caseStudy.heroVideo;
  if (videoInfo.type === 'youtube') {
    embedUrl = `https://www.youtube.com/embed/${videoInfo.id}`;
  }

  // Parse duration if string like "00:58"
  let durationIso = 'PT1M';
  const durMatch = project.caseStudy.projectOverview.duration.match(/^(\d{2}):(\d{2})$/);
  if (durMatch) {
    const mins = parseInt(durMatch[1], 10);
    const secs = parseInt(durMatch[2], 10);
    durationIso = `PT${mins > 0 ? mins + 'M' : ''}${secs}S`;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${project.title} — Video Edit by FMTEDITZ`,
    description: project.caseStudy.projectOverview.summary || project.oneLiner,
    thumbnailUrl: [
      project.caseStudy.heroPoster || project.posterImage || `${siteConfig.siteUrl}/images/editor.png`,
    ],
    uploadDate: `${project.year}-01-01T00:00:00+03:00`,
    contentUrl: project.caseStudy.heroVideo,
    embedUrl,
    duration: durationIso,
    author: {
      '@id': `${siteConfig.siteUrl}/#person`,
    },
    publisher: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}
