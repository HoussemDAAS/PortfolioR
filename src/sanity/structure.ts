import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Costumize your content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('hero').title('Hero').icon(() => '🦸‍♂️'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'hero'].includes(item.getId()!),
      ),
    ])
