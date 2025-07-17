import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [hoveredDrug, setHoveredDrug] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    fetchUserProfile();
    fetchDrugs();
    fetchOrders();

    return () => clearInterval(timer);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setUsername(data.username);
      setAge(data.age);
      fetchRecommendation(data.age);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchDrugs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/drugs");
      const data = await res.json();
      setDrugs(data);
    } catch (error) {
      console.error("Error fetching drugs:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/user", {
        credentials: "include",
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchRecommendation = async (age) => {
    try {
      const res = await fetch(`http://localhost:5000/api/recommendation/${age}`);
      const data = await res.json();
      setRecommendation(data.message);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, { sender: "User", text: newMessage }]);
    setNewMessage("");
    await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender: "User", message: newMessage }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">Welcome, {username}</h2>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
        <div className="text-center text-lg font-semibold">Current Time: {currentTime}</div>

        {/* Drugs */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">Available Drugs</h3>
        <div className="grid grid-cols-2 gap-4">
          {drugs.map((drug, index) => (
            <div
              key={index}
              className="relative bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer transition-all duration-200 ease-in-out"
              onMouseEnter={() => setHoveredDrug(drug.name)}
              onMouseLeave={() => setHoveredDrug(null)}
            >
              <h4 className="text-lg font-bold">{drug.name}</h4>
              <p className="text-sm">Stock: {drug.stock}</p>
              <p className="text-sm">Added: {drug.addedAt}</p>
              {hoveredDrug === drug.name && drug.sideEffects && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white p-4 rounded-lg shadow-xl z-50 w-64">
                  <strong>Side Effects:</strong>
                  <ul className="list-disc pl-4">
                    {drug.sideEffects.map((effect, idx) => (
                      <li key={idx} className="text-sm">{effect}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Orders */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">My Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-300">No orders placed yet.</p>
        ) : (
          <ul className="list-disc pl-6">
            {orders.map((o, i) => (
              <li key={i}>
                {o.drug.name} — Qty: {o.quantity} on {new Date(o.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}

        {/* AI Recommendations */}
        <h3 className="text-2xl font-semibold mt-6 mb-3">AI Recommendations</h3>
        <p className="text-yellow-300">{recommendation}</p>
      </div>

      {/* Chat */}
      <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Chat with Admin</h3>
        <div className="h-40 overflow-y-auto bg-gray-700 p-3 rounded-md mb-3">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md ${msg.sender === "User" ? "bg-blue-500" : "bg-gray-600"} my-1`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
