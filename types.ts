
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SiteConfig {
  hero: {
    status: string;
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
  };
  projects: Project[];
}
