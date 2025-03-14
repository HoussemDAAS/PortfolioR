// types/index.ts
export interface SanityTestimonial {
    _id: string;
    _type: 'testimonial';
    _createdAt: string;
    name: string;
    position: string;
    text: string;
    avatar?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
      alt?: string;
    };
  }
  
  export type TestimonialFormData = Omit<SanityTestimonial, '_id' | '_createdAt' | '_type'>;