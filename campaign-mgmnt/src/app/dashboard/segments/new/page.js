'use client'

import { useState } from 'react'
import { apiService } from '@/lib/api'
import SegmentForm from '@/components/forms/SegmentForm'

export default function NewSegment() {
  const [message, setMessage] = useState('')

  const handleSubmit = async (data) => {
    try {
      await apiService.createSegment(data)
      setMessage('Segment created successfully!')
    } catch (error) {
      setMessage('Failed to create segment.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Segment</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <SegmentForm onSubmit={handleSubmit} />
    </div>
  )
}