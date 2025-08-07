'use client'

import { useState } from 'react'
import { Download, FileText, FileSpreadsheet, Code, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'
import type { Todo } from '@/app/todo/page'

interface ExportButtonsProps {
  todos: Todo[]
}

export default function ExportButtons({ todos }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false)

  const categoryLabels = {
    cita: 'Cita',
    tratamiento: 'Tratamiento',
    seguimiento: 'Seguimiento',
    emergencia: 'Emergencia',
    vacunacion: 'Vacunación'
  }

  const priorityLabels = {
    baja: 'Baja',
    media: 'Media',
    alta: 'Alta'
  }

  const statusLabels = {
    'pendiente': 'Pendiente',
    'en-progreso': 'En Progreso',
    'completado': 'Completado'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.width
      const margin = 20
      let yPosition = margin

      // Título
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Lista de Tareas Veterinarias - VetCare', margin, yPosition)
      yPosition += 15

      // Fecha de generación
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, margin, yPosition)
      yPosition += 10

      // Estadísticas
      const totalTodos = todos.length
      const pendientes = todos.filter(t => t.status === 'pendiente').length
      const enProgreso = todos.filter(t => t.status === 'en-progreso').length
      const completadas = todos.filter(t => t.status === 'completado').length

      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Resumen:', margin, yPosition)
      yPosition += 8

      pdf.setFont('helvetica', 'normal')
      pdf.text(`Total de tareas: ${totalTodos}`, margin + 10, yPosition)
      yPosition += 6
      pdf.text(`Pendientes: ${pendientes}`, margin + 10, yPosition)
      yPosition += 6
      pdf.text(`En progreso: ${enProgreso}`, margin + 10, yPosition)
      yPosition += 6
      pdf.text(`Completadas: ${completadas}`, margin + 10, yPosition)
      yPosition += 15

      // Lista de tareas
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Tareas:', margin, yPosition)
      yPosition += 10

      todos.forEach((todo, index) => {
        // Verificar si necesitamos una nueva página
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = margin
        }

        // Título de la tarea
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text(`${index + 1}. ${todo.title}`, margin, yPosition)
        yPosition += 8

        // Detalles
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        
        const details = [
          `Descripción: ${todo.description}`,
          `Categoría: ${categoryLabels[todo.category]}`,
          `Prioridad: ${priorityLabels[todo.priority]}`,
          `Estado: ${statusLabels[todo.status]}`,
          `Fecha límite: ${formatDate(todo.dueDate)}`,
          ...(todo.petName ? [`Mascota: ${todo.petName}`] : []),
          ...(todo.ownerName ? [`Propietario: ${todo.ownerName}`] : [])
        ]

        details.forEach(detail => {
          const lines = pdf.splitTextToSize(detail, pageWidth - 2 * margin - 10)
          lines.forEach((line: string) => {
            pdf.text(line, margin + 10, yPosition)
            yPosition += 5
          })
        })

        yPosition += 5 // Espacio entre tareas
      })

      pdf.save(`tareas-veterinarias-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      alert('Error al generar el PDF. Por favor, inténtalo de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }

  const exportToText = () => {
    setIsExporting(true)
    try {
      let content = 'LISTA DE TAREAS VETERINARIAS - VETCARE\n'
      content += '=' .repeat(50) + '\n\n'
      content += `Generado el: ${new Date().toLocaleDateString('es-ES')}\n\n`

      // Estadísticas
      content += 'RESUMEN:\n'
      content += `---------\n`
      content += `Total de tareas: ${todos.length}\n`
      content += `Pendientes: ${todos.filter(t => t.status === 'pendiente').length}\n`
      content += `En progreso: ${todos.filter(t => t.status === 'en-progreso').length}\n`
      content += `Completadas: ${todos.filter(t => t.status === 'completado').length}\n\n`

      // Lista de tareas
      content += 'TAREAS:\n'
      content += '-------\n\n'

      todos.forEach((todo, index) => {
        content += `${index + 1}. ${todo.title}\n`
        content += `   Descripción: ${todo.description}\n`
        content += `   Categoría: ${categoryLabels[todo.category]}\n`
        content += `   Prioridad: ${priorityLabels[todo.priority]}\n`
        content += `   Estado: ${statusLabels[todo.status]}\n`
        content += `   Fecha límite: ${formatDate(todo.dueDate)}\n`
        if (todo.petName) content += `   Mascota: ${todo.petName}\n`
        if (todo.ownerName) content += `   Propietario: ${todo.ownerName}\n`
        content += '\n'
      })

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `tareas-veterinarias-${new Date().toISOString().split('T')[0]}.txt`)
    } catch (error) {
      console.error('Error al exportar texto:', error)
      alert('Error al generar el archivo de texto. Por favor, inténtalo de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }

  const exportToCSV = () => {
    setIsExporting(true)
    try {
      const headers = [
        'Título',
        'Descripción',
        'Categoría',
        'Prioridad',
        'Estado',
        'Fecha Límite',
        'Mascota',
        'Propietario',
        'Fecha Creación'
      ]

      const csvContent = [
        headers.join(','),
        ...todos.map(todo => [
          `"${todo.title.replace(/"/g, '""')}"`,
          `"${todo.description.replace(/"/g, '""')}"`,
          `"${categoryLabels[todo.category]}"`,
          `"${priorityLabels[todo.priority]}"`,
          `"${statusLabels[todo.status]}"`,
          `"${formatDate(todo.dueDate)}"`,
          `"${todo.petName || ''}"`,
          `"${todo.ownerName || ''}"`,
          `"${formatDate(todo.createdAt)}"`
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
      saveAs(blob, `tareas-veterinarias-${new Date().toISOString().split('T')[0]}.csv`)
    } catch (error) {
      console.error('Error al exportar CSV:', error)
      alert('Error al generar el archivo CSV. Por favor, inténtalo de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }

  const exportToVisualStudio = () => {
    setIsExporting(true)
    try {
      // Generar código TypeScript/JavaScript para Visual Studio
      let code = `// Tareas Veterinarias - VetCare\n`
      code += `// Generado el: ${new Date().toLocaleDateString('es-ES')}\n\n`
      
      code += `interface Todo {\n`
      code += `  id: string;\n`
      code += `  title: string;\n`
      code += `  description: string;\n`
      code += `  category: 'cita' | 'tratamiento' | 'seguimiento' | 'emergencia' | 'vacunacion';\n`
      code += `  priority: 'baja' | 'media' | 'alta';\n`
      code += `  status: 'pendiente' | 'en-progreso' | 'completado';\n`
      code += `  dueDate: string;\n`
      code += `  petName?: string;\n`
      code += `  ownerName?: string;\n`
      code += `  createdAt: string;\n`
      code += `}\n\n`

      code += `export const veterinaryTodos: Todo[] = [\n`
      
      todos.forEach((todo, index) => {
        code += `  {\n`
        code += `    id: "${todo.id}",\n`
        code += `    title: "${todo.title.replace(/"/g, '\\"')}",\n`
        code += `    description: "${todo.description.replace(/"/g, '\\"')}",\n`
        code += `    category: "${todo.category}",\n`
        code += `    priority: "${todo.priority}",\n`
        code += `    status: "${todo.status}",\n`
        code += `    dueDate: "${todo.dueDate}",\n`
        if (todo.petName) code += `    petName: "${todo.petName}",\n`
        if (todo.ownerName) code += `    ownerName: "${todo.ownerName}",\n`
        code += `    createdAt: "${todo.createdAt}"\n`
        code += `  }${index < todos.length - 1 ? ',' : ''}\n`
      })
      
      code += `];\n\n`
      
      code += `// Funciones de utilidad\n`
      code += `export const getTodosByStatus = (status: Todo['status']) => {\n`
      code += `  return veterinaryTodos.filter(todo => todo.status === status);\n`
      code += `};\n\n`
      
      code += `export const getTodosByCategory = (category: Todo['category']) => {\n`
      code += `  return veterinaryTodos.filter(todo => todo.category === category);\n`
      code += `};\n\n`
      
      code += `export const getOverdueTodos = () => {\n`
      code += `  const today = new Date();\n`
      code += `  return veterinaryTodos.filter(todo => {\n`
      code += `    const dueDate = new Date(todo.dueDate);\n`
      code += `    return dueDate < today && todo.status !== 'completado';\n`
      code += `  });\n`
      code += `};\n`

      const blob = new Blob([code], { type: 'text/typescript;charset=utf-8' })
      saveAs(blob, `veterinary-todos-${new Date().toISOString().split('T')[0]}.ts`)
    } catch (error) {
      console.error('Error al exportar código:', error)
      alert('Error al generar el archivo de código. Por favor, inténtalo de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }

  if (todos.length === 0) {
    return (
      <Button variant="outline" disabled>
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          {isExporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Exportar ({todos.length})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={exportToPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Exportar como PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToText}>
          <FileText className="h-4 w-4 mr-2" />
          Exportar como Texto
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Exportar como CSV (Excel)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportToVisualStudio}>
          <Code className="h-4 w-4 mr-2" />
          Código para Visual Studio
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
