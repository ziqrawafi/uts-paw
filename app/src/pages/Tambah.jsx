import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = { judul: '', kategori: 'Komputer', kodeAlat: '', jumlah: '', kondisi: '' }

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }
    tambah({ ...form, judul: form.judul.trim(), jumlah: Number(form.jumlah) })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Alat</h1>

      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        <option>Komputer</option>
        <option>Jaringan</option>
        <option>Elektronika</option>
        <option>Alat Ukur</option>
      </select>

      <label htmlFor="kodeAlat">Kode Alat</label>
      <input id="kodeAlat" name="kodeAlat" value={form.kodeAlat} onChange={ubah} />

      <label htmlFor="jumlah">Jumlah</label>
      <input id="jumlah" name="jumlah" type="number" value={form.jumlah} onChange={ubah} />

      <label htmlFor="kondisi">Kondisi</label>
      <select id="kondisi" name="kondisi" value={form.kondisi} onChange={ubah}>
        <option value="baik">Baik</option>
        <option value="Perlu servis">Perlu servis</option>
        <option value="Rusak">Rusak</option>
      </select>

      <button type="submit">Simpan</button>
    </form>
  )
}