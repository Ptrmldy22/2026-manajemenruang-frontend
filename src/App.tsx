import { useEffect, useState } from "react";

interface Ruangan {
  id?: number;
  namaRuangan: string;
  gedung: string;
  kapasitas: number;
}

function App() {
  const [ruanganList, setRuanganList] = useState<Ruangan[]>([]);
  const [formData, setFormData] = useState<Ruangan>({
    namaRuangan: "",
    gedung: "",
    kapasitas: 0,
  });

  const API_URL = "http://localhost:5255/api/Ruangan";

  // =====================
  // GET DATA
  // =====================
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRuanganList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =====================
  // HANDLE INPUT
  // =====================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "kapasitas" ? Number(value) : value,
    });
  };

  // =====================
  // HANDLE SUBMIT (POST)
  // =====================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          namaRuangan: "",
          gedung: "",
          kapasitas: 0,
        });

        fetchData(); // refresh data biar gak dobel
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // =====================
  // HANDLE DELETE
  // =====================
  const handleDelete = async (id?: number) => {
    if (!id) return;

    const confirmDelete = window.confirm("Yakin mau hapus?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData(); // refresh setelah delete
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manajemen Ruang</h1>

      <h2>Tambah Ruangan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="namaRuangan"
          placeholder="Nama Ruangan"
          value={formData.namaRuangan}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="gedung"
          placeholder="Gedung"
          value={formData.gedung}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="kapasitas"
          placeholder="Kapasitas"
          value={formData.kapasitas}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Tambah</button>
      </form>

      <h2>Data Ruangan</h2>
      <ul>
        {ruanganList.map((r) => (
          <li key={r.id}>
            {r.namaRuangan} - {r.gedung} - Kapasitas {r.kapasitas}
            <button
              onClick={() => handleDelete(r.id)}
              style={{ marginLeft: "10px" }}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
