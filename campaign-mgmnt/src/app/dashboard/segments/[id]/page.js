'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { apiService } from '@/lib/api'

export default function SegmentDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [segment, setSegment] = useState(null)
  const [audience, setAudience] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchSegment = async () => {
        try {
          const segmentData = await apiService.getSegmentById(id)
          setSegment(segmentData)
          const audienceData = await apiService.getSegmentAudience(id)
          setAudience(audienceData)
        } finally {
          setLoading(false)
        }
      }
      fetchSegment()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!segment) {
    return <div>Segment not found</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Segment Details</h1>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold">{segment.name}</h2>
        <p>Logic Operator: {segment.logicOperator}</p>
        <p>Conditions: {JSON.stringify(segment.conditions, null, 2)}</p>
        <p>Audience Count: {segment.audienceCount}</p>
      </div>
      <h2 className="text-xl font-bold mt-6">Audience</h2>
      <div className="grid gap-4">
        {audience.map(customer => (
          <div key={customer._id} className="p-4 bg-white rounded shadow">
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}