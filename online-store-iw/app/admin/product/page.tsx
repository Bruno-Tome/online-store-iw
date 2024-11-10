const products = [
  {
    productId: 'P001',
    name: 'Smartphone XYZ',
    price: '$599.00',
    stock: 25,
    category: 'Electronics',
    imageUrl: 'https://example.com/images/smartphone.jpg',
    description: 'A high-quality smartphone with excellent camera and battery life.',
  },
  {
    productId: 'P002',
    name: 'Laptop ABC',
    price: '$999.00',
    stock: 10,
    category: 'Computers',
    imageUrl: 'https://example.com/images/laptop.jpg',
    description: 'A powerful laptop designed for professionals and gamers.',
  },
  {
    productId: 'P003',
    name: 'Headphones 123',
    price: '$49.99',
    stock: 100,
    category: 'Accessories',
    imageUrl: 'https://example.com/images/headphones.jpg',
    description: 'Comfortable headphones with noise cancellation and great sound quality.',
  },
];

export default function ProductManagement() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Product Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all products in your store, including their name, price, stock, category, image, and description.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Product ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Image
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.productId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.stock}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover" />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.description}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {product.name}</span>
                      </a>
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
