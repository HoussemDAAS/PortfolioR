import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Costumize your content')
    .items([
      S.documentTypeListItem('hero').title('Hero').icon(() => '🦸‍♂️'),
      S.documentTypeListItem('logo').title('Componey they have trust in you ').icon(() => '🖼️'),
      S.documentTypeListItem('intro').title('Intro').icon(() => '📝'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['hero', 'logo', 'intro'].includes(item.getId()!),
      ),
    ])
