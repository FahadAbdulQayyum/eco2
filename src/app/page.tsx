import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "Air Runner Sneakers",
    srcUrl: "/imgs/pic1.png",
    gallery: ["/imgs/pic1.png", "/imgs/pic10.png", "/imgs/pic11.png"],
    price: 120,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 2,
    title: "Trail Grip Running Shoes",
    srcUrl: "/imgs/pic2.png",
    gallery: ["/imgs/pic2.png"],
    price: 260,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
  },
  {
      id: 3,
    title: "Classic Canvas Sneakers",
    srcUrl: "/imgs/pic3.png",
    gallery: ["/imgs/pic3.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 4,
    title: "Leather Derby Formal Shoes",
    srcUrl: "/imgs/pic4.png",
    gallery: ["/imgs/pic4.png", "/imgs/pic10.png", "/imgs/pic11.png"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "Retro Court Sneakers",
    srcUrl: "/imgs/pic5.png",
    gallery: ["/imgs/pic5.png", "/imgs/pic10.png", "/imgs/pic11.png"],
    price: 232,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
  },
  {
    id: 6,
    title: "Lightweight Jogging Shoes",
    srcUrl: "/imgs/pic6.png",
    gallery: ["/imgs/pic6.png", "/imgs/pic10.png", "/imgs/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
  },
  {
    id: 7,
    title: "Everyday Slip-On Sneakers",
    srcUrl: "/imgs/pic7.png",
    gallery: ["/imgs/pic7.png"],
    price: 80,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.0,
  },
  {
    id: 8,
    title: "Premium Leather Oxfords",
    srcUrl: "/imgs/pic8.png",
    gallery: ["/imgs/pic8.png"],
    price: 210,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "All-Terrain Hiking Boots",
    srcUrl: "/imgs/pic12.png",
    gallery: ["/imgs/pic12.png", "/imgs/pic10.png", "/imgs/pic11.png"],
    price: 242,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.0,
  },
  {
    id: 13,
    title: "Breathable Mesh Trainers",
    srcUrl: "/imgs/pic13.png",
    gallery: ["/imgs/pic13.png", "/imgs/pic10.png", "/imgs/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.5,
  },
  {
    id: 14,
    title: "Minimalist Street Sneakers",
    srcUrl: "/imgs/pic14.png",
    gallery: ["/imgs/pic14.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 15,
    title: "Comfort Foam Running Shoes",
    srcUrl: "/imgs/pic15.png",
    gallery: ["/imgs/pic15.png"],
    price: 150,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 5.0,
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered TAHIRZAI.CO. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and comfort of the shoes I received from TAHIRZAI.CO. From lifestyle to performance pairs, every purchase has exceeded my expectations.”`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"These sneakers are a must-have for anyone who appreciates good design. The minimal yet stylish silhouette caught my eye, and the fit is perfect."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a UI/UX enthusiast, I value simplicity and functionality. These shoes represent those principles and feel great to wear. The attention to detail is outstanding."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"These shoes are a fusion of comfort and creativity. The cushioning is plush, and the design speaks volumes about the brand's craft. It's like wearing a piece of art."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love these shoes! The design is unique and they feel so comfortable. As a designer, I appreciate the attention to detail. They've become my daily go-to."`,
    rating: 5,
    date: "August 19, 2023",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW SHOE ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling shoes"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
