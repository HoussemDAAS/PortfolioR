// schemas/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import {heroType} from './heroType'
import {logoTickerType} from './logoTickerType'
import {introType} from './IntroType'
import { productType } from './productType'
import { tapeType } from './tapeType'
import { featureType } from './featureType'
import { testimonialType } from './testimonialType' // New import

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, logoTickerType, introType, productType, tapeType, featureType, testimonialType],
}