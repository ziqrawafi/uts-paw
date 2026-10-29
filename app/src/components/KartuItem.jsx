import { Link } from 'react-router-dom'

export default function KartuItem({ item }) {
  const { id, judul, kategori, kodeAlat, jumlah, kondisi } = item
  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>
        {kategori} · {kodeAlat}
      </p>
      <p>
        Jumlah: {jumlah} · Kondisi: {kondisi}
      </p>
    </article>
  )
}