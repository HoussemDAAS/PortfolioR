// structure.ts
import type {StructureResolver} from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Customize your content')
    .items([
      S.documentTypeListItem('hero').title('Hero').icon(() => '🦸‍♂️'),
      S.documentTypeListItem('logo').title('Companies that trust you').icon(() => '🖼️'),
      S.documentTypeListItem('intro').title('Intro').icon(() => '📝'),
      orderableDocumentListDeskItem({
        type: 'product',
        title: 'Projects', // Keep your custom title
        S,
        context,
        icon: () => '📦', // Keep your icon
      }),
      S.documentTypeListItem('tape').title('Tape').icon(() => '📼'),
      S.documentTypeListItem('feature').title('Feature').icon(() => '🔥'),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(() => '💬'),
      S.documentTypeListItem('contact').title('Contacts').icon(() => '📞'),
       // New entry
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['hero', 'logo', 'intro', 'product', 'tape', 'feature', 'testimonial', 'contact'].includes(item.getId()!),
      ),
    ])