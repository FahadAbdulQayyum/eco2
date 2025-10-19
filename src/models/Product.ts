import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  srcUrl: string;
  gallery: string[];
  price: number;
  discount: {
    amount: number;
    percentage: number;
  };
  rating: number;
  category: 'shoes' | 'clothes' | 'watches';
  colors: string[];
  sizes: string[];
  brand: string;
  dressStyle: 'lifestyle' | 'performance' | 'outdoor' | 'formal';
  description?: string;
  inStock: boolean;
  featured: boolean;
  cloudinaryPublicIds: string[]; // Store Cloudinary public IDs for deletion
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title must be less than 100 characters'],
  },
  srcUrl: {
    type: String,
    required: [true, 'Main image URL is required'],
  },
  gallery: [{
    type: String,
  }],
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive'],
    max: [10000, 'Price must be less than $10,000'],
  },
  discount: {
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Discount amount must be positive'],
    },
    percentage: {
      type: Number,
      default: 0,
      min: [0, 'Discount percentage must be positive'],
      max: [100, 'Discount percentage cannot exceed 100%'],
    },
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating must be at most 5'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['shoes', 'clothes', 'watches'],
      message: 'Category must be shoes, clothes, or watches',
    },
  },
  colors: [{
    type: String,
    required: true,
  }],
  sizes: [{
    type: String,
    required: true,
  }],
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    maxlength: [50, 'Brand must be less than 50 characters'],
  },
  dressStyle: {
    type: String,
    required: [true, 'Dress style is required'],
    enum: {
      values: ['lifestyle', 'performance', 'outdoor', 'formal'],
      message: 'Dress style must be lifestyle, performance, outdoor, or formal',
    },
  },
  description: {
    type: String,
    maxlength: [500, 'Description must be less than 500 characters'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  cloudinaryPublicIds: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Create indexes for better performance
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ createdAt: -1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
