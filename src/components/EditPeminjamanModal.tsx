import { useEffect, useState } from "react";
import { getRuangans } from "../services/api";


export default function EditPeminjamanModal({ data, onClose, refresh }: any) {
  const [ruangans, setRuangans] = useState<any[]>([]);
  const [form, setForm] = useState({
    namaPeminjam: data.namaPeminjam,
    tanggalMulai: data.tanggalMulai.slice(0, 16),
    tanggalSelesai: data.tanggalSelesai.slice(0, 16),
    ruanganId: data.ruanganId,
  });

  useEffect(() => {
    getRuangans().then(setRuangans);
  }, []);

  const handleSubmit = (e: any) => {
  e.preventDefault();
  onClose();
};


  return (
    <div className="modal-backdrop">
      <form className="modal-card" onSubmit={handleSubmit}>
        <h3>Edit Peminjaman</h3>

        <label>Nama Peminjam</label>
        <input
          value={form.namaPeminjam}
          onChange={(e) =>
            setForm({ ...form, namaPeminjam: e.target.value })
          }
        />

        <label>Pilih Ruangan</label>
        <select
          value={form.ruanganId}
          onChange={(e) =>
            setForm({ ...form, ruanganId: Number(e.target.value) })
          }
        >
          {ruangans.map((r) => (
            <option key={r.id} value={r.id}>
              {r.namaRuangan} - {r.gedung}
            </option>
          ))}
        </select>

        <label>Waktu Mulai</label>
        <input
          type="datetime-local"
          value={form.tanggalMulai}
          onChange={(e) =>
            setForm({ ...form, tanggalMulai: e.target.value })
          }
        />

        <label>Waktu Selesai</label>
        <input
          type="datetime-local"
          value={form.tanggalSelesai}
          onChange={(e) =>
            setForm({ ...form, tanggalSelesai: e.target.value })
          }
        />

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="primary">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
