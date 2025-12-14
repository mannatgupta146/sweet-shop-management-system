import { useEffect, useState } from "react";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  // 🔐 Protect admin route
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/");
    loadSweets();
  }, []);

  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  // ➕ ADD SWEET
  const addSweet = async () => {
    await api.post("/sweets", {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });

    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    loadSweets();
  };

  // ✏️ UPDATE
  const updateSweet = async (id: string, price: number, qty: number) => {
    await api.put(`/sweets/${id}`, { price, quantity: qty });
    loadSweets();
  };

  return (
    <div className="container">
      <h2>🛠️ Admin Dashboard</h2>

      {/* ADD SWEET FORM */}
      <div className="card">
        <h4>Add Sweet</h4>

        <input placeholder="Sweet name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Category (milk, dry, indian)" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />

        <button onClick={addSweet}>Add Sweet</button>
      </div>

      {/* SWEETS LIST */}
      <div className="grid">
        {sweets.map(s => (
          <SweetCard
            key={s._id}
            sweet={s}
            onPurchase={() => {}}
            onUpdate={updateSweet}
            onRestock={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
