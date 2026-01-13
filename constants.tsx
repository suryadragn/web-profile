
import { Project, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Redesign',
    category: 'UI/UX Design',
    description: 'A modern overhaul of a digital storefront focusing on conversion and accessibility.',
    imageUrl: 'https://picsum.photos/seed/proj1/800/600',
    tags: ['React', 'Tailwind', 'Framer']
  },
  {
    id: '2',
    title: 'Brand Identity',
    category: 'Branding',
    description: 'Minimalist visual identity for a sustainable tech startup based in Berlin.',
    imageUrl: 'https://picsum.photos/seed/proj2/800/600',
    tags: ['Graphic Design', 'Logo', 'Strategy']
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    category: 'Product Design',
    description: 'Comprehensive design system for a fintech solution with complex data visualization.',
    imageUrl: 'https://picsum.photos/seed/proj3/800/600',
    tags: ['UX Research', 'Prototyping', 'Figma']
  }
];
