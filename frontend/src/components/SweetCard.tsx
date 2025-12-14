type Props = {
  sweet: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onPurchase: (id: string) => void;
  onUpdate: (id: string, price: number, qty: number) => void;
  onRestock: (id: string) => void;
};

export default function SweetCard({
  sweet,
  onPurchase,
  onUpdate,
  onRestock,
}: Props) {
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <div className="card">
      <h4>{sweet.name}</h4>
      <p>
        ₹{sweet.price} • Qty: {sweet.quantity}
      </p>

      <button
        disabled={sweet.quantity === 0}
        onClick={() => onPurchase(sweet._id)}
      >
        Purchase
      </button>

      {isAdmin && (
        <div className="admin">
          <button
            onClick={() =>
              onUpdate(sweet._id, sweet.price + 5, sweet.quantity)
            }
          >
            +₹5
          </button>

          <button
            onClick={() =>
              onUpdate(sweet._id, sweet.price, sweet.quantity + 5)
            }
          >
            +5 Qty
          </button>

          <button onClick={() => onRestock(sweet._id)}>
            Restock
          </button>
        </div>
      )}
    </div>
  );
}
