export interface Metric {
  label: string;
  value: string;
  context: string;
}

export interface KeyMoment {
  timestamp: string;
  title: string;
  desc: string;
}

export interface GraphicFrame {
  title: string;
  desc: string;
  image: string;
  tag?: string;
}

export interface CaseStudy {
  heroVideo: string;
  heroPoster: string;
  projectOverview: {
    summary: string;
    scope: string;
    duration: string;
    role: string;
    toolsUsed: string[];
    timeline: string;
  };
  challenge: {
    problem: string;
    retentionObstacle: string;
    targetAudience: string;
  };
  theEdit: {
    strategy: string;
    cutPacing: string;
    audioEngineering: string;
    keyMoments: KeyMoment[];
  };
  beforeAfter: {
    rawImage: string;
    rawLabel: string;
    finalImage: string;
    finalLabel: string;
    description: string;
  };
  motionAndDesign: {
    breakdown: string;
    techniques: string[];
    graphicFrames: GraphicFrame[];
  };
  finalResult: {
    videoUrl: string;
    posterUrl: string;
    metrics: Metric[];
    deliverableDetails: string;
  };
  nextProjectSlug: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  category: string;
  editingType: string[];
  year: string;
  oneLiner: string;
  aspectRatio: '16:9' | '9:16' | '2.39:1';
  heroVideo: string;
  previewVideo: string;
  posterImage: string;
  featured: boolean;
  accentColor?: string;
  caseStudy: CaseStudy;
}
