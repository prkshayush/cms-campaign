'use client'

import { useState } from 'react'
import { apiService } from '@/lib/api'
import CampaignForm from '@/components/forms/CampaignForm'

export default function NewCampaign() {
  const [message, setMessage] = useState('')

  const handleSubmit = async (data) => {
    try {
      await apiService.createCampaign(data)
      setMessage('Campaign created successfully!')
    } catch (error) {
      setMessage('Failed to create campaign.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <CampaignForm onSubmit={handleSubmit} />
    </div>
  )
}