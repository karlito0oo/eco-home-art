import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import Categories from "./Categories";
import FeaturedProducts from "./admin/FeaturedProducts";

const USER = { name: "Admin User" };

const Sidebar = () => {
  const navigate = useNavigate();
  const [productsOpen, setProductsOpen] = useState(false);
  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-gray-900 text-white flex flex-col pt-8 shadow-lg z-50">
      <div className="text-2xl font-bold px-6 mb-10">EcoHomeArt</div>
      <nav className="flex flex-col gap-2 px-4">
        <button
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition text-lg font-medium"
          onClick={() => {
            navigate("/admin");
            setProductsOpen(false);
          }}
        >
          Dashboard
        </button>
        <div>
          <button
            className="flex items-center justify-between gap-3 px-4 py-2 rounded hover:bg-gray-800 transition text-lg font-medium w-full"
            onClick={() => setProductsOpen((v) => !v)}
          >
            <span>Products</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                productsOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              productsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ marginLeft: "1.5rem" }}
          >
            <button
              className="text-left px-4 py-2 rounded hover:bg-gray-800 transition text-base font-normal w-full"
              onClick={() => {
                navigate("/admin/products");
              }}
            >
              List
            </button>
            <button
              className="text-left px-4 py-2 rounded hover:bg-gray-800 transition text-base font-normal w-full"
              onClick={() => {
                navigate("/admin/featured");
              }}
            >
              Featured products
            </button>
            <button
              className="text-left px-4 py-2 rounded hover:bg-gray-800 transition text-base font-normal w-full"
              onClick={() => {
                navigate("/admin/categories");
              }}
            >
              Categories
            </button>
          </div>
        </div>
        <button
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition text-lg font-medium"
          onClick={() => {
            navigate("/admin/cms");
            setProductsOpen(false);
          }}
        >
          CMS
        </button>
      </nav>
    </aside>
  );
};

const Topbar = ({ onUserClick }) => (
  <header className="fixed left-56 right-0 top-0 h-16 bg-white flex items-center justify-end px-8 shadow z-40">
    <button className="relative" onClick={onUserClick}>
      <img
        src="https://ui-avatars.com/api/?name=Admin+User"
        alt="User"
        className="h-10 w-10 rounded-full border"
      />
    </button>
  </header>
);

const UserDropdown = ({ open, onClose, onLogout }) =>
  open ? (
    <div className="absolute right-8 top-16 w-56 bg-white rounded shadow-lg border z-50">
      <div className="px-4 py-3 border-b font-semibold">{USER.name}</div>
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => alert("Change password")}
      >
        Change Password
      </button>
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  ) : null;

const AdminDashboard = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Topbar onUserClick={() => setUserDropdown((v) => !v)} />
      <UserDropdown
        open={userDropdown}
        onClose={() => setUserDropdown(false)}
        onLogout={handleLogout}
      />
      <main className="ml-56 pt-20 px-8">
        <Routes>
          <Route
            path="/admin"
            element={
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-500 text-white rounded shadow p-6 flex flex-col justify-between">
                    <div className="text-lg font-semibold mb-2">Sign ups</div>
                    <div className="text-3xl font-bold mb-2">114</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>+25% from last month</span>
                    </div>
                  </div>
                  <div className="bg-green-500 text-white rounded shadow p-6 flex flex-col justify-between">
                    <div className="text-lg font-semibold mb-2">Revenue</div>
                    <div className="text-3xl font-bold mb-2">$25,541</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>+17.5% from last month</span>
                    </div>
                  </div>
                  <div className="bg-red-500 text-white rounded shadow p-6 flex flex-col justify-between">
                    <div className="text-lg font-semibold mb-2">
                      Open tickets
                    </div>
                    <div className="text-3xl font-bold mb-2">5</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Last 30 days</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded shadow p-6">
                    <div className="font-semibold mb-2">Bar Chart</div>
                    <div className="h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                      [Chart Placeholder]
                    </div>
                  </div>
                  <div className="bg-white rounded shadow p-6">
                    <div className="font-semibold mb-2">Notifications</div>
                    <ul className="text-gray-700">
                      <li className="py-2 border-b">
                        New comment{" "}
                        <span className="float-right text-xs text-gray-500">
                          21 days ago
                        </span>
                      </li>
                      <li className="py-2 border-b">
                        New comment{" "}
                        <span className="float-right text-xs text-gray-500">
                          21 days ago
                        </span>
                      </li>
                      <li className="py-2 border-b">
                        New comment{" "}
                        <span className="float-right text-xs text-gray-500">
                          21 days ago
                        </span>
                      </li>
                      <li className="py-2">
                        <button className="text-blue-600 text-xs">
                          Show all
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            }
          />
          <Route path="featured" element={<FeaturedProducts />} />
          <Route path="products" element={<ProductList />} />
          <Route path="categories" element={<Categories />} />
          <Route
            path="/admin/cms"
            element={
              <div className="bg-white rounded shadow p-8">CMS Placeholder</div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
