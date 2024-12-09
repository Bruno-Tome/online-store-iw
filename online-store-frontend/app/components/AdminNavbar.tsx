import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="bg-white">
      <div className="mx-auto ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-black font-bold text-lg">Admin Dashboard</h1>
            </div>
            <div className="ml-10 flex space-x-4">
              <Link href="/admin/order">
                <p className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Orders
                </p>
              </Link>
              <Link href="/admin/product">
                <p className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </p>
              </Link>
              <Link href="/admin/user">
                <p className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Users
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
