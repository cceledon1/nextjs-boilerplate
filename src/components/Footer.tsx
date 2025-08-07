import Link from 'next/link'
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-full">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold">VetCare</span>
            </div>
            <p className="text-green-100 mb-4">
              Brindamos atención veterinaria profesional y amorosa para tus mascotas. 
              Nuestro equipo está comprometido con la salud y bienestar de tus compañeros peludos.
            </p>
            <div className="flex space-x-4">
              <div className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition-colors cursor-pointer">
                <Phone className="h-5 w-5" />
              </div>
              <div className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition-colors cursor-pointer">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-100 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-green-100 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-green-100 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/emergencia" className="text-green-100 hover:text-white transition-colors">
                  Emergencia
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-300" />
                <span className="text-green-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-300" />
                <span className="text-green-100">info@vetcare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-300" />
                <span className="text-green-100">123 Calle Principal, Ciudad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-green-300" />
                <span className="text-green-100">Lun-Vie: 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200">
            © 2024 VetCare. Todos los derechos reservados. Hecho con ❤️ para nuestras mascotas.
          </p>
        </div>
      </div>
    </footer>
  )
}
