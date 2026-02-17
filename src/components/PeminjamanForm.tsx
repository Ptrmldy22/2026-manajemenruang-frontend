import { useEffect, useState } from "react";
import { getRuangans, createPeminjaman } from "../services/api";
import { Ruangan } from "../types";
import "./PeminjamanForm.css";

interface Props {
  refresh: () => void;
}

export default function PeminjamanForm({ refresh }: Props) {
  const [ruangans, setRuangans] = useState<Ruangan[]>([]);
  const [selectedRuangan, setSelectedRuangan] =
    useState<Ruangan | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    namaPeminjam: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    ruanganId: 0,
  });

  useEffect(() => {
    getRuangans().then(setRuangans);
  }, []);

  const handleRuanganChange = (id: number) => {
    const ruangan = ruangans.find((r) => r.id === id) || null;
    setSelectedRuangan(ruangan);
    setForm({ ...form, ruanganId: id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.ruanganId === 0) {
      alert("Silakan pilih ruangan terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        NamaPeminjam: form.namaPeminjam,
        TanggalMulai: form.tanggalMulai + ":00",
        TanggalSelesai: form.tanggalSelesai + ":00",
        RuanganId: form.ruanganId,
      };

      await createPeminjaman(payload);
      refresh();

      setForm({
        namaPeminjam: "",
        tanggalMulai: "",
        tanggalSelesai: "",
        ruanganId: 0,
      });
      setSelectedRuangan(null);
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="peminjaman-form" onSubmit={handleSubmit}>
      <input
        placeholder="Nama Peminjam"
        value={form.namaPeminjam}
        onChange={(e) =>
          setForm({ ...form, namaPeminjam: e.target.value })
        }
        required
      />

      <input
        type="datetime-local"
        value={form.tanggalMulai}
        onChange={(e) =>
          setForm({ ...form, tanggalMulai: e.target.value })
        }
        required
      />

      <input
        type="datetime-local"
        value={form.tanggalSelesai}
        onChange={(e) =>
          setForm({ ...form, tanggalSelesai: e.target.value })
        }
        required
      />

      <select
        value={form.ruanganId}
        onChange={(e) =>
          handleRuanganChange(Number(e.target.value))
        }
        required
      >
        <option value={0}>Pilih Ruangan</option>
        {ruangans.map((r) => (
          <option key={r.id} value={r.id}>
            {r.namaRuangan} – {r.gedung}{" "}
            {r.kapasitas
              ? `(Kapasitas ${r.kapasitas})`
              : `(Tanpa batas)`}
          </option>
        ))}
      </select>

      {selectedRuangan && (
        <div className="ruangan-info">
          <strong>Info Ruangan</strong>
          <p>Gedung: {selectedRuangan.gedung}</p>
          <p>
            Kapasitas:{" "}
            {selectedRuangan.kapasitas ?? "Tidak dibatasi"}
          </p>
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  );
}
