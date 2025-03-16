import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true, // Hide from content editors
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Video Thumbnail',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'imageThumbnail',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
  ],
});