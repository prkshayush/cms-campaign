'use client'

import { useState, useEffect } from 'react'
import { apiService } from '@/lib/api'
import FormField from '@/components/forms/Formfield.js'

const CampaignFields = {
  name: { type: 'text', label: 'Campaign Name', required: true },
  segmentId: { type: 'select', label: 'Segment', required: true },
  scheduledFor: { type: 'date', label: 'Scheduled For', required: true }
}

export default function CampaignForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [segments, setSegments] = useState([])

  useEffect(() => {
    const fetchSegments = async () => {
      const data = await apiService.getAllSegments()
      setSegments(data.map(segment => ({ value: segment._id, label: segment.name })))
    }
    fetchSegments()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    Object.entries(CampaignFields).forEach(([name, field]) => {
      if (field.required && !formData[name]) {
        newErrors[name] = `${field.label} is required`
      }
    })
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.entries(CampaignFields).map(([name, field]) => (
        <FormField
          key={name}
          field={field}
          value={formData[name] || ''}
          onChange={handleChange}
          errors={errors[name]}
          options={name === 'segmentId' ? segments : undefined}
        />
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}