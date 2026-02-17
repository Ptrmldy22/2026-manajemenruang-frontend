interface Props {
  data: any[];
  onEdit: (data: any) => void;
  approve: (id: number) => void;
  reject: (id: number) => void;
}

export default function PeminjamanTable({
  data,
  onEdit,
  approve,
  reject,
}: Props) {
  return (
    <table>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td>{p.namaPeminjam}</td>
            <td>{p.ruangan?.namaRuangan}</td>
            <td>{p.ruangan?.gedung}</td>
            <td>{p.status}</td>

            <td className="aksi">
              {/* EDIT */}
              <button
                className="btn-edit"
                disabled={p.status !== "Menunggu"}
                onClick={() => onEdit(p)}
              >
                Edit
              </button>

              {/* APPROVE / REJECT */}
              {p.status === "Menunggu" && (
                <>
                  <button onClick={() => approve(p.id)}>✔</button>
                  <button onClick={() => reject(p.id)}>✖</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
