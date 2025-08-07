'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mascota: '',
    servicio: '',
    mensaje: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mascota: '',
        servicio: '',
        mensaje: ''
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      info: '+1 (555) 123-4567',
      description: 'Llámanos para agendar tu cita'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@vetcare.com',
      description: 'Envíanos un mensaje'
    },
    {
      icon: MapPin,
      title: 'Dirección',
      info: '123 Calle Principal, Ciudad',
      description: 'Visítanos en nuestra clínica'
    },
    {
      icon: Clock,
      title: 'Horarios',
      info: 'Lun-Vie: 8AM-6PM, Sáb: 9AM-2PM',
      description: 'Emergencias 24/7'
    }
  ]

  const horarios = [
    { dia: 'Lunes - Viernes', horario: '8:00 AM - 6:00 PM' },
    { dia: 'Sábado', horario: '9:00 AM - 2:00 PM' },
    { dia: 'Domingo', horario: 'Solo Emergencias' },
    { dia: 'Emergencias', horario: '24 horas / 7 días' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Agenda una cita o contáctanos para cualquier consulta 
            sobre el cuidado de tu mascota.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-green-100">
                <CardHeader>
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                    <info.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-900 mb-2">{info.info}</p>
                  <CardDescription className="text-gray-600">
                    {info.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Agenda tu Cita</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-gray-600">
                      Gracias por contactarnos. Te responderemos pronto para confirmar tu cita.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre">Nombre Completo *</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          type="text"
                          required
                          value={formData.nombre}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          required
                          value={formData.telefono}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mascota">Nombre de tu Mascota</Label>
                      <Input
                        id="mascota"
                        name="mascota"
                        type="text"
                        value={formData.mascota}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="servicio">Servicio Requerido</Label>
                      <Select onValueChange={(value) => handleSelectChange('servicio', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulta">Consulta General</SelectItem>
                          <SelectItem value="vacunacion">Vacunación</SelectItem>
                          <SelectItem value="cirugia">Cirugía</SelectItem>
                          <SelectItem value="emergencia">Emergencia</SelectItem>
                          <SelectItem value="esterilizacion">Esterilización</SelectItem>
                          <SelectItem value="analisis">Análisis Clínicos</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="mensaje">Mensaje Adicional</Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        rows={4}
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos más sobre tu mascota o el motivo de la consulta..."
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Solicitud
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Schedule */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Horarios de Atención</CardTitle>
                  <CardDescription>
                    Nuestros horarios regulares y servicio de emergencia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {horarios.map((horario, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-900">{horario.dia}</span>
                        <span className="text-gray-600">{horario.horario}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-xl text-red-800">Emergencias</CardTitle>
                  <CardDescription className="text-red-600">
                    Para situaciones de emergencia, llama inmediatamente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <p className="text-2xl font-bold text-red-800 mb-2">
                      +1 (555) 911-PETS
                    </p>
                    <p className="text-red-600 mb-4">
                      Disponible 24 horas, 7 días a la semana
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Llamar Ahora
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Nuestra Ubicación</CardTitle>
                  <CardDescription>
                    Fácil acceso y estacionamiento disponible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">123 Calle Principal</p>
                        <p className="text-gray-600">Ciudad, Estado 12345</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Mapa de ubicación</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• Estacionamiento gratuito disponible</p>
                      <p>• Acceso para sillas de ruedas</p>
                      <p>• Transporte público cercano</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
