"use client";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useOrderContext } from "../providers/OrdersProvider";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

export default function OrderConfirmation() {
  const { state: orderState } = useOrderContext();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">Thank you!</h1>
          <p className="mt-2 text-4xl text-gray-900 tracking-tight">
            It's on the way!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your order {orderState.selectedOrder?._id} has shipped and will be
            with you soon.
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="mt-2 text-indigo-600">
              {orderState.selectedOrder?._id}
            </dd>
          </dl>
        </div>

        <section
          aria-labelledby="order-heading"
          className="mt-10 border-t border-gray-200"
        >
          <h2 id="order-heading" className="sr-only">
            Your order
          </h2>

          <h3 className="sr-only">Items</h3>
          {orderState.selectedOrder?.items.map((product) => (
            <div
              key={product.productId}
              className="flex space-x-6 border-b border-gray-200 py-10"
            >
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Product ID: {product.productId}
                  </h4>
                  {/* <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p> */}
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
          <div className="max-w-xl">
            <h3 className="sr-only">Order Summary</h3>
            <dl className="space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Order Date</dt>
                <dd className="text-gray-900">
                  {new Date(
                    orderState.selectedOrder?.createdAt ?? new Date(),
                  ).toLocaleDateString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Total Amount</dt>
                <dd className="text-gray-900">
                  {orderState.selectedOrder?.total}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
