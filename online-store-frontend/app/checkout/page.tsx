"use client";

import Link from "next/link";
import { useCartContext } from "../providers/CartProvider";
import { useOrderContext } from "../providers/OrdersProvider";
import { useUserContext } from "../providers/UserProvider";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  { name: "Cart", href: "#", status: "complete" },
  { name: "Billing Information", href: "#", status: "current" },
  { name: "Confirmation", href: "#", status: "upcoming" },
];
export default function CheckoutPage() {
  const { state: cartState, clearCart } = useCartContext();
  const subtotal = cartState.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const { state: userState } = useUserContext();
  const { createOrder } = useOrderContext();
  const [error, setError] = useState<boolean | Error>(false);
  const router = useRouter();
  const order = {
    items: cartState.items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    quotation: {
      id: cartState.quote.id,
      price: cartState.quote.price,
    },
    customerId: userState.user ? userState.user.id : "",
  };
  const createOrderClick = async () => {
    try {
      await createOrder(order);
      router.push("/order-confirmation", undefined, { shallow: true });
      clearCart();
    } catch (error: any) {
      setError(error);
      console.error("Error creating order", error);
    }
  };

  return (
    <div>
      {error === false ? (
        <></>
      ) : (
        <div>
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <p className="font-bold">An error ocurred</p>
            <p>There was an error creating the order. </p>
            <p>{error.response.data.message}</p>
          </div>
        </div>
      )}
      <h1 className="sr-only">Order information</h1>

      <section
        aria-labelledby="summary-heading"
        className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
      >
        <div className="mx-auto max-w-lg lg:max-w-none">
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>

          <ul
            role="list"
            className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
          >
            {cartState.items.map((product) => (
              <li key={product.id} className="flex items-start space-x-4 py-6">
                <img
                  src={product.data.images[0]}
                  alt={product.name}
                  className="h-20 w-20 flex-none rounded-md object-cover object-center"
                />
                <div className="flex-auto space-y-1">
                  <h3>{product.name}</h3>
                </div>
                <p className="flex-none text-base font-medium">
                  ${(product.quantity * product.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Product Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
          </dl>
          <dl className=" space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
            <dl className="mt-6 space-y-4">
              <div className="flex flex-col space-y-2 border-b pb-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Service</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {cartState.quote.name}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Price</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    R$ {cartState.quote.price}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Delivery Time</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {cartState.quote.delivery_time} days
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Company</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {cartState.quote.company.name}
                  </dd>
                </div>
              </div>
            </dl>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base">Total</dt>
              <dd className="text-base">
                ${(subtotal + Number(order.quotation.price)).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
        <Button
          // href="/order-confirmation"
          onClick={() => {
            createOrderClick();
          }}
          className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
        >
          Continue
        </Button>
        <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
          You won't be charged until the next step.
        </p>
      </div>
    </div>
  );
}
