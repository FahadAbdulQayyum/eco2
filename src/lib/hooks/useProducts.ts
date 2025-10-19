import { useState, useEffect } from 'react';

export interface Product {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    category?: string;
    featured?: string;
    sortBy: string;
    sortOrder: string;
  };
}

export interface UseProductsOptions {
  category?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ProductsResponse['pagination'] | null>(null);
  const [filters, setFilters] = useState<ProductsResponse['filters'] | null>(null);

  const {
    category,
    featured,
    limit = 20,
    page = 1,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    enabled = true,
  } = options;

  const fetchProducts = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (featured !== undefined) params.append('featured', featured.toString());
      params.append('limit', limit.toString());
      params.append('page', page.toString());
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);

      const response = await fetch(`/api/products/frontend?${params.toString()}`);
      const data: ProductsResponse = await response.json();

      if (data.success) {
        setProducts(data.data);
        setPagination(data.pagination);
        setFilters(data.filters);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, featured, limit, page, sortBy, sortOrder, enabled]);

  return {
    products,
    loading,
    error,
    pagination,
    filters,
    refetch: fetchProducts,
  };
};

// Hook for fetching a single product
export const useProduct = (id: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (data.success) {
          // Format the product data to match frontend interface
          const formattedProduct: Product = {
            id: data.data._id.toString(),
            title: data.data.title,
            srcUrl: data.data.srcUrl,
            gallery: data.data.gallery || [],
            price: data.data.price,
            discount: data.data.discount,
            rating: data.data.rating,
            category: data.data.category,
            colors: data.data.colors,
            sizes: data.data.sizes,
            brand: data.data.brand,
            dressStyle: data.data.dressStyle,
            description: data.data.description,
            inStock: data.data.inStock,
            featured: data.data.featured,
            createdAt: data.data.createdAt,
            updatedAt: data.data.updatedAt,
          };
          setProduct(formattedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
