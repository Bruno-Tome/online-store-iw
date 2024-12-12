"use client";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useCartContext } from "../providers/CartProvider";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function CartPage() {
  const {
    state: cartState,
    removeProductFromCart,
    quoteProducts,
    setQuote,
  } = useCartContext();
  const [hasLoaded, setHasLoaded] = useState(false);
  useMemo(() => {
    if (!hasLoaded) {
      quoteProducts();
      setHasLoaded(true);
    }
  }, [cartState.items]);
  useMemo(() => {
    if (hasLoaded) {
      quoteProducts();
    }
  }, [cartState.items]);
  const quote = cartState.quote;
  console.log("quotations", cartState.quotations);
  console.log("quote", cartState.quote);
  const subtotal = cartState.items.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {cartState.items.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.data.images[0]}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              shallow
                              href={"product/" + product.data._id}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </Link>
                          </h3>
                        </div>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            onClick={() => removeProductFromCart(product.id)}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.data.stock ? (
                        <CheckIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                        />
                      ) : (
                        <ClockIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 text-gray-300"
                        />
                      )}

                      <span>
                        {product.data.stock ? "In stock" : `out of stock `}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">{subtotal}</dd>
            </div>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h3
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Select a Shipping Option
            </h3>
            <dl className="mt-6 space-y-4">
              {cartState.quotations?.map((quoteItem, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-2 border-b pb-4"
                  style={
                    quoteItem.id === quote.id
                      ? {
                          // borderColor: "#2563EB",
                          // borderWidth: "2px",
                          // borderStyle: "solid",
                          backgroundColor: "#f3f4f6",
                        }
                      : undefined
                  }
                  onClick={() => setQuote(quoteItem)}
                >
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Service</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {quoteItem.name}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Price</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {quoteItem.currency} {quoteItem.price}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Discount</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {quoteItem.currency} {quoteItem.discount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Delivery Time</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {quoteItem.delivery_time} days
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Company</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {quoteItem.company.name}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {subtotal + Number(quote.price)}
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <Link
                shallow
                href="/checkout"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
