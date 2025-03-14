// structure.ts
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Customize your content')
    .items([
      S.documentTypeListItem('hero').title('Hero').icon(() => '🦸‍♂️'),
      S.documentTypeListItem('logo').title('Companies that trust you').icon(() => '🖼️'),
      S.documentTypeListItem('intro').title('Intro').icon(() => '📝'),
      S.documentTypeListItem('product').title('Projects').icon(() => '📦'),
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