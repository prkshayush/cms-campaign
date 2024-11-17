const backendUrl = process.env.API_BASE_URL;

export const apiService = {
  // Campaigns
  createCampaign: async (data) => {
    const res = await fetch(`${backendUrl}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('Failed to create campaign');
    }
    return res.json();
  },
  
  getAllCampaigns: async () => {
    const res = await fetch(`${backendUrl}/campaigns`);
    if (!res.ok) {
      throw new Error('Failed to fetch campaigns');
    }
    return res.json();
  },

  getCampaignById: async (id) => {
    const res = await fetch(`${backendUrl}/campaigns/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch campaign');
    }
    return res.json();
  },


  updateCampaignMetrics: async (id, data) => {
    const res = await fetch(`${backendUrl}/campaigns/metrics/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('Failed to update campaign metrics');
    }
    return res.json();
  },

  // Segments
  getAllSegments: async () => {
    const res = await fetch(`${backendUrl}/segments`);
    if (!res.ok) {
      throw new Error('Failed to fetch segments');
    }
    return res.json();
  },

  createSegment: async (data) => {
    const res = await fetch(`${backendUrl}/segments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('Failed to create segment');
    }
    return res.json();
  },
};