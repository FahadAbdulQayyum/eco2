import { z } from 'zod';

export const productFormSchema = z.object({
  // Basic Information
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  price: z.number().min(0, 'Price must be positive').max(10000, 'Price must be less than $10,000'),
  
  // Category and Brand
  category: z.enum(['shoes', 'clothes', 'watches']),
  brand: z.string().min(1, 'Brand is required').max(50, 'Brand must be less than 50 characters'),
  dressStyle: z.enum(['lifestyle', 'performance', 'outdoor', 'formal']),
  
  // Rating
  rating: z.number().min(0, 'Rating must be at least 0').max(5, 'Rating must be at most 5').step(0.1),
  
  // Discount
  discountAmount: z.number().min(0, 'Discount amount must be positive').max(1000, 'Discount amount too high'),
  discountPercentage: z.number().min(0, 'Discount percentage must be positive').max(100, 'Discount percentage cannot exceed 100%'),
  
  // Colors and Sizes
  colors: z.array(z.string()).min(1, 'At least one color is required'),
  sizes: z.array(z.string()).min(1, 'At least one size is required'),
  
  // Images
  mainImage: z.any().optional(), // File object or string URL
  galleryImages: z.array(z.any()).optional(), // Array of File objects or string URLs
  
  // Optional fields
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

// Validation helpers
export const validateProductForm = (data: any) => {
  try {
    return { success: true, data: productFormSchema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return { success: false, errors: [{ field: 'general', message: 'Validation failed' }] };
  }
};

// Default values for the form
export const defaultProductFormValues: Partial<ProductFormData> = {
  title: '',
  price: 0,
  category: 'shoes',
  brand: '',
  dressStyle: 'lifestyle',
  rating: 0,
  discountAmount: 0,
  discountPercentage: 0,
  colors: [],
  sizes: [],
  description: '',
  inStock: true,
  featured: false,
};
