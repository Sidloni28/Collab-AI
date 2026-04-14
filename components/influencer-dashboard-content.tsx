"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, MoreHorizontal, Upload, Star, Download, MessageSquare, Search, Link as LinkIcon, CheckCircle, AlertCircle, DollarSign, Settings, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  getAvailableCampaigns,
  getCreatorCollaborations,
  getCreatorDeliverables,
  getCreatorEarnings,
  getUserFeedback,
  submitDeliverable,
  uploadDeliverableFile,
  updateCollaborationStatus,
  getDeliverableSignedUrl,
  applyToCampaign,
  updateUserProfile,
  type CampaignRow,
  type CollaborationRow,
  type DeliverableRow,
  type PaymentRow,
  type FeedbackRow,
} from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"
import { format } from "date-fns"
import { jsPDF } from "jspdf"

interface CreatorDashboardContentProps {
  activeTab: string
  userId: string
}

export function CreatorDashboardContent({ activeTab, userId }: CreatorDashboardContentProps) {
  const { setTheme } = useTheme()
  const [creatorName, setCreatorName] = useState<string>("Creator")
  const [socialMedia, setSocialMedia] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Real data states
  const [discoverCampaigns, setDiscoverCampaigns] = useState<(CampaignRow & { brand_name?: string })[]>([])
  const [myCollaborations, setMyCollaborations] = useState<CollaborationRow[]>([])
  const [myDeliverables, setMyDeliverables] = useState<DeliverableRow[]>([])
  const [myEarnings, setMyEarnings] = useState<PaymentRow[]>([])
  const [myFeedback, setMyFeedback] = useState<FeedbackRow[]>([])

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [rating, setRating] = useState(5)
  const [feedbackText, setFeedbackText] = useState("")
  const [collabTypeFilter, setCollabTypeFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [brandSearch, setBrandSearch] = useState("")
  const [deliverableType, setDeliverableType] = useState("")
  const [deliverableLink, setDeliverableLink] = useState("")
  const [selectedCollabId, setSelectedCollabId] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isApplying, setIsApplying] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    social_handle: "",
    bio: ""
  })
  const [isSaving, setIsSaving] = useState(false)

  // Fetch all data
  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const supabase = createClient()
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()
        if (profile) {
          setCreatorName(profile.name)
          setSocialMedia(profile.social_platform || "")
          setEditData({
            name: profile.name || "",
            social_handle: profile.social_handle || "",
            bio: profile.bio || ""
          })
        }

        const [available, collabs, delivs, earnings, feedback] = await Promise.all([
          getAvailableCampaigns(),
          getCreatorCollaborations(userId),
          getCreatorDeliverables(userId),
          getCreatorEarnings(userId),
          getUserFeedback(userId),
        ])

        setDiscoverCampaigns(available)
        setMyCollaborations(collabs)
        setMyDeliverables(delivs)
        setMyEarnings(earnings)
        setMyFeedback(feedback)
      } catch (error) {
        console.error("Error loading creator dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const filteredCampaigns = discoverCampaigns.filter((campaign) => {
    const typeMatch = collabTypeFilter === "All" || campaign.type === collabTypeFilter
    const categoryMatch = categoryFilter === "All" || campaign.category === categoryFilter
    const brandMatch = brandSearch === "" || (campaign.brand_name || "").toLowerCase().includes(brandSearch.toLowerCase())
    return typeMatch && categoryMatch && brandMatch
  })

  // Chart data derived from earnings
  const myEarningsData = myEarnings.length > 0 
    ? myEarnings.map((e, idx) => ({ month: `Pmt ${idx + 1}`, earnings: e.amount }))
    : [
      { month: "Jan", earnings: 2000 },
      { month: "Feb", earnings: 3500 },
      { month: "Mar", earnings: 5000 },
    ]

  const handleUploadDeliverable = async () => {
    if (!selectedCollabId || !deliverableType) {
      alert("Please select a collaboration and deliverable type")
      return
    }

    if (!deliverableLink && !uploadedFile) {
      alert("Please provide either a link or upload a file")
      return
    }

    setIsUploading(true)
    let finalUrl = deliverableLink

    try {
      if (uploadedFile) {
        const uploadedUrl = await uploadDeliverableFile(uploadedFile, userId)
        if (!uploadedUrl) {
          alert("Failed to upload file. Please try again.")
          setIsUploading(false)
          return
        }
        finalUrl = uploadedUrl
      }

      const result = await submitDeliverable({
        collaboration_id: selectedCollabId,
        creator_id: userId,
        type: deliverableType,
        url: finalUrl || "",
        filename: uploadedFile ? uploadedFile.name : `${deliverableType}_Submission`,
      })

      if (result) {
        setMyDeliverables([result, ...myDeliverables])
        setDeliverableLink("")
        setDeliverableType("")
        setSelectedCollabId("")
        setUploadedFile(null)
        setIsUploadOpen(false)
      } else {
        alert("Failed to submit deliverable")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("An error occurred during submission")
    } finally {
      setIsUploading(false)
    }
  }

  const handleUpdateInvite = async (collabId: string, status: "Active" | "Declined") => {
    const success = await updateCollaborationStatus(collabId, status)
    if (success) {
      setMyCollaborations(myCollaborations.map(c => c.id === collabId ? { ...c, status: status as any } : c))
    } else {
      alert("Failed to update status")
    }
  }

  const handleDownloadInvoice = (earning: PaymentRow) => {
    const doc = new jsPDF()
    
    // Add Watermark
    doc.setTextColor(240, 240, 240)
    doc.setFontSize(60)
    doc.text("Collab-AI", 35, 150, { angle: 45 })
    
    // Standard text
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(22)
    doc.text("INVOICE", 20, 30)
    
    doc.setFontSize(12)
    doc.text(`Brand: ${earning.brand_name}`, 20, 50)
    doc.text(`Campaign: ${earning.campaign_title}`, 20, 60)
    doc.text(`Amount: Rs ${earning.amount.toLocaleString()}`, 20, 70)
    doc.text(`Date: ${format(new Date(earning.date), "MMM d, yyyy")}`, 20, 80)
    doc.text(`Status: ${earning.status}`, 20, 90)
    doc.text(`Invoice ID: INV-PAY-${earning.id.slice(0, 8)}`, 20, 100)
    
    doc.save(`Invoice_${earning.brand_name}_${earning.date}.pdf`)
  }

  const handleViewDeliverable = async (path: string) => {
    const signedUrl = await getDeliverableSignedUrl(path)
    if (signedUrl) {
      window.open(signedUrl, '_blank')
    } else {
      alert("Error accessing file. Please try again.")
    }
  }

  const handleFeedbackSubmit = () => {
    alert("Feedback submitted successfully!")
    setIsFeedbackOpen(false)
    setFeedbackText("")
  }

  const handleSubmitFeedback = handleFeedbackSubmit

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleApplyCampaign = async (campaign: CampaignRow & { brand_name?: string }) => {
    if (!userId) return

    // Check if already applied
    const alreadyApplied = myCollaborations.some(c => c.campaign_id === campaign.id)
    if (alreadyApplied) {
      alert("You have already applied for this campaign!")
      return
    }

    setIsApplying(campaign.id)
    try {
      const success = await applyToCampaign({
        creatorId: userId,
        campaignId: campaign.id,
        brandId: campaign.brand_id,
        budget: campaign.budget,
        type: campaign.type as "Paid" | "Barter"
      })

      if (success) {
        // Refresh collaborations
        const updatedCollabs = await getCreatorCollaborations(userId)
        setMyCollaborations(updatedCollabs)
        alert("Application submitted successfully!")
      } else {
        alert("Failed to submit application. Please try again.")
      }
    } catch (error) {
      console.error("Apply error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsApplying(null)
    }
  }

  const handleSaveProfile = async () => {
    if (!userId) return
    setIsSaving(true)
    try {
      const success = await updateUserProfile(userId, {
        name: editData.name,
        social_handle: editData.social_handle.replace("@", ""),
        bio: editData.bio
      })

      if (success) {
        setCreatorName(editData.name)
        setIsEditing(false)
        alert("Profile updated successfully!")
      } else {
        alert("Failed to update profile.")
      }
    } catch (error) {
      console.error("Save profile error:", error)
      alert("An error occurred while saving.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      {/* Top Bar */}
      <div className="border-b border-border bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl font-bold">Creator Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 overflow-auto">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Hello {creatorName}! 👋</h2>
              <p className="text-muted-foreground">Welcome to Collab AI. Here's your dashboard overview.</p>
              {socialMedia && <p className="text-sm text-muted-foreground mt-2">Connected Platform: <span className="font-semibold">{socialMedia}</span></p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <p className="text-sm text-green-600 font-medium mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-green-900">₹{myEarnings.filter(e => e.status === "Completed").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <p className="text-sm text-blue-600 font-medium mb-1">Active Collabs</p>
                <p className="text-3xl font-bold text-blue-900">{myCollaborations.filter(c => c.status === "Active").length}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <p className="text-sm text-amber-600 font-medium mb-1">Pending Clearance</p>
                <p className="text-3xl font-bold text-amber-900">₹{myEarnings.filter(e => e.status === "Pending").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <p className="text-sm text-purple-600 font-medium mb-1">Feedback Rating</p>
                <p className="text-3xl font-bold text-purple-900">{myFeedback.length > 0 ? (myFeedback.reduce((sum, f) => sum + f.rating, 0) / myFeedback.length).toFixed(1) : "5.0"}/5</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Earnings Overview</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={myEarningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* Active Collabs Tab */}
        {activeTab === "collabs" && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Compensation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myCollaborations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No active collaborations. Check the Campaigns tab to apply!
                    </TableCell>
                  </TableRow>
                ) : (
                  myCollaborations.map((collab) => (
                    <TableRow key={collab.id}>
                      <TableCell className="font-medium text-blue-600">{collab.brand_name}</TableCell>
                      <TableCell>{collab.campaign_title}</TableCell>
                      <TableCell>{collab.type}</TableCell>
                      <TableCell>
                        {collab.status === "Pending" ? (
                          <div className="flex gap-2">
                            <Button size="sm" className="h-6 text-xs bg-green-600 hover:bg-green-700" onClick={() => handleUpdateInvite(collab.id, "Active")}>Accept</Button>
                            <Button size="sm" variant="destructive" className="h-6 text-xs" onClick={() => handleUpdateInvite(collab.id, "Declined")}>Decline</Button>
                          </div>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            collab.status === "Active" ? "bg-green-100 text-green-800" : 
                            collab.status === "Declined" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {collab.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{collab.start_date ? format(new Date(collab.start_date), "MMM d, yyyy") : "Not started"}</TableCell>
                      <TableCell>{collab.end_date ? format(new Date(collab.end_date), "MMM d, yyyy") : "No deadline"}</TableCell>
                      <TableCell className="font-medium">₹{collab.compensation.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Find & Connect Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2">
                <label className="text-sm font-medium block mb-2">Search Brands</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Find brands..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Type</label>
                <select
                  value={collabTypeFilter}
                  onChange={(e) => setCollabTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                >
                  <option value="All">All Types</option>
                  <option value="Paid">Paid</option>
                  <option value="Barter">Barter</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                >
                  <option value="All">All Categories</option>
                  <option value="Product Marketing">Marketing</option>
                  <option value="Video Shoot">Video</option>
                  <option value="Content Creation">Content</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCampaigns.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No campaigns found matching your criteria.
                </div>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="p-4 flex flex-col hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold mb-2">{campaign.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{campaign.brand_name || "Unknown Brand"}</p>
                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">{campaign.type}</span>
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-bold uppercase">{campaign.category}</span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Budget:</span> ₹{campaign.budget.toLocaleString()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Deadline:</span> {campaign.deadline || "TBA"}
                      </p>
                    </div>
                    {myCollaborations.find(c => c.campaign_id === campaign.id) ? (
                      (() => {
                        const collab = myCollaborations.find(c => c.campaign_id === campaign.id);
                        if (collab?.status === "Active") {
                          return (
                            <Button className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100" disabled>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accepted
                            </Button>
                          );
                        } else if (collab?.status === "Declined") {
                          return (
                            <Button className="w-full bg-red-50 text-red-700 border-red-200 hover:bg-red-100" disabled>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Not Accepted
                            </Button>
                          );
                        } else {
                          return (
                            <Button className="w-full bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" disabled>
                              <Clock className="w-4 h-4 mr-2" />
                              Pending Approval
                            </Button>
                          );
                        }
                      })()
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => handleApplyCampaign(campaign)}
                        disabled={isApplying === campaign.id}
                      >
                        {isApplying === campaign.id ? "Applying..." : "Apply Now"}
                      </Button>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

            {/* Deliverables Tab */}
      {activeTab === "deliverables" && (
        <div className="flex-1 p-6 overflow-auto space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Deliverables</h3>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Deliverable
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Deliverable</DialogTitle>
                  <DialogDescription>Submit your content deliverable for a campaign</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Select Collaboration *</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      value={selectedCollabId}
                      onChange={(e) => setSelectedCollabId(e.target.value)}
                    >
                      <option value="">Select collaboration...</option>
                      {myCollaborations.map(c => (
                        <option key={c.id} value={c.id}>{c.brand_name} - {c.campaign_title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Deliverable Type *</label>
                    <select 
                      value={deliverableType}
                      onChange={(e) => setDeliverableType(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                    >
                      <option value="">Select type...</option>
                      <option value="Reel">Reel</option>
                      <option value="Post">Post</option>
                      <option value="Carousel">Carousel</option>
                      <option value="Video">Video</option>
                      <option value="Story">Story</option>
                      <option value="Blog Post">Blog Post</option>
                      <option value="TikTok">TikTok</option>
                      <option value="YouTube Video">YouTube Video</option>
                      <option value="Twitter Thread">Twitter Thread</option>
                      <option value="Article">Article</option>
                    </select>
                  </div>
                  
                  <div className="border-t pt-4">
                    <label className="text-sm font-medium block mb-3 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Deliverable Link or URL (Optional if uploading file)
                    </label>
                    <Input
                      type="url"
                      placeholder="https://instagram.com/example..."
                      value={deliverableLink}
                      onChange={(e) => setDeliverableLink(e.target.value)}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Paste the link to your deliverable (Instagram, YouTube, TikTok, etc.)</p>
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium block mb-2">Or Upload File (Image or Video)</label>
                    <Input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                    />
                    {uploadedFile && <p className="text-xs text-muted-foreground mt-2">File: {uploadedFile.name}</p>}
                  </div>
                </div>
                <DialogFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    setIsUploadOpen(false)
                    setDeliverableType("")
                    setDeliverableLink("")
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleUploadDeliverable} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Submit"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

            <div className="space-y-4">
              {myDeliverables.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground italic">
                  No deliverables submitted yet.
                </Card>
              ) : (
                myDeliverables.map((deliverable) => (
                  <Card key={deliverable.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{deliverable.campaign_title}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                            {deliverable.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                            deliverable.status === "Approved" ? "bg-green-100 text-green-800" :
                            deliverable.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {deliverable.status}
                          </span>
                          <span className="text-xs text-muted-foreground">Uploaded: {new Date(deliverable.uploaded_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDeliverable(deliverable.url)}
                        className="flex items-center gap-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20 transition"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        View
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <p className="text-sm text-green-600 font-medium mb-1">Total Paid</p>
                <p className="text-3xl font-bold text-green-900">₹{myEarnings.filter(e => e.status === "Completed").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <p className="text-sm text-blue-600 font-medium mb-1">Pending Clearance</p>
                <p className="text-3xl font-bold text-blue-900">₹{myEarnings.filter(e => e.status === "Pending").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <p className="text-sm text-purple-600 font-medium mb-1">Total Transactions</p>
                <p className="text-3xl font-bold text-purple-900">{myEarnings.length}</p>
              </Card>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Payment History</h3>
              {myEarnings.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center">No earnings recorded yet.</p>
              ) : (
                myEarnings.map((earning) => (
                  <Card key={earning.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{earning.brand_name}</h4>
                          <p className="text-sm text-muted-foreground">{earning.campaign_title}</p>
                          <p className="text-[10px] text-muted-foreground">{earning.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold">₹{earning.amount.toLocaleString()}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            earning.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {earning.status}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(earning)}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="space-y-4">
            <div className="mb-6">
              <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Give Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Brand Feedback</DialogTitle>
                    <DialogDescription>Share your experience with a brand</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Select Brand</label>
                      <select 
                        value={selectedBrand} 
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      >
                        <option value="">Select brand...</option>
                        {myCollaborations.map(c => (
                          <option key={c.id} value={c.brand_name}>{c.brand_name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Comment</label>
                      <textarea
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                        rows={4}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsFeedbackOpen(false)}>Cancel</Button>
                    <Button onClick={handleFeedbackSubmit}>Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {myFeedback.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 italic">No reviews received yet.</p>
              ) : (
                myFeedback.map((f) => (
                  <Card key={f.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{f.from_user_name}</h4>
                        <p className="text-xs text-muted-foreground">{new Date(f.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < f.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm italic">"{f.comment}"</p>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-4xl ml-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Settings</h3>
              <p className="text-muted-foreground">Manage your account preferences and application theme</p>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Account Information</h4>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  {isEditing ? (
                    <Input 
                      value={editData.name} 
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      placeholder="Your Name"
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-lg text-sm">{creatorName}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram Handle</label>
                  {isEditing ? (
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">@</span>
                      <Input 
                        className="pl-7"
                        value={editData.social_handle} 
                        onChange={(e) => setEditData({...editData, social_handle: e.target.value})}
                        placeholder="yourhandle"
                      />
                    </div>
                  ) : (
                    <div className="p-2 bg-muted rounded-lg text-sm flex items-center gap-2">
                      <span className="text-muted-foreground">@</span>
                      {editData.social_handle}
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Professional Bio</label>
                  {isEditing ? (
                    <textarea 
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm min-h-[100px]"
                      value={editData.bio} 
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      placeholder="Tell brands about yourself..."
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-sm min-h-[80px]">
                      {editData.bio || <span className="text-muted-foreground italic">No bio added yet. Click edit to add one!</span>}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Role</label>
                  <div className="p-2 bg-muted/50 rounded-lg text-sm font-medium opacity-70">Creator</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Settings className="w-5 h-5" />
                <h4 className="text-lg font-semibold">Appearance</h4>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Application Theme</p>
                    <p className="text-sm text-muted-foreground">Select how you want Collab AI to look</p>
                  </div>
                  <div className="flex bg-muted p-1 rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-md"
                      onClick={() => setTheme("light")}
                    >
                      Light
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-md"
                      onClick={() => setTheme("dark")}
                    >
                      Dark
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-md"
                      onClick={() => setTheme("system")}
                    >
                      System
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
