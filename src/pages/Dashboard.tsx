import { useEffect, useState } from "react";
import { getPeminjaman } from "../services/api";
import PeminjamanForm from "../components/PeminjamanForm";
import PeminjamanList from "../components/PeminjamanList";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = async () => {
    const res = await getPeminjaman();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const total = data.length;
  const menunggu = data.filter((d) => d.status === "Menunggu").length;
  const disetujui = data.filter((d) => d.status === "Disetujui").length;
  const ditolak = data.filter((d) => d.status === "Ditolak").length;

  return (
    <div className="container">
      <h1>Dashboard Admin Manajemen Ruangan</h1>

      <div className="stats">
        <div className="stat-card total">
          <h3>Total</h3>
          <p>{total}</p>
        </div>

        <div className="stat-card waiting">
          <h3>Menunggu</h3>
          <p>{menunggu}</p>
        </div>

        <div className="stat-card approved">
          <h3>Disetujui</h3>
          <p>{disetujui}</p>
        </div>

        <div className="stat-card rejected">
          <h3>Ditolak</h3>
          <p>{ditolak}</p>
        </div>
      </div>

      <div className="card">
        <h2>Tambah Peminjaman</h2>
        <PeminjamanForm refresh={handleRefresh} />
      </div>

      <div className="card">
        <h2>Daftar Peminjaman</h2>
        <PeminjamanList refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default Dashboard;
