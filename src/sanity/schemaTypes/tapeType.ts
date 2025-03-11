import { defineField, defineType } from 'sanity';

export const tapeType = defineType({
  name: 'tape',
  title: 'Tape',
  type: 'document',
  fields: [
    defineField({
      name: 'word',
      title: 'Word',
      type: 'string',
    }),
  ],
});