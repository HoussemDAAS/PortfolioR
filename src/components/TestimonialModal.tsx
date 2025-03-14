// components/TestimonialModal.tsx
"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

interface TestimonialFormData {
  _type: 'testimonial';
  name: string;
  position: string;
  text: string;
  avatar?: {
    _type: 'image';
    asset: SanityImageAsset;
    alt?: string;
  };
}

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testimonial: TestimonialFormData) => void;
}

const TestimonialModal = ({ isOpen, onClose, onSubmit }: TestimonialModalProps) => {
  const [formData, setFormData] = useState<Omit<TestimonialFormData, '_type'>>({
    name: '',
    position: '',
    text: '',
    avatar: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const testimonialData: TestimonialFormData = {
      _type: 'testimonial',
      name: formData.name,
      position: formData.position,
      text: formData.text,
      ...(formData.avatar && {
        avatar: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: formData.avatar.asset._ref
          },
          alt: formData.avatar.alt
        }
      })
    };

    onSubmit(testimonialData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Overlay replacement to fix type issues */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 className="text-2xl font-bold mb-6">Add New Testimonial</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Position & Company</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Testimonial Text</label>
                <textarea
                  required
                  className="w-full p-2 border rounded-lg h-32"
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                />
              </div>

              <div className="flex gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default TestimonialModal;