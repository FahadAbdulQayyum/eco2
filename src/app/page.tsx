"use client";
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import ShoesStyle from "@/components/homepage/ShoesStyle";
import WatchStyle from "@/components/homepage/WatchStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Review } from "@/types/review.types";
import { useState, useEffect } from "react";
import { newArrivalsData, topSellingData, defaultReviewsData, dressStyleData, watchesData } from "@/lib/data/products";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviewsData);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Keep default reviews if API fails
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="TOP SELLING"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ShoesStyle />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <WatchStyle />
        </div>
        <Reviews data={reviews} />
      </main>
    </>
  );
}
