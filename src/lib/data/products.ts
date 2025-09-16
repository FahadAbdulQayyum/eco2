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
    category: "shoes",
    colors: ["white", "blue"],
    sizes: ["EU 40", "EU 41", "EU 42"],
    brand: "Nike",
    dressStyle: "lifestyle",
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
    category: "shoes",
    colors: ["green", "black"],
    sizes: ["EU 41", "EU 42", "EU 43"],
    brand: "Adidas",
    dressStyle: "performance",
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
    category: "shoes",
    colors: ["white", "red"],
    sizes: ["EU 39", "EU 40", "EU 41"],
    brand: "Converse",
    dressStyle: "lifestyle",
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
    category: "shoes",
    colors: ["black", "brown"],
    sizes: ["EU 42", "EU 43"],
    brand: "Clarks",
    dressStyle: "formal",
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
    category: "shoes",
    colors: ["white", "grey"],
    sizes: ["EU 40", "EU 41"],
    brand: "Puma",
    dressStyle: "lifestyle",
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
    category: "shoes",
    colors: ["blue", "orange"],
    sizes: ["EU 41", "EU 42", "EU 43", "EU 44"],
    brand: "New Balance",
    dressStyle: "performance",
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
    category: "shoes",
    colors: ["black"],
    sizes: ["EU 40", "EU 41"],
    brand: "Vans",
    dressStyle: "lifestyle",
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
    category: "shoes",
    colors: ["black", "tan"],
    sizes: ["EU 42", "EU 43", "EU 44"],
    brand: "Reebok",
    dressStyle: "formal",
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
    category: "shoes",
    colors: ["brown", "green"],
    sizes: ["EU 42", "EU 43", "EU 44"],
    brand: "Merrell",
    dressStyle: "outdoor",
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
    category: "shoes",
    colors: ["white", "blue"],
    sizes: ["EU 40", "EU 41", "EU 42"],
    brand: "Asics",
    dressStyle: "performance",
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
    category: "shoes",
    colors: ["black", "white"],
    sizes: ["EU 39", "EU 40"],
    brand: "Nike",
    dressStyle: "lifestyle",
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
    category: "shoes",
    colors: ["grey", "pink"],
    sizes: ["EU 41", "EU 42", "EU 43"],
    brand: "Adidas",
    dressStyle: "performance",
  },
];

export const dressStyleData: Product[] = [  // Repurposed for "clothes" category
  {
    id: 16,  // Updated ID to avoid conflicts
    title: "Casual T-Shirt",
    // srcUrl: "/imgs/pic12.png",  // Using existing image
    srcUrl: "/images/pic12.png",  // Using existing image
    // gallery: ["/imgs/pic12.png", "/imgs/pic10.png", "/imgs/pic11.png"],
    gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"],
    price: 25,
    discount: {
      amount: 0,
      percentage: 10,
    },
    rating: 4.2,
    category: "clothes",
    colors: ["white", "black", "blue"],
    sizes: ["S", "M", "L", "XL"],
    brand: "Uniqlo",
    dressStyle: "lifestyle",
  },
  {
    id: 17,
    title: "Slim Fit Button-Down Shirt",
    // srcUrl: "/imgs/pic13.png",  // Using existing image
    srcUrl: "/images/pic13.png",  // Using existing image
    // gallery: ["/imgs/pic13.png", "/imgs/pic10.png"],
    gallery: ["/images/pic13.png", "/imgs/pic10.png"],
    price: 45,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    category: "clothes",
    colors: ["blue", "white"],
    sizes: ["M", "L", "XL"],
    brand: "Zara",
    dressStyle: "formal",
  },
  {
    id: 18,
    title: "Denim Jacket",
    srcUrl: "/images/pic14.png",  // Using existing image
    gallery: ["/images/pic14.png"],
    price: 60,
    discount: {
      amount: 0,
      percentage: 15,
    },
    rating: 4.0,
    category: "clothes",
    colors: ["blue", "black"],
    sizes: ["S", "M", "L"],
    brand: "Levi's",
    dressStyle: "outdoor",
  },
  {
    id: 19,
    title: "Polo Shirt",
    srcUrl: "/images/pic15.png",  // Using existing image
    gallery: ["/images/pic15.png", "/images/pic10.png"],
    price: 35,
    discount: {
      amount: 0,
      percentage: 5,
    },
    rating: 4.8,
    category: "clothes",
    colors: ["green", "red"],
    sizes: ["M", "L", "XL", "XXL"],
    brand: "Ralph Lauren",
    dressStyle: "performance",
  },
];

export const watchesData: Product[] = [  // New array for "watches" category
  {
    id: 20,
    title: "Classic Analog Wristwatch",
    // srcUrl: "/imgs/pic1.png",  // Using existing image
    srcUrl: "/images/watch-style-1.jpg",  // Using existing image
    // gallery: ["/imgs/pic1.png", "/imgs/pic10.png"],
    gallery: ["/images/watch-style-1.jpg", "/images/watch-style-2.jpg"],
    price: 150,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.6,
    category: "watches",
    colors: ["black", "silver"],
    sizes: ["40mm", "42mm"],  // Strap/case sizes
    brand: "Casio",
    dressStyle: "lifestyle",
  },
  {
    id: 21,
    title: "Luxury Steel Dive Watch",
    srcUrl: "/images/watch-style-2.jpg",  // Using existing image
    gallery: ["/images/watch-style-3.jpg", "/images/watch-style-4.jpg"],
    price: 300,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.9,
    category: "watches",
    colors: ["blue", "gold"],
    sizes: ["44mm"],
    brand: "Seiko",
    dressStyle: "outdoor",
  },
  {
    id: 22,
    title: "Smart Fitness Watch",
    srcUrl: "/images/watch-style-3.jpg",  // Using existing image
    gallery: ["/images/watch-style-2.jpg"],
    price: 200,
    discount: {
      amount: 0,
      percentage: 10,
    },
    rating: 4.3,
    category: "watches",
    colors: ["black", "white"],
    sizes: ["38mm", "40mm"],
    brand: "Fitbit",
    dressStyle: "performance",
  },
  {
    id: 23,
    title: "Vintage Leather Band Watch",
    srcUrl: "/images/watch-style-4.jpg",  // Using existing image
    gallery: ["/images/watch-style-3.jpg", "/images/watch-style-2.jpg"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.7,
    category: "watches",
    colors: ["brown", "black"],
    sizes: ["42mm"],
    brand: "Timex",
    dressStyle: "formal",
  },
];

export const defaultReviewsData: Review[] = [
  {
    id: 1,
    user: "Tahir Al Balushi.",
    content:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered TAHIRZAI.CO. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Abdullah Al Tahir.",
    content: `"I'm blown away by the quality and comfort of the shoes I received from TAHIRZAI.CO. From lifestyle to performance pairs, every purchase has exceeded my expectations."`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Khalil Al Balushi.",
    content: `"These sneakers are a must-have for anyone who appreciates good design. The minimal yet stylish silhouette caught my eye, and the fit is perfect."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Wajo Qatari.",
    content: `"As a UI/UX enthusiast, I value simplicity and functionality. These shoes represent those principles and feel great to wear. The attention to detail is outstanding."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "John Philiiphines.",
    content: `"These shoes are a fusion of comfort and creativity. The cushioning is plush, and the design speaks volumes about the brand's craft. It's like wearing a piece of art."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Tamim D.",
    content: `"I absolutely love these shoes! The design is unique and they feel so comfortable. As a designer, I appreciate the attention to detail. They've become my daily go-to."`,
    rating: 5,
    date: "August 19, 2023",
  },
];






// import { Product } from "@/types/product.types";
// import { Review } from "@/types/review.types";

// export const newArrivalsData: Product[] = [
//   {
//     id: 1,
//     title: "Air Runner Sneakers",
//     srcUrl: "/imgs/pic1.png",
//     gallery: ["/imgs/pic1.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 120,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     title: "Trail Grip Running Shoes",
//     srcUrl: "/imgs/pic2.png",
//     gallery: ["/imgs/pic2.png"],
//     price: 260,
//     discount: {
//       amount: 0,
//       percentage: 20,
//     },
//     rating: 3.5,
//   },
//   {
//     id: 3,
//     title: "Classic Canvas Sneakers",
//     srcUrl: "/imgs/pic3.png",
//     gallery: ["/imgs/pic3.png"],
//     price: 180,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 4.5,
//   },
//   {
//     id: 4,
//     title: "Leather Derby Formal Shoes",
//     srcUrl: "/imgs/pic4.png",
//     gallery: ["/imgs/pic4.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 160,
//     discount: {
//       amount: 0,
//       percentage: 30,
//     },
//     rating: 4.5,
//   },
// ];

// export const topSellingData: Product[] = [
//   {
//     id: 5,
//     title: "Retro Court Sneakers",
//     srcUrl: "/imgs/pic5.png",
//     gallery: ["/imgs/pic5.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 232,
//     discount: {
//       amount: 0,
//       percentage: 20,
//     },
//     rating: 5.0,
//   },
//   {
//     id: 6,
//     title: "Lightweight Jogging Shoes",
//     srcUrl: "/imgs/pic6.png",
//     gallery: ["/imgs/pic6.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 145,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 4.0,
//   },
//   {
//     id: 7,
//     title: "Everyday Slip-On Sneakers",
//     srcUrl: "/imgs/pic7.png",
//     gallery: ["/imgs/pic7.png"],
//     price: 80,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 3.0,
//   },
//   {
//     id: 8,
//     title: "Premium Leather Oxfords",
//     srcUrl: "/imgs/pic8.png",
//     gallery: ["/imgs/pic8.png"],
//     price: 210,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 4.5,
//   },
// ];

// export const relatedProductData: Product[] = [
//   {
//     id: 12,
//     title: "All-Terrain Hiking Boots",
//     srcUrl: "/imgs/pic12.png",
//     gallery: ["/imgs/pic12.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 242,
//     discount: {
//       amount: 0,
//       percentage: 20,
//     },
//     rating: 4.0,
//   },
//   {
//     id: 13,
//     title: "Breathable Mesh Trainers",
//     srcUrl: "/imgs/pic13.png",
//     gallery: ["/imgs/pic13.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 145,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 3.5,
//   },
//   {
//     id: 14,
//     title: "Minimalist Street Sneakers",
//     srcUrl: "/imgs/pic14.png",
//     gallery: ["/imgs/pic14.png"],
//     price: 180,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 4.5,
//   },
//   {
//     id: 15,
//     title: "Comfort Foam Running Shoes",
//     srcUrl: "/imgs/pic15.png",
//     gallery: ["/imgs/pic15.png"],
//     price: 150,
//     discount: {
//       amount: 0,
//       percentage: 30,
//     },
//     rating: 5.0,
//   },
// ];

// export const dressStyleData: Product[] = [
//   {
//     id: 12,
//     title: "Shirt - 00",
//     srcUrl: "/imgs/pic12.png",
//     gallery: ["/imgs/pic12.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 242,
//     discount: {
//       amount: 0,
//       percentage: 20,
//     },
//     rating: 4.0,
//   },
//   {
//     id: 13,
//     title: "Shirt - 01",
//     srcUrl: "/imgs/pic13.png",
//     gallery: ["/imgs/pic13.png", "/imgs/pic10.png", "/imgs/pic11.png"],
//     price: 145,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 3.5,
//   },
//   {
//     id: 14,
//     title: "Shirt - 02",
//     srcUrl: "/imgs/pic14.png",
//     gallery: ["/imgs/pic14.png"],
//     price: 180,
//     discount: {
//       amount: 0,
//       percentage: 0,
//     },
//     rating: 4.5,
//   },
//   {
//     id: 15,
//     title: "Shirt - 03",
//     srcUrl: "/imgs/pic15.png",
//     gallery: ["/imgs/pic15.png"],
//     price: 150,
//     discount: {
//       amount: 0,
//       percentage: 30,
//     },
//     rating: 5.0,
//   },
// ];

// export const defaultReviewsData: Review[] = [
//   {
//     id: 1,
//     user: "Tahir Al Balushi.",
//     content:
//       '"Finding clothes that align with my personal style used to be a challenge until I discovered TAHIRZAI.CO. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
//     rating: 5,
//     date: "August 14, 2023",
//   },
//   {
//     id: 2,
//     user: "Abdullah Al Tahir.",
//     content: `"I'm blown away by the quality and comfort of the shoes I received from TAHIRZAI.CO. From lifestyle to performance pairs, every purchase has exceeded my expectations."`,
//     rating: 5,
//     date: "August 15, 2023",
//   },
//   {
//     id: 3,
//     user: "Khalil Al Balushi.",
//     content: `"These sneakers are a must-have for anyone who appreciates good design. The minimal yet stylish silhouette caught my eye, and the fit is perfect."`,
//     rating: 5,
//     date: "August 16, 2023",
//   },
//   {
//     id: 4,
//     user: "Wajo Qatari.",
//     content: `"As a UI/UX enthusiast, I value simplicity and functionality. These shoes represent those principles and feel great to wear. The attention to detail is outstanding."`,
//     rating: 5,
//     date: "August 17, 2023",
//   },
//   {
//     id: 5,
//     user: "John Philiiphines.",
//     content: `"These shoes are a fusion of comfort and creativity. The cushioning is plush, and the design speaks volumes about the brand's craft. It's like wearing a piece of art."`,
//     rating: 5,
//     date: "August 18, 2023",
//   },
//   {
//     id: 6,
//     user: "Tamim D.",
//     content: `"I absolutely love these shoes! The design is unique and they feel so comfortable. As a designer, I appreciate the attention to detail. They've become my daily go-to."`,
//     rating: 5,
//     date: "August 19, 2023",
//   },
// ];
