const BASE_URL = "http://localhost:5255/api";

export const getRuangans = async () => {
  const res = await fetch(`${BASE_URL}/Ruangan`);
  if (!res.ok) throw new Error("Gagal ambil ruangan");
  return res.json();
};

export const getPeminjaman = async () => {
  const res = await fetch(`${BASE_URL}/Peminjaman`);
  if (!res.ok) throw new Error("Gagal ambil peminjaman");
  return res.json();
};

export const createPeminjaman = async (data: any) => {
  const res = await fetch(`${BASE_URL}/Peminjaman`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deletePeminjaman = async (id: number) => {
  const res = await fetch(`${BASE_URL}/Peminjaman/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal hapus");
};

export const updateStatus = async (id: number, status: string) => {
  const endpoint =
    status === "Disetujui"
      ? `http://localhost:5000/api/Peminjaman/approve/${id}`
      : `http://localhost:5000/api/Peminjaman/reject/${id}`;

  const response = await fetch(endpoint, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Gagal update status");
  }

  return response.json();
};


