import { FilterState } from "@/lib/features/shop/shopSlice";

export interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: {
    amount: number;
    percentage: number;
  };
  rating: number;
  category?: string;
  colors?: string[];
  sizes?: string[];
  dressStyle?: string;
}

export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category && product.category !== filters.category) {
      return false;
    }

    // Colors filter
    if (filters.colors.length > 0 && product.colors) {
      const hasMatchingColor = filters.colors.some(color => 
        product.colors!.includes(color)
      );
      if (!hasMatchingColor) return false;
    }

    // Price range filter
    const productPrice = product.price;
    if (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) {
      return false;
    }

    // Sizes filter
    if (filters.sizes.length > 0 && product.sizes) {
      const hasMatchingSize = filters.sizes.some(size => 
        product.sizes!.includes(size)
      );
      if (!hasMatchingSize) return false;
    }

    // Dress style filter
    if (filters.dressStyle && product.dressStyle && product.dressStyle !== filters.dressStyle) {
      return false;
    }

    return true;
  });
};

// Helper function to get unique values for filter options
export const getUniqueValues = (products: Product[], key: keyof Product): string[] => {
  const values = products
    .map(product => product[key])
    .filter((value): value is string => typeof value === 'string');
  return Array.from(new Set(values));
};
