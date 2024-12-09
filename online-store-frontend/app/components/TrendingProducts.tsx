import React from "react";
import { Product, useProductContext } from "../providers/ProductProvider";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { setProduct } = useProductContext();

  const onClick = () => {
    router.push(`/product/${product._id}`, undefined, { shallow: true });
    setProduct(product._id);
  };
  return (
    <li
      key={product._id}
      className="inline-flex w-64 flex-col text-center lg:w-auto"
    >
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
          <img
            alt={product.name}
            src={product.images[0]}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-6">
          <h3 className="mt-1 font-semibold text-gray-900">
            <button onClick={onClick}>
              <span className="absolute inset-0" />
              {product.name}
            </button>
          </h3>
          <p className="mt-1 text-gray-900">{product.price}</p>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
