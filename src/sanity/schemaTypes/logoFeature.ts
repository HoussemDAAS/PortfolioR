import { defineField, defineType } from 'sanity';

export const logoFeatureType = defineType({
  name: 'logoFeature',
  title: 'LogoFeature',
  type: 'document',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rotate',
      title: 'Rotate',
      type: 'number',
    }),
  ],
});