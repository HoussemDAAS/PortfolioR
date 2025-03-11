import { type SchemaTypeDefinition } from 'sanity'

import {heroType} from './heroType'
import {logoTickerType} from './logoTickerType'
import {introType} from './IntroType';
import { productType } from './productType';
import { tapeType } from './tapeType';
import { featureType } from './featureType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType,logoTickerType,introType,productType,tapeType,featureType],
}
