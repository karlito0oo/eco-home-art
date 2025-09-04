import { Outlet, Link, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/products", label: "Products" },
    { path: "/admin/featured-products", label: "Featured Products" },
    { path: "/admin/categories", label: "Categories" },
    { path: "/admin/articles", label: "Articles" },
    { path: "/admin/testimonials", label: "Testimonials" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded transition-colors ${
                    location.pathname === item.path
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
