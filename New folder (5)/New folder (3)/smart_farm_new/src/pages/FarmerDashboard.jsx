import { useState } from "react";
import {
  Plus,
  Package,
  TrendingUp,
  DollarSign,
  LogOut,
} from "lucide-react";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      cropName,
      quantity,
      price,
      status: "Available",
    };

    setProducts([newProduct, ...products]);

    setCropName("");
    setQuantity("");
    setPrice("");
    setShowForm(false);
  };

  const totalRevenue = products.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-gray-500">
            Manage your agricultural products
          </p>
        </div>

        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg">
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Products</p>
              <h2 className="text-2xl font-bold">{products.length}</h2>
            </div>
            <Package className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Active Listings</p>
              <h2 className="text-2xl font-bold">{products.length}</h2>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h2 className="text-2xl font-bold">
                ₹{totalRevenue.toLocaleString()}
              </h2>
            </div>
            <DollarSign className="text-yellow-500" size={32} />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">My Products</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <form
            onSubmit={handleAddProduct}
            className="p-6 bg-gray-50 border-b"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Crop Name"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Quantity (kg)"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Price per kg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-3 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Save Product
            </button>
          </form>
        )}

        {/* Product List */}
        <div className="p-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">
              No products added yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:shadow-md"
                >
                  <h3 className="font-bold text-lg mb-2">
                    {product.cropName}
                  </h3>

                  <p>Quantity: {product.quantity} kg</p>

                  <p>Price: ₹{product.price}/kg</p>

                  <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
