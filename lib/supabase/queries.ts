import { createClient } from "@/lib/supabase/client"

// ============================================
// Types
// ============================================
export interface CampaignRow {
  id: string
  brand_id: string
  title: string
  description: string
  budget: number
  spend: number
  deadline: string | null
  type: "Paid" | "Barter"
  category: string
  status: "Active" | "Completed" | "Pending" | "Planning"
  created_at: string
}

export interface CollaborationRow {
  id: string
  creator_id: string
  campaign_id: string
  brand_id: string
  type: "Paid" | "Barter"
  compensation: number
  status: "Active" | "Completed" | "Pending" | "Declined"
  start_date: string | null
  end_date: string | null
  posts_per_month: number
  created_at: string
  // Joined fields
  creator_name?: string
  brand_name?: string
  campaign_title?: string
}

export interface PaymentRow {
  id: string
  brand_id: string
  creator_id: string
  campaign_id: string
  amount: number
  status: "Pending" | "Completed" | "Failed"
  date: string
  created_at: string
  // Joined fields
  brand_name?: string
  creator_name?: string
  campaign_title?: string
}

export interface DeliverableRow {
  id: string
  collaboration_id: string
  creator_id: string
  type: string
  filename: string
  url: string
  status: "Pending" | "Approved" | "Rejected"
  uploaded_at: string
  // Joined
  campaign_title?: string
}

export interface FeedbackRow {
  id: string
  from_user_id: string
  to_user_id: string
  campaign_id: string | null
  rating: number
  comment: string
  created_at: string
  // Joined
  from_user_name?: string
  to_user_name?: string
}

export interface CreatorProfile {
  id: string
  name: string
  email: string
  niche: string | null
  followers: number
  rating: number
  social_platform: string | null
  social_handle: string | null
  bio: string
  verified: boolean
}

// ============================================
// Brand Queries
// ============================================

/** Fetch all campaigns for a brand */
export async function getBrandCampaigns(brandId: string): Promise<CampaignRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("brand_id", brandId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching campaigns:", error)
    return []
  }
  return data || []
}

/** Create a new campaign */
export async function createCampaign(campaign: {
  brand_id: string
  title: string
  description?: string
  budget: number
  deadline: string
  type?: "Paid" | "Barter"
  category?: string
  status?: string
}): Promise<CampaignRow | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      brand_id: campaign.brand_id,
      title: campaign.title,
      description: campaign.description || "",
      budget: campaign.budget,
      deadline: campaign.deadline,
      type: campaign.type || "Paid",
      category: campaign.category || "",
      status: campaign.status || "Planning",
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating campaign:", error)
    return null
  }
  return data
}

export async function updateCampaign(campaignId: string, updates: Partial<{
  title: string
  description: string
  budget: number
  deadline: string
  type: "Paid" | "Barter"
  category: string
  status: string
}>): Promise<CampaignRow | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .update(updates)
    .eq("id", campaignId)
    .select()
    .single()

  if (error) {
    console.error("Error updating campaign:", error)
    return null
  }
  return data
}

export async function deleteCampaign(campaignId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from("campaigns")
    .delete()
    .eq("id", campaignId)

  if (error) {
    console.error("Error deleting campaign:", error)
    return false
  }
  return true
}

/** Invite a creator to a campaign */
export async function inviteCreator(brandId: string, creatorId: string, campaignId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from("collaborations")
    .insert({
      brand_id: brandId,
      creator_id: creatorId,
      campaign_id: campaignId,
      status: "Pending",
      compensation: 0, 
      posts_per_month: 1
    })

  if (error) {
    console.error("Error inviting creator:", error)
    return false
  }
  return true
}

/** Apply to a campaign as a creator */
export async function applyToCampaign(params: {
  creatorId: string
  campaignId: string
  brandId: string
  budget: number
  type: "Paid" | "Barter"
}): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from("collaborations")
    .insert({
      brand_id: params.brandId,
      creator_id: params.creatorId,
      campaign_id: params.campaignId,
      status: "Pending",
      compensation: params.budget,
      type: params.type,
      posts_per_month: 1,
      start_date: new Date().toISOString()
    })

  if (error) {
    console.error("Error applying to campaign:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
    return false
  }
  return true
}

/** Update collaboration status */
export async function updateCollaborationStatus(collabId: string, status: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from("collaborations")
    .update({ status })
    .eq("id", collabId)

  if (error) {
    console.error("Error updating collaboration status:", error)
    return false
  }
  return true
}

