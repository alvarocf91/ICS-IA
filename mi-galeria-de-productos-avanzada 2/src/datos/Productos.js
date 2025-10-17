export const productos = [
  {
    id: 1,
    nombre: 'Smartwatch Pro X',
    vendedor: { nombre: 'ElectroHub', rating: 4.8 },
    imagenes: [
      'https://picsum.photos/seed/watchx/400/300',
      'https://picsum.photos/seed/watchx2/400/300'
    ],
    enStock: true,
    precio: { moneda: '€', valor: 215.50, enOferta: true },
    caracteristicas: ['GPS integrado', 'Monitor de ritmo cardíaco', 'Resistente al agua (5 ATM)']
  },
  {
    id: 2,
    nombre: 'Auriculares Inalámbricos AirWave',
    vendedor: { nombre: 'SoundWorld', rating: 4.6 },
    imagenes: [
      'https://picsum.photos/seed/airwave/400/300',
      'https://picsum.photos/seed/airwave2/400/300'
    ],
    enStock: true,
    precio: { moneda: '€', valor: 89.99, enOferta: false },
    caracteristicas: ['Cancelación de ruido', 'Autonomía 30h', 'Carga rápida USB‑C']
  },
  {
    id: 3,
    nombre: 'Cámara ActionCam 4K',
    vendedor: { nombre: 'AdventurePro', rating: 4.4 },
    imagenes: [
      'https://picsum.photos/seed/actioncam/400/300',
      'https://picsum.photos/seed/actioncam2/400/300'
    ],
    enStock: false,
    precio: { moneda: '€', valor: 149.00, enOferta: true },
    caracteristicas: ['4K a 60fps', 'Estabilización avanzada', 'Sumergible 10m']
  },
  {
    id: 4,
    nombre: 'Teclado Mecánico KeyMaster',
    vendedor: { nombre: 'ProTyping', rating: 4.9 },
    imagenes: [
      'https://picsum.photos/seed/keymaster/400/300',
      'https://picsum.photos/seed/keymaster2/400/300'
    ],
    enStock: true,
    precio: { moneda: '€', valor: 129.95, enOferta: true },
    caracteristicas: ['Switches hot‑swap', 'Retroiluminación RGB', 'Carcasa de aluminio']
  }
]
