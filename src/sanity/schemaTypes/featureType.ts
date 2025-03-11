import { defineField, defineType } from 'sanity';

export const featureType = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text1',
      title: 'Text1',
      type: 'string',
    }),
    defineField({
        name: 'text2',
        title: 'Text2',
        type: 'string',
      }),
      defineField({
        name: 'text3',
        title: 'Text3',
        type: 'string',
      }),
  ],
});