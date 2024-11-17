'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { apiService } from '@/lib/api'

export default function CampaignDetailPage() {
  const params = useParams()
  const id = params.id
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchCampaign = async () => {
        try {
          const data = await apiService.getCampaignById(id)
          setCampaign(data)
        } finally {
          setLoading(false)
        }
      }
      fetchCampaign()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!campaign) {
    return <div>Campaign not found</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Campaign Details</h1>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold">{campaign.name}</h2>
        <p className="mt-2 text-gray-600">
          Status: {campaign.status ? (
            <span className="font-medium text-gray-900">{campaign.status}</span>
          ) : (
            <span className="italic text-gray-400">None</span>
          )}
        </p>
        <p className="mt-2 text-gray-600">
          Segment: {campaign.segmentId ? (
            <span className="font-medium text-gray-900">{campaign.segmentId}</span>
          ) : (
            <span className="italic text-gray-400">None</span>
          )}
        </p>
        <p className="mt-2 text-gray-600">
          Scheduled For: {campaign.scheduledFor ? (
            <span className="font-medium text-gray-900">{campaign.scheduledFor}</span>
          ) : (
            <span className="italic text-gray-400">None</span>
          )}
        </p>
      </div>
    </div>
  )
}