import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './src/sanity/env';

// Verify projectId format
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