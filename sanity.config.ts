import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

// Hardcoded values for testing
const projectId = '1qcydod7'; // Double-check this matches exactly what's in Sanity dashboard
const dataset = 'production';
const apiVersion = '2025-01-18';

// Validate project ID format
if (!/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(`Invalid Sanity projectId: ${projectId}`);
}

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Your Studio Name',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});