export interface Ruangan {
  id: number;
  namaRuangan: string;
  gedung: string;
  kapasitas?: number;
}

export interface Peminjaman {
  id: number;
  namaPeminjam: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: string;
  ruanganId: number;

  ruangan?: Ruangan; // <-- TAMBAHKAN INI
}