/** Fetch all creator profiles for discovery */
export async function getCreatorProfiles(): Promise<CreatorProfile[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "creator")
    .order("rating", { ascending: false })

  if (error) {
    console.error("Error fetching creators:", error)
    return []
  }
  return data || []
}

/** Update user profile */
export async function updateUserProfile(userId: string, updates: Record<string, any>): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)

  if (error) {
    console.error("Error updating profile:", error)
    return false
  }
  return true
}

/** Fetch brand's payment records with joined names */
export async function getBrandPayments(brandId: string): Promise<PaymentRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      creator:profiles!payments_creator_id_fkey(name),
      campaign:campaigns!payments_campaign_id_fkey(title)
    `)
    .eq("brand_id", brandId)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching payments:", error)
    return []
  }

  return (data || []).map((p: Record<string, unknown>) => ({
    ...p,
    creator_name: (p.creator as Record<string, string>)?.name || "Unknown",
    campaign_title: (p.campaign as Record<string, string>)?.title || "Unknown",
  })) as PaymentRow[]
}

/** Fetch brand's collaborations with joined names */
export async function getBrandCollaborations(brandId: string): Promise<CollaborationRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("collaborations")
    .select(`
      *,
      creator:profiles!collaborations_creator_id_fkey(name),
      campaign:campaigns!collaborations_campaign_id_fkey(title)
    `)
    .eq("brand_id", brandId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching collaborations:", error)
    return []
  }

  return (data || []).map((c: Record<string, unknown>) => ({
    ...c,
    creator_name: (c.creator as Record<string, string>)?.name || "Unknown",
    campaign_title: (c.campaign as Record<string, string>)?.title || "Unknown",
  })) as CollaborationRow[]
}

// ============================================
// Creator Queries
// ============================================

/** Fetch active/pending campaigns for creators to browse */
export async function getAvailableCampaigns(): Promise<(CampaignRow & { brand_name?: string })[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .select(`
      *,
      brand:profiles!campaigns_brand_id_fkey(name, company)
    `)
    .in("status", ["Active", "Pending"])
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching available campaigns:", error)
    return []
  }

  return (data || []).map((c: Record<string, unknown>) => ({
    ...c,
    brand_name: (c.brand as Record<string, string>)?.company || (c.brand as Record<string, string>)?.name || "Unknown",
  })) as (CampaignRow & { brand_name?: string })[]
}

/** Fetch creator's collaborations with joined names */
export async function getCreatorCollaborations(creatorId: string): Promise<CollaborationRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("collaborations")
    .select(`
      *,
      brand:profiles!collaborations_brand_id_fkey(name, company),
      campaign:campaigns!collaborations_campaign_id_fkey(title)
    `)
    .eq("creator_id", creatorId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching creator collaborations:", error)
    return []
  }

  return (data || []).map((c: Record<string, unknown>) => ({
    ...c,
    brand_name: (c.brand as Record<string, string>)?.company || (c.brand as Record<string, string>)?.name || "Unknown",
    campaign_title: (c.campaign as Record<string, string>)?.title || "Unknown",
  })) as CollaborationRow[]
}

/** Fetch creator's earnings/payments */
export async function getCreatorEarnings(creatorId: string): Promise<PaymentRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      brand:profiles!payments_brand_id_fkey(name, company),
      campaign:campaigns!payments_campaign_id_fkey(title)
    `)
    .eq("creator_id", creatorId)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching earnings:", error)
    return []
  }

  return (data || []).map((p: Record<string, unknown>) => ({
    ...p,
    brand_name: (p.brand as Record<string, string>)?.company || (p.brand as Record<string, string>)?.name || "Unknown",
    campaign_title: (p.campaign as Record<string, string>)?.title || "Unknown",
  })) as PaymentRow[]
}

/** Fetch creator's deliverables */
export async function getCreatorDeliverables(creatorId: string): Promise<DeliverableRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("deliverables")
    .select(`
      *,
      collaboration:collaborations!deliverables_collaboration_id_fkey(
        campaign:campaigns!collaborations_campaign_id_fkey(title)
      )
    `)
    .eq("creator_id", creatorId)
    .order("uploaded_at", { ascending: false })

  if (error) {
    console.error("Error fetching deliverables:", error)
    return []
  }

  return (data || []).map((d: Record<string, unknown>) => {
    const collab = d.collaboration as Record<string, unknown> | null
    const campaign = collab?.campaign as Record<string, string> | null
    return {
      ...d,
      campaign_title: campaign?.title || "Unknown",
    }
  }) as DeliverableRow[]
}

