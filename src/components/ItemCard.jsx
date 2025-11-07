// src/components/ItemCard.jsx
export default function ItemCard({ item }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{item.nombre}</h5>
          <p className="card-text text-muted">{item.descripcion}</p>
          <p className="fw-bold">${item.precio.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
