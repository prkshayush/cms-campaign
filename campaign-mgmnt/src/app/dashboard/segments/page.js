'use client'

import { useEffect, useState } from 'react'
import { apiService } from '@/lib/api'
import Link from 'next/link'

export default function SegmentsPage() {
  const [segments, setSegments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const data = await apiService.getAllSegments()
        setSegments(data)
      } finally {
        setLoading(false)
      }
    }
    fetchSegments()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Segments</h1>
        <Link href="/dashboard/segments/new">
          <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create New Segment
          </p>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {segments.map(segment => (
            <Link key={segment._id} href={`/dashboard/segments/${segment._id}`}>
              <div className="p-4 bg-white rounded shadow hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold">{segment.name}</h2>
                <p>Audience Count: {segment.audienceCount}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}