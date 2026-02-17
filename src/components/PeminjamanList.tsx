import { useEffect, useState } from "react";
import { getPeminjaman, deletePeminjaman, updateStatus } from "../services/api";
import EditPeminjamanModal from "./EditPeminjamanModal";
import "./PeminjamanList.css";

interface Props {
  refreshKey: number;
}

export default function PeminjamanList({ refreshKey }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>(null);

  const fetchData = async () => {
    const res = await getPeminjaman();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    await deletePeminjaman(id);
    fetchData();
  };

  const handleStatusChange = async (id: number, status: string) => {
    await updateStatus(id, status);
    fetchData();
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Ruangan</th>
            <th>Gedung</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.namaPeminjam}</td>
              <td>{p.ruangan?.namaRuangan}</td>
              <td>{p.ruangan?.gedung}</td>

              <td>
                {p.status === "Menunggu" ? (
                  <select
                    value=""
                    onChange={(e) =>
                      handleStatusChange(p.id, e.target.value)
                    }
                  >
                    <option value="">Pilih</option>
                    <option value="Disetujui">Disetujui</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                ) : (
                  <span
                    className={`badge ${
                      p.status === "Disetujui"
                        ? "approved"
                        : "rejected"
                    }`}
                  >
                    {p.status}
                  </span>
                )}
              </td>

              <td className="aksi">
                <button
                  className="btn-edit"
                  onClick={() => setEditData(p)}
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(p.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <EditPeminjamanModal
          data={editData}
          onClose={() => setEditData(null)}
          refresh={fetchData}
        />
      )}
    </>
  );
}
