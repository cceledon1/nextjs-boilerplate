'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Heart, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Emergencia', href: '/emergencia' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">VetCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Emergency Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/emergencia">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Emergencia
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-green-100">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/emergencia"
                className="block px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                🚨 Emergencia
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
