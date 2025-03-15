import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Good for disabling CDN
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
  perspective: 'published', // Add this for content visibility
  stega: {
    studioUrl: '/studio' // Only needed if using Visual Editing
  }
});