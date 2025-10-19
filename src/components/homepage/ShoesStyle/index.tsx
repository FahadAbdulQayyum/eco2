import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";
import { Product } from "@/lib/hooks/useProducts";

interface ShoesStyleProps {
  products?: Product[];
  loading?: boolean;
}

const DressStyle = ({ products = [], loading = false }: ShoesStyleProps) => {
  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize",
          ])}
        >
          BROWSE BY SHOES STYLE
        </motion.h2>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <span className="ml-2 text-gray-600">Loading shoes...</span>
          </div>
        ) : products.length > 0 ? (
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {products.slice(0, 4).map((product) => (
              <DressStyleCard
                key={product.id}
                title={product.title}
                url={`/shop/product/${product.id}`}
                className="h-[190px] bg-cover bg-center duration-300 hover:scale-105"
                style={{ backgroundImage: `url('${product.srcUrl}')` }}
              />
            ))}
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
            >
              <DressStyleCard
                title="Lifestyle"
                url="/shop?category=shoes&style=lifestyle"
                className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/shoes-style-1.png')] duration-300 hover:scale-105"
              />
              <DressStyleCard
                title="Performance"
                url="/shop?category=shoes&style=performance"
                className="md:max-w-[684px] h-[190px] bg-[url('/images/shoes-style-2.png')] duration-300 hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5"
            >
              <DressStyleCard
                title="Outdoor"
                url="/shop?category=shoes&style=outdoor"
                className="md:max-w-[684px] h-[190px] bg-[url('/images/shoes-style-3.png')] duration-300 hover:scale-105"
              />
              <DressStyleCard
                title="Formal"
                url="/shop?category=shoes&style=formal"
                className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/shoes-style-4.png')] duration-300 hover:scale-105"
              />
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
};

export default DressStyle;
