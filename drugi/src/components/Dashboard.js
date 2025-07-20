import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stockQuantity, setStockQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newDrug, setNewDrug] = useState("");
  const [newStock, setNewStock] = useState("");
  const [stockHistory, setStockHistory] = useState([]);
  const [graphData, setGraphData] = useState([]);

  // Drug data with images
 const [stockData, setStockData] = useState([
  { id: 1, name: "Lisinopril", stock: 70, image: "/assets/img1.jpg" },
  { id: 2, name: "Metoprolol", stock: 45, image: "/assets/img2.jpg" },
  { id: 3, name: "Simvastatin", stock: 60, image: "/assets/img3.jpg" },
  { id: 4, name: "Levothyroxine", stock: 25, image: "/assets/img4.jpg" },
  { id: 5, name: "Amlodipine", stock: 80, image: "/assets/img5.jpg" },
  { id: 6, name: "Hydrochlorothiazide", stock: 35, image: "/assets/img1.jpg" },
  { id: 7, name: "Gabapentin", stock: 50, image: "/assets/img2.jpg" },
  { id: 8, name: "Prednisone", stock: 15, image: "/assets/img3.jpg" },
  { id: 9, name: "Atorvastatin", stock: 65, image: "/assets/img4.jpg" },
  { id: 10, name: "Omeprazole", stock: 40, image: "/assets/img5.jpg" },
]);



  const [salesData, setSalesData] = useState([
    { day: "Mon", sales: 40, timestamp: new Date().toLocaleString() },
    { day: "Tue", sales: 60, timestamp: new Date().toLocaleString() },
    { day: "Wed", sales: 30, timestamp: new Date().toLocaleString() },
  ]);

  const lowStockThreshold = 25;
  const lowStockItems = stockData.filter(item => item.stock < lowStockThreshold);
  const filteredStock = stockData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [drugName, setDrugName] = useState("");
  const [stockStatus, setStockStatus] = useState("in_stock");
  const [drugArrivalDate, setDrugArrivalDate] = useState("");
  const [ageRecommendation, setAgeRecommendation] = useState("");
  const [salesUnits, setSalesUnits] = useState("");
  const [salesDate, setSalesDate] = useState("");
  const [salesTime, setSalesTime] = useState("");

  // Handle Stock Form Submission
  const handleStockSubmit = async (e) => {
    e.preventDefault();
  
    if (!drugName) {
      alert("Enter a drug name");
      return;
    }
  
    const newStockItem = {
      id: stockData.length + 1,
      name: drugName,
      stock: parseInt(stockQuantity),
      image: "https://www.drugs.com/images/pills/fio/IPR06010/default.jpg", // Default image
      stockStatus,
      drugArrivalDate,
      aiAgeRecommendation: ageRecommendation,
    };
  
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStockData([...stockData, newStockItem]);
      setStockHistory([...stockHistory, `${new Date().toLocaleString()} - Added ${drugName}`]);
      
      alert("Stock added successfully!");
      // Reset form
      setDrugName("");
      setStockQuantity("");
      setDrugArrivalDate("");
      setAgeRecommendation("");
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Error adding stock");
    }
  };

  // Handle Sales Form Submission
  const handleSalesSubmit = (e) => {
    e.preventDefault();

    if (!salesUnits || !salesDate || !salesTime) {
      alert("Please enter all sales details");
      return;
    }

    const newSale = {
      day: new Date(salesDate).toLocaleDateString("en-US", { weekday: "short" }),
      sales: parseInt(salesUnits),
      timestamp: new Date(`${salesDate} ${salesTime}`).toLocaleString()
    };

    setSalesData([...salesData, newSale]);
    setSalesUnits("");
    setSalesDate("");
    setSalesTime("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {/* Sidebar Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gradient-to-b from-blue-900 to-blue-600 shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-center mb-8">Admin Panel</h1>
          <nav className="space-y-4">
            <a href="#" className="block p-3 rounded-lg bg-blue-700 hover:shadow-lg transition">Dashboard</a>
            <a href="#inventory" className="block p-3 rounded-lg hover:bg-blue-500 transition">Inventory</a>
            <a href="#settings" className="block p-3 rounded-lg hover:bg-blue-500 transition">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search drugs..."
                className="p-2 bg-gray-700 border border-gray-600 rounded-lg w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                Search
              </button>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold">Total Drugs</h3>
              <p className="text-3xl font-bold mt-2">{stockData.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-800 to-green-600 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold">In Stock</h3>
              <p className="text-3xl font-bold mt-2">
                {stockData.filter(item => item.stock > 0).length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-800 to-yellow-600 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold">Low Stock</h3>
              <p className="text-3xl font-bold mt-2">{lowStockItems.length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold">Today's Sales</h3>
              <p className="text-3xl font-bold mt-2">₹5,240</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Stock Levels Chart */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredStock.slice(0, 10)}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip wrapperClassName="text-black" />
                    <Legend />
                    <Bar dataKey="stock" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sales Trends Chart */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <XAxis dataKey="day" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip wrapperClassName="text-black" />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#FFD700" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Inventory Section */}
          <section id="inventory" className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Drug Inventory</h2>
              <div className="flex gap-2">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                  onClick={() => document.getElementById('stock-modal').showModal()}
                >
                  Add New Drug
                </button>
                <Link 
                  to="/drug" 
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                >
                  Manage Drugs
                </Link>
              </div>
            </div>

            {/* Drug Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStock.map((drug) => (
                <div 
                  key={drug.id} 
                  className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:translate-y-1 
                    ${drug.stock < lowStockThreshold ? 'border-l-4 border-red-500' : ''}`}
                >
                  <div className="relative h-40 bg-gray-700">
                    <img 
                      src={drug.image} 
                      alt={drug.name}
                      className="w-full h-full object-cover"
                    />
                    {drug.stock < lowStockThreshold && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{drug.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-400">Stock:</span>
                      <span className={`font-bold ${
                        drug.stock < lowStockThreshold ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {drug.stock} units
                      </span>
                    </div>
                    <button className="mt-4 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Low Stock Alerts */}
          {lowStockItems.length > 0 && (
            <div className="bg-gradient-to-r from-red-900 to-red-700 p-6 rounded-xl shadow-lg mb-8">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-xl font-semibold">Low Stock Alerts ({lowStockItems.length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="bg-red-800/50 p-4 rounded-lg flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm">Only {item.stock} units remaining</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Supplier Management</h2>
              <p className="text-gray-400 mb-4">Manage your suppliers and orders</p>
              <Link to="/supplier-management" className="block text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition">
                Manage Suppliers
              </Link>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p className="text-gray-400 mb-4">Manage staff accounts and permissions</p>
              <Link to="/user" className="block text-center bg-green-600 hover:bg-green-700 p-2 rounded-lg transition">
                Manage Users
              </Link>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Seasonal Trends</h2>
              <p className="text-gray-400 mb-4">Analyze seasonal sales patterns</p>
              <Link to="/season" className="block text-center bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition">
                View Trends
              </Link>
            </div>
          </div>

          {/* Settings Section */}
          <div id="settings" className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">System Settings</h2>
            <p className="text-gray-400 mb-4">Configure application preferences and notifications</p>
            <button 
              onClick={() => navigate("/settings")} 
              className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open Settings
            </button>
          </div>
        </main>
      </div>

      {/* Add Drug Modal */}
      <dialog id="stock-modal" className="bg-gray-800 rounded-xl shadow-2xl p-0 w-full max-w-2xl backdrop:bg-black/50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Add New Drug</h3>
            <button 
              onClick={() => document.getElementById('stock-modal').close()}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleStockSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Drug Name</label>
                <input
                  type="text"
                  placeholder="Enter drug name"
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Status</label>
                <select
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  required
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Initial Quantity</label>
                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Arrival Date</label>
                <input
                  type="date"
                  value={drugArrivalDate}
                  onChange={(e) => setDrugArrivalDate(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Age Recommendation</label>
              <input
                type="text"
                placeholder="Recommended Age (e.g., 18-40 years)"
                value={ageRecommendation}
                onChange={(e) => setAgeRecommendation(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => document.getElementById('stock-modal').close()}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                Add Drug
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;