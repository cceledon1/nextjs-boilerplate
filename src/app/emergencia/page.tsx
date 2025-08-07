'use client'

import { Phone, AlertTriangle, Clock, MapPin, Heart, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'

export default function EmergenciaPage() {
  const emergencySteps = [
    {
      step: 1,
      title: 'Mantén la Calma',
      description: 'Respira profundo y evalúa la situación de tu mascota con tranquilidad.'
    },
    {
      step: 2,
      title: 'Llama Inmediatamente',
      description: 'Contacta nuestra línea de emergencia 24/7 para recibir instrucciones.'
    },
    {
      step: 3,
      title: 'Primeros Auxilios',
      description: 'Sigue las instrucciones del veterinario mientras te diriges a la clínica.'
    },
    {
      step: 4,
      title: 'Transporte Seguro',
      description: 'Transporta a tu mascota de manera segura y rápida a nuestra clínica.'
    }
  ]

  const emergencySigns = [
    'Dificultad para respirar o jadeo excesivo',
    'Sangrado abundante que no se detiene',
    'Pérdida de consciencia o convulsiones',
    'Vómito o diarrea con sangre',
    'Imposibilidad para orinar o defecar',
    'Trauma severo (atropello, caída, etc.)',
    'Ingestión de sustancias tóxicas',
    'Hinchazón abdominal severa',
    'Temperatura corporal muy alta o muy baja',
    'Dolor extremo o llanto constante'
  ]

  const firstAidTips = [
    {
      situation: 'Sangrado',
      action: 'Aplica presión directa con una gasa limpia. No remuevas objetos incrustados.'
    },
    {
      situation: 'Atragantamiento',
      action: 'Abre la boca, revisa si puedes ver el objeto. NO uses pinzas si no lo ves claramente.'
    },
    {
      situation: 'Convulsiones',
      action: 'No toques a tu mascota. Aleja objetos peligrosos y cronometra la duración.'
    },
    {
      situation: 'Intoxicación',
      action: 'NO induzcas el vómito. Guarda el envase del producto y llama inmediatamente.'
    },
    {
      situation: 'Fractura',
      action: 'Inmoviliza a tu mascota en una superficie rígida. No intentes enderezar huesos.'
    },
    {
      situation: 'Quemaduras',
      action: 'Aplica agua fría (no helada) por 10-15 minutos. No uses hielo ni pomadas.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Hero */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Emergencia Veterinaria
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Si tu mascota está en peligro inmediato, no esperes. 
              Nuestro equipo de emergencia está disponible 24/7.
            </p>
            
            {/* Emergency Contact */}
            <div className="bg-white text-red-600 rounded-lg p-8 max-w-md mx-auto">
              <Phone className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Línea de Emergencia</h2>
              <p className="text-3xl font-bold mb-4">+1 (555) 911-PETS</p>
              <Button 
                size="lg" 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.open('tel:+15559117387')}
              >
                <Phone className="h-5 w-5 mr-2" />
                Llamar Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">¡Atención!</AlertTitle>
            <AlertDescription className="text-red-700">
              Esta página es solo para orientación. En caso de emergencia real, 
              llama inmediatamente a nuestra línea de emergencia y dirígete a la clínica.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Qué Hacer en una Emergencia
            </h2>
            <p className="text-lg text-gray-600">
              Sigue estos pasos para manejar la situación de manera efectiva
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencySteps.map((step, index) => (
              <Card key={index} className="text-center border-red-100">
                <CardHeader>
                  <div className="mx-auto bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Signs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Señales de Emergencia
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Si tu mascota presenta alguno de estos síntomas, busca atención veterinaria inmediata:
              </p>
              <div className="space-y-3">
                {emergencySigns.map((sign, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-xl text-orange-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Horario de Emergencia</h3>
                  <p className="text-gray-600">24 horas al día, 7 días a la semana</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Ubicación</h3>
                  <p className="text-gray-600">123 Calle Principal, Ciudad</p>
                  <p className="text-sm text-gray-500">Entrada por la puerta lateral marcada "EMERGENCIA"</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Qué Traer</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Historial médico de tu mascota</li>
                    <li>• Lista de medicamentos actuales</li>
                    <li>• Muestra del vómito/heces si es relevante</li>
                    <li>• Envase del producto tóxico (si aplica)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* First Aid Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Primeros Auxilios Básicos
            </h2>
            <p className="text-lg text-gray-600">
              Medidas temporales mientras llegas a la clínica. NO reemplazan la atención veterinaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstAidTips.map((tip, index) => (
              <Card key={index} className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">{tip.situation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tip.action}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Alert className="max-w-2xl mx-auto border-yellow-200 bg-yellow-50">
              <Heart className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Recordatorio Importante</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Los primeros auxilios son medidas temporales. Siempre busca atención veterinaria profesional 
                lo antes posible, incluso si tu mascota parece mejorar.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿No es una Emergencia?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Si tu mascota necesita atención pero no es una emergencia, 
            agenda una cita regular con nuestro equipo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Agendar Cita Regular
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
                Ver Nuestros Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Contact Footer */}
      <section className="py-8 bg-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 text-white mb-4 md:mb-0">
              <Activity className="h-8 w-8" />
              <div>
                <p className="font-semibold">Emergencia 24/7</p>
                <p className="text-red-200">Siempre disponibles para tu mascota</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-white">
                <p className="font-semibold">+1 (555) 911-PETS</p>
                <p className="text-red-200">Llamada gratuita</p>
              </div>
              <Button 
                className="bg-white text-red-800 hover:bg-gray-100"
                onClick={() => window.open('tel:+15559117387')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Llamar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
