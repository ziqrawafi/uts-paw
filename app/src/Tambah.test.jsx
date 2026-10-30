import { render, screen,waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'

const DATA = [{ id: '1', judul: 'Router', kategori: 'Jaringan', kodeAlat: 'JAR-001', jumlah: 8, kondisi: 'Baik' },
]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA))))
})

function buka(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

async function tambahAlat(judul, kategori, kodeAlat, jumlah, kondisi) {
  await userEvent.type(screen.getByLabelText('Judul'), judul)
  await userEvent.selectOptions(screen.getByLabelText('Kategori'), kategori)
  await userEvent.type(screen.getByLabelText('Kode Alat'), kodeAlat)
  await userEvent.type(screen.getByLabelText('Jumlah'), jumlah)
  await userEvent.selectOptions(screen.getByLabelText('Kondisi'), kondisi)
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
}

test('menampilkan data hasil fetch di halaman koleksi', async () => {
  buka('/koleksi')
  expect(await screen.findByText(DATA[0].judul)).toBeInTheDocument()
})

test('form menolak judul kosong', async () => {
  buka('/tambah')
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Judul wajib diisi')
})

test('form menampilkan semua field alat', () => {
  buka('/tambah')
  expect(screen.getByLabelText('Judul')).toBeInTheDocument()
  expect(screen.getByLabelText('Kategori')).toBeInTheDocument()
  expect(screen.getByLabelText('Kode Alat')).toBeInTheDocument()
  expect(screen.getByLabelText('Jumlah')).toBeInTheDocument()
  expect(screen.getByLabelText('Kondisi')).toBeInTheDocument()
})

test('menambah alat baru ke koleksi', async () => {
  localStorage.setItem('uts-paw-koleksi', JSON.stringify(DATA))
  buka('/tambah')
  await tambahAlat('Proyektor', 'Elektronika', 'ELE-004', '3', 'Perlu servis')
  await waitFor(() => {
    const tersimpan = JSON.parse(localStorage.getItem('uts-paw-koleksi') || '[]')
    expect(tersimpan).toHaveLength(DATA.length + 1)
    expect(tersimpan.some((alat) => alat.judul === 'Proyektor')).toBe(true)
  })
})