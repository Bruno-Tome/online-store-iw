"use client";

import { useProductContext } from "@/app/providers/ProductProvider";
import { useState } from "react";

interface ProductModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

function EditProductModal({ showModal, setShowModal }: ProductModalProps) {
  const { state: productState, editProduct } = useProductContext();
  const product = productState.selectedProduct;
  //   const [showModal, setShowModal] = useState(false);
  const [updatedProductData, setProductData] = useState({
    name: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    description: "",

    height: 0,
    width: 0,
    weight: 0,
    lenght: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...updatedProductData, [name]: value });
  };

  const handleEditProduct = () => {
    if (
      !updatedProductData.name ||
      !updatedProductData.price ||
      !updatedProductData.stock
    ) {
      alert("Please fill in all required fields (name, price, and stock).");
      return;
    }

    const updatedProduct = {
      ...product,
      name: updatedProductData.name,
      price: updatedProductData.price,
      stock: updatedProductData.stock,
      images: [...product.images, `${updatedProductData.imageUrl}`],

      dimensions: {
        width: updatedProductData.width,
        height: updatedProductData.height,
        weight: updatedProductData.weight,
        lenght: updatedProductData.lenght,
      },
    };

    // Dispatch action to add the product
    editProduct(updatedProduct);

    setShowModal(false); // Close modal
    setProductData({
      name: "",
      price: 0,
      stock: 0,
      imageUrl: "",
      description: "",

      height: 0,
      width: 0,
      weight: 0,
      lenght: 0,
    }); // Reset form
  };
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={updatedProductData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={updatedProductData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={updatedProductData.stock}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={updatedProductData.imageUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={updatedProductData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Height
              </label>
              <input
                type="number"
                name="height"
                value={updatedProductData.height}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Width
              </label>
              <input
                type="number"
                name="width"
                value={updatedProductData.width}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Weight
              </label>
              <input
                type="number"
                name="weight"
                value={updatedProductData.weight}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Lenght
              </label>
              <input
                type="number"
                name="lenght"
                value={updatedProductData.lenght}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </form>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
              onClick={handleEditProduct}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    )
  );
}
export default EditProductModal;
