"use client";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import { newArrivalsData, relatedProductData, topSellingData } from "../page";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { setFilteredProducts } from "@/lib/features/shop/shopSlice";
import { filterProducts } from "@/lib/utils/filterProducts";
import { useEffect, useMemo } from "react";

export default function ShopPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.shop.filters);
  const filteredProducts = useAppSelector((state) => state.shop.filteredProducts);
  const isFiltered = useAppSelector((state) => state.shop.isFiltered);

  // Combine all product data
  const allProducts = useMemo(() => [
    ...relatedProductData.slice(1, 4),
    ...newArrivalsData.slice(1, 4),
    ...topSellingData.slice(1, 4),
  ], []);

  // Apply filters whenever filters change
  useEffect(() => {
    const hasActiveFilters = Object.values(filters).some(value => 
      Array.isArray(value) ? value.length > 0 : value !== null
    );

    if (hasActiveFilters) {
      // Add mock category, colors, and sizes adapted for shoes
      const productsWithAttributes = allProducts.map((product, index) => ({
        ...product,
        category: index < 4 ? "sneakers" : index < 8 ? "running" : "formal",
        colors: index % 2 === 0 ? ["white", "black"] : ["blue", "red"],
        sizes: index % 3 === 0 ? ["EU 40", "EU 41"] : ["EU 42", "EU 43"],
        dressStyle: index < 6 ? "lifestyle" : "performance",
      }));

      const filtered = filterProducts(productsWithAttributes, filters);
      dispatch(setFilteredProducts(filtered));
    } else {
      dispatch(setFilteredProducts([]));
    }
  }, [filters, allProducts, dispatch]);

  // Use filtered products if available, otherwise use all products
  const displayProducts = isFiltered && filteredProducts.length > 0 
    ? filteredProducts 
    : allProducts;

  const productCount = displayProducts.length;

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">Shoes</h1>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing 1-{productCount} of {productCount} Products
                  {isFiltered && filteredProducts.length > 0 && (
                    <span className="text-blue-600 font-medium"> (Filtered)</span>
                  )}
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            {displayProducts.length > 0 ? (
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or clearing some selections.</p>
              </div>
            )}

            {/* Pagination - only show if there are products */}
            {displayProducts.length > 0 && (
              <>
                <hr className="border-t-black/10" />
                <Pagination className="justify-between">
                  <PaginationPrevious href="#" className="border border-black/10" />
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        className="text-black/50 font-medium text-sm"
                        isActive
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        className="text-black/50 font-medium text-sm"
                      >
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="hidden lg:block">
                      <PaginationLink
                        href="#"
                        className="text-black/50 font-medium text-sm"
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                    </PaginationItem>
                    <PaginationItem className="hidden lg:block">
                      <PaginationLink
                        href="#"
                        className="text-black/50 font-medium text-sm"
                      >
                        8
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="hidden sm:block">
                      <PaginationLink
                        href="#"
                        className="text-black/50 font-medium text-sm"
                      >
                        9
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        className="text-black/50 font-medium text-sm"
                      >
                        10
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                  <PaginationNext href="#" className="border border-black/10" />
                </Pagination>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
