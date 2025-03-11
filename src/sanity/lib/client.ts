// src/sanity/client.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '1qcydod7' as any, // Force override type checking
  dataset: 'production',
  apiVersion: '2025-01-18',
  useCdn: false,
});