import { useEffect, useState } from "react";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";

export default function Sweets() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // LOAD ALL SWEETS
  const loadSweets = async () => {
    setLoading(true);
    const res = await api.get("/sweets");
    setSweets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // SEARCH
  const handleSearch = async () => {
    if (!search.trim()) {
      loadSweets();
      return;
    }

    setLoading(true);
    const res = await api.get(
        `/sweets/search?q=${encodeURIComponent(search.trim())}`
    );

    setSweets(res.data);
    setLoading(false);
  };

  // PURCHASE
  const purchase = async (id: string) => {
    await api.post(`/sweets/${id}/purchase`);
    loadSweets();
  };

  // UPDATE
  const updateSweet = async (
    id: string,
    price: number,
    quantity: number
  ) => {
    await api.put(`/sweets/${id}`, { price, quantity });
    loadSweets();
  };

  // RESTOCK
  const restockSweet = async (id: string) => {
    await api.post(`/sweets/${id}/restock`, { quantity: 5 });
    loadSweets();
  };

  return (
    <div className="container">
      <h2>🍬 Sweets Shop</h2>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          placeholder="Search sweet (eg. Gulab Jamun)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
        <button className="secondary" onClick={loadSweets}>
          Reset
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* SWEET CARDS */}
      <div className="grid">
        {sweets.length === 0 && !loading && (
          <p>No sweets found</p>
        )}

        {sweets.map((s) => (
          <SweetCard
            key={s._id}
            sweet={s}
            onPurchase={purchase}
            onUpdate={updateSweet}
            onRestock={restockSweet}
          />
        ))}
      </div>
    </div>
  );
}