/** Fetch all deliverables for a specific collaboration (for brands) */
export async function getCollaborationDeliverables(collaborationId: string): Promise<DeliverableRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("deliverables")
    .select(`
      *,
      collaboration:collaborations!deliverables_collaboration_id_fkey(
        campaign:campaigns!collaborations_campaign_id_fkey(title)
      )
    `)
    .eq("collaboration_id", collaborationId)
    .order("uploaded_at", { ascending: false })

  if (error) {
    console.error("Error fetching collab deliverables:", error)
    return []
  }

  return (data || []).map((d: Record<string, unknown>) => {
    const collab = d.collaboration as Record<string, unknown> | null
    const campaign = collab?.campaign as Record<string, string> | null
    return {
      ...d,
      campaign_title: campaign?.title || "Unknown",
    }
  }) as DeliverableRow[]
}

/** Submit a new deliverable */
export async function submitDeliverable(deliverable: {
  collaboration_id: string
  creator_id: string
  type: string
  url: string
  filename?: string
}): Promise<DeliverableRow | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("deliverables")
    .insert({
      collaboration_id: deliverable.collaboration_id,
      creator_id: deliverable.creator_id,
      type: deliverable.type,
      url: deliverable.url,
      filename: deliverable.filename || "",
      status: "Pending",
    })
    .select()
    .single()

  if (error) {
    console.error("Error submitting deliverable:", error)
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      hint: error.hint
    })
    return null
  }
  return data
}

/** Upload a file to deliverables bucket and return public URL */
export async function uploadDeliverableFile(file: File, userId: string): Promise<string | null> {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${fileName}`

  // Ensure filePath is just the name within the bucket if bucket name is explicitly separate
  // but let's follow standard folder pattern
  const { data, error } = await supabase.storage
    .from('deliverables')
    .upload(filePath, file)

  if (error) {
    console.error("Error uploading file:", {
      error: error,
      message: error.message
    })
    return null
  }

  // Return the path instead of publicUrl for private bucket security
  return filePath
}

/** Generate a short-lived signed URL for a private file */
export async function getDeliverableSignedUrl(path: string): Promise<string | null> {
  const supabase = createClient()
  
  // If the path starts with http, it's a legacy public link or an external link
  if (path.startsWith('http')) return path

  const { data, error } = await supabase.storage
    .from('deliverables')
    .createSignedUrl(path, 60) // 60 seconds expiration

  if (error) {
    console.error("Error creating signed URL:", error)
    return null
  }

  return data.signedUrl
}

/** Fetch feedback received by a user */
export async function getUserFeedback(userId: string): Promise<FeedbackRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("feedback")
    .select(`
      *,
      from_user:profiles!feedback_from_user_id_fkey(name, company)
    `)
    .eq("to_user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching feedback:", error)
    return []
  }

  return (data || []).map((f: Record<string, unknown>) => ({
    ...f,
    from_user_name: (f.from_user as Record<string, string>)?.company || (f.from_user as Record<string, string>)?.name || "Unknown",
  })) as FeedbackRow[]
}

/** Submit feedback */
export async function submitFeedbackEntry(feedback: {
  from_user_id: string
  to_user_id: string
  campaign_id?: string
  rating: number
  comment: string
}): Promise<FeedbackRow | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("feedback")
    .insert({
      from_user_id: feedback.from_user_id,
      to_user_id: feedback.to_user_id,
      campaign_id: feedback.campaign_id || null,
      rating: feedback.rating,
      comment: feedback.comment,
    })
    .select()
    .single()

  if (error) {
    console.error("Error submitting feedback:", error)
    return null
  }
  return data
}

// ============================================
// Utility: Get current user ID
// ============================================
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id || null
}
/** Invite a creator to a specific campaign (Brand Side) */
export async function inviteCreatorToCampaign(params: {
  creatorId: string
  campaignId: string
  brandId: string
  budget: number
  type: "Paid" | "Barter"
}) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("collaborations")
    .insert({
      creator_id: params.creatorId,
      campaign_id: params.campaignId,
      brand_id: params.brandId,
      compensation: params.budget,
      type: params.type,
      status: "Pending" // Creator will need to accept this
    })
    .select()
    .single()

  if (error) {
    console.error("Error inviting creator:", error)
    return null
  }
  return data
}
