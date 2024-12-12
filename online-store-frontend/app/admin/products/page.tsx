"use client";
import { useEffect, useState } from "react";
import AdminNavbar from "@/app/components/AdminNavbar";
import isAdmin from "@/app/providers/isAdmin";
import { Product, useProductContext } from "@/app/providers/ProductProvider";
import ProductModal from "./ProductModal";
import EditProductModal from "./EditProductModal";

function ProductManagement() {
  const {
    state: { products },
    fetchProducts,
    setProduct,
    deleteProduct, // Supondo que a função de dispatch seja fornecida pelo contexto
  } = useProductContext();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleRemoveProduct = async (productId: string) => {
    // Função para remover o produto
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (confirmDelete) {
      // Supondo que a ação de remover o produto seja implementada no dispatch
      await deleteProduct(productId);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <AdminNavbar />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Product Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all products in your store, including their name, price,
            stock, category, image, and description.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setShowAddModal(true)}
          >
            Add Product
          </button>
        </div>
      </div>

      <ProductModal showModal={showAddModal} setShowModal={setShowAddModal} />
      <EditProductModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      {/* Product Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Product ID
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Amount Bought
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Image
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product._id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.orderCount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 object-cover"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.description}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          setShowEditModal(true);
                          // Supondo que a função de dispatch seja fornecida pelo contexto
                          setProduct(product._id as string);
                        }}
                      >
                        Edit<span className="sr-only">, {product.name}</span>
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() =>
                          handleRemoveProduct(product._id as string)
                        }
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove<span className="sr-only">, {product.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default isAdmin(ProductManagement);
