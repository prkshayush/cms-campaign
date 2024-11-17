'use client'

import { useEffect, useState } from 'react'
import { apiService } from '@/lib/api'
import Link from 'next/link'

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await apiService.getAllCampaigns()
        setCampaigns(data)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Link href="/dashboard/campaigns/new">
          <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create New Campaign
          </p>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {campaigns.map(campaign => (
            <Link key={campaign._id} href={`/dashboard/campaigns/${campaign._id}`}>
              <div className="p-4 bg-white rounded shadow hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold">{campaign.name}</h2>
                <p>{campaign.subject}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}