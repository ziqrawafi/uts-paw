import { NavLink, Outlet } from 'react-router-dom'
import mahasiswa from '../../mahasiswa.json'
import './Layout.css'
import './Bonus.css'

const MENU = [
  { ke: '/', label: 'Beranda' },
  { ke: '/koleksi', label: 'Koleksi' },
  { ke: '/tambah', label: 'Tambah' },
  { ke: '/statistik', label: 'Statistik' },
  { ke: '/tentang', label: 'Tentang' },
]

export default function Layout() {
  return (
    <div className="kerangka">
      <header className="kepala" id="kepala-utama">
        <strong>Inventaris laboratorium</strong>
        <nav className="menu">
          {MENU.map(({ ke, label }) => (
            <NavLink key={ke} to={ke} end={ke === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="isi" id="konten-utama">
        <Outlet />
      </main>
        <footer className="kaki" id="kaki-situs">
          <span className="kaki-kiri">Ujian Tengah Semester Pengembangan Aplikasi Web</span>
          <span>{mahasiswa.nama}</span>
        </footer>
    </div>
  )
}