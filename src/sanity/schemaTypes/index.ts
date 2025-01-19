import { type SchemaTypeDefinition } from 'sanity'

import {heroType} from './heroType'
import {logoTickerType} from './logoTickerType'
import {introType} from './IntroType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType,logoTickerType,introType],
}
