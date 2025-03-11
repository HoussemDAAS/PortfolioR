import { defineField, defineType } from 'sanity';

export const introType = defineType({
  name: 'intro',
  title: 'Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
  ],
});