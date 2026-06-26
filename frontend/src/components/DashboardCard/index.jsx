import "./style.css";

function DashboardCard({ title, value, color = "blue" }) {
  return (
    <div className={`dashboard-card ${color}`}>
      <div className="card-top">
        <div>
          <p className="card-title">{title}</p>

          <h2 className="card-value">{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
