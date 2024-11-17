'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { apiService } from '@/lib/api'

export default function CampaignDetailPage() {
  const router = useRouter()
  const { id } = router.query
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
        <p>Subject: {campaign.subject}</p>
        <p>Content: {campaign.content}</p>
        <p>Segment: {campaign.segmentId}</p>
        <p>Scheduled For: {campaign.scheduledFor}</p>
      </div>
    </div>
  )
}