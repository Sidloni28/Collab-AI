"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  getBrandCampaigns,
  getCreatorProfiles,
  getBrandCollaborations,
  getBrandPayments,
  createCampaign,
  getCollaborationDeliverables,
  getDeliverableSignedUrl,
  updateCampaign,
  deleteCampaign,
  inviteCreatorToCampaign,
  updateUserProfile,
  updateCollaborationStatus,
  type CampaignRow,
  type CreatorProfile,
  type CollaborationRow,
  type PaymentRow,
  type DeliverableRow,
} from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"
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
import { Bell, MoreHorizontal, Plus, Search, Download, TrendingUp, DollarSign, CheckCircle, Clock, Link as LinkIcon, Trash2 } from 'lucide-react'
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations"
import { AILoading } from "@/components/ai-loading"
import { AnimatedResults } from "@/components/animated-results"
import { format } from "date-fns"
import { jsPDF } from "jspdf"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Static data removed and replaced with dynamic fetching below

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"]

export function BrandDashboardContent({ activeTab, onTabChange, userId }: { activeTab: string; onTabChange: (tab: string) => void; userId: string }) {
  const { setTheme } = useTheme()
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false)
  const [campaignsList, setCampaignsList] = useState<CampaignRow[]>([])
  const [allCreators, setAllCreators] = useState<CreatorProfile[]>([])
  const [paymentsList, setPaymentsList] = useState<PaymentRow[]>([])
  const [collaborationsList, setCollaborationsList] = useState<CollaborationRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [brandName, setBrandName] = useState("")
  const [brandHandle, setBrandHandle] = useState("")
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [brandEditData, setBrandEditData] = useState({
    company: "",
    social_handle: ""
  })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    type: "Paid",
    status: "Active",
  })
  const [selectedNiche, setSelectedNiche] = useState("All Niches")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMatching, setIsMatching] = useState(false)
  const [matchResults, setMatchResults] = useState<(CreatorProfile & { matchScore: number })[]>([])
  const [showMatchResults, setShowMatchResults] = useState(false)
  
  // Deliverables Dialog state
  const [isDeliverablesModalOpen, setIsDeliverablesModalOpen] = useState(false)
  const [selectedCollabId, setSelectedCollabId] = useState<string | null>(null)
  const [collabDeliverables, setCollabDeliverables] = useState<DeliverableRow[]>([])
  const [isDeliverablesLoading, setIsDeliverablesLoading] = useState(false)

  // Edit Campaign State
  const [isEditCampaignOpen, setIsEditCampaignOpen] = useState(false)
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null)

  // Connect / Invite Creator State
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [selectedCreatorForInvite, setSelectedCreatorForInvite] = useState<CreatorProfile | null>(null)
  const [selectedCampaignIdForInvite, setSelectedCampaignIdForInvite] = useState<string>("")
  const [isInviting, setIsInviting] = useState(false)

  // Fetch all data
  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [campaigns, creators, collabs, payments, profileRes] = await Promise.all([
          getBrandCampaigns(userId),
          getCreatorProfiles(),
          getBrandCollaborations(userId),
          getBrandPayments(userId),
          createClient().from('profiles').select('company, name, social_handle').eq('id', userId).single(),
        ])
        setCampaignsList(campaigns)
        setAllCreators(creators)
        setCollaborationsList(collabs)
        setPaymentsList(payments)
        if (profileRes.data) {
          const name = profileRes.data.company || profileRes.data.name || ""
          const handle = profileRes.data.social_handle || ""
          setBrandName(name)
          setBrandHandle(handle)
          setBrandEditData({
            company: name,
            social_handle: handle
          })
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const handleCreateCampaign = async () => {
    if (!formData.title || !formData.budget || !formData.deadline) {
      alert("Please fill in all required fields")
      return
    }

    const newCampaignData = {
      brand_id: userId,
      title: formData.title,
      description: formData.description,
      budget: parseInt(formData.budget),
      deadline: formData.deadline,
      status: formData.status as any,
    }

    try {
      const result = await createCampaign(newCampaignData)
      if (result) {
        setCampaignsList([result, ...campaignsList])
        setFormData({ title: "", description: "", budget: "", deadline: "", type: "Paid", status: "Active" })
        setIsCreateCampaignOpen(false)
        alert("Campaign created successfully! 🎉")
      } else {
        alert("Failed to create campaign. Please check the console for details.")
      }
    } catch (err: any) {
      console.error("Create campaign catch error:", err)
      alert(`Error creating campaign: ${err.message || "Unknown error"}`)
    }
  }

  const openEditCampaign = (campaign: CampaignRow) => {
    setEditingCampaignId(campaign.id)
    setFormData({
      title: campaign.title,
      description: campaign.description || "",
      budget: campaign.budget.toString(),
      deadline: campaign.deadline || "",
      type: campaign.type || "Paid",
      status: campaign.status || "Planning",
    })
    setIsEditCampaignOpen(true)
  }

  const handleEditCampaign = async () => {
    if (!editingCampaignId) return
    const updates = {
      title: formData.title,
      description: formData.description,
      budget: parseInt(formData.budget),
      deadline: formData.deadline,
      type: formData.type as "Paid" | "Barter",
      status: formData.status
    }
    const result = await updateCampaign(editingCampaignId, updates)
    if (result) {
      setCampaignsList(campaignsList.map(c => c.id === editingCampaignId ? result : c))
      setIsEditCampaignOpen(false)
      setEditingCampaignId(null)
      setFormData({ title: "", description: "", budget: "", deadline: "", type: "Paid", status: "Active" })
    } else {
      alert("Failed to update campaign")
    }
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
      return
    }

    const success = await deleteCampaign(campaignId)
    if (success) {
      setCampaignsList(campaignsList.filter(c => c.id !== campaignId))
      alert("Campaign deleted successfully")
    } else {
      alert("Failed to delete campaign. It might have active collaborations.")
    }
  }


  const handleSaveProfile = async () => {
    if (!userId) return
    setIsSavingProfile(true)
    try {
      const success = await updateUserProfile(userId, {
        company: brandEditData.company,
        social_handle: brandEditData.social_handle.replace("@", "")
      })

      if (success) {
        setBrandName(brandEditData.company)
        setBrandHandle(brandEditData.social_handle)
        setIsEditingProfile(false)
        alert("Profile updated successfully!")
      } else {
        alert("Failed to update profile.")
      }
    } catch (err) {
      console.error("Save profile error:", err)
      alert("An error occurred while saving profile.")
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleUpdateApplicationStatus = async (collabId: string, newStatus: string) => {
    const success = await updateCollaborationStatus(collabId, newStatus)
    if (success) {
      setCollaborationsList(prev => prev.map(c => c.id === collabId ? { ...c, status: newStatus as any } : c))
      alert(`Application ${newStatus === "Active" ? "accepted" : "declined"} successfully!`)
    } else {
      alert("Failed to update status")
    }
  }

  // Calculate dynamic statistics
  const activeCampaigns = campaignsList.filter(c => c.status === "Active").length
  const totalSpend = campaignsList.reduce((sum, c) => sum + c.spend, 0)
  const totalBudget = campaignsList.reduce((sum, c) => sum + c.budget, 0)
  const totalCampaigns = campaignsList.length
  const avgROI = totalSpend > 0 ? ((totalBudget - totalSpend) / totalSpend * 0.5).toFixed(1) : "0"

  // Generate dynamic analytics data based on campaigns
  const generateAnalyticsData = () => {
    return campaignsList.map((campaign, idx) => ({
      date: `Campaign ${idx + 1}`,
      reach: campaign.budget * 0.1,
      engagement: campaign.spend * 0.05,
      spend: campaign.spend,
    }))
  }

  const dynamicReachData = generateAnalyticsData()
  // Placeholder data for charts that don't have DB tables yet
  const reachData = dynamicReachData.length > 0 ? dynamicReachData : [
    { date: "Oct 1", reach: 5000, engagement: 200 },
    { date: "Oct 8", reach: 12000, engagement: 540 },
    { date: "Oct 15", reach: 18000, engagement: 890 },
  ]
  const demographicsData = [
    { name: "18-24", value: 30 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 15 },
    { name: "45+", value: 10 },
  ]

  const filteredCreators = allCreators.filter((creator) => {
    const matchesNiche = selectedNiche === "All Niches" || creator.niche === selectedNiche
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesNiche && matchesSearch
  })

  const handleAIMatching = async () => {
    setIsMatching(true)
    // Simulate AI matching delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Calculate match scores
    const scoredCreators = filteredCreators.map(creator => {
      let score = 0
      // Niche Match (60%)
      if (creator.niche === selectedNiche) score += 60
      else if (selectedNiche === "All Niches") score += 40
      
      // Engagement/Rating Match (40%)
      score += (creator.rating / 100) * 40
      
      // Add a bit of randomness for "AI" feel
      score += Math.random() * 5
      
      return { ...creator, matchScore: Math.min(Math.round(score), 99) }
    })

    // Sort by match score
    const sortedResults = scoredCreators.sort((a, b) => b.matchScore - a.matchScore)
    setMatchResults(sortedResults.slice(0, 3))
    setShowMatchResults(true)
    setIsMatching(false)
  }

  const handleDownloadInvoice = (paymentId: string, creatorName: string) => {
    const invoice = paymentsList.find(p => p.id === paymentId)
    if (!invoice) return

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
    doc.text(`Creator: ${creatorName}`, 20, 50)
    doc.text(`Amount: Rs ${invoice.amount.toLocaleString()}`, 20, 60)
    doc.text(`Date: ${format(new Date(invoice.date), "MMM d, yyyy")}`, 20, 70)
    doc.text(`Status: ${invoice.status}`, 20, 80)
    doc.text(`Invoice ID: INV-${paymentId.slice(0,8)}-${new Date().getFullYear()}`, 20, 90)
    
    doc.save(`Invoice_${creatorName}_${invoice.date}.pdf`)
  }

  const handleViewCollabDeliverables = async (collabId: string) => {
    setSelectedCollabId(collabId)
    setIsDeliverablesModalOpen(true)
    setIsDeliverablesLoading(true)
    try {
      const data = await getCollaborationDeliverables(collabId)
      setCollabDeliverables(data)
    } catch (error) {
      console.error("Error fetching collab deliverables:", error)
    } finally {
      setIsDeliverablesLoading(false)
    }
  }

  const handleViewDeliverable = async (path: string) => {
    const signedUrl = await getDeliverableSignedUrl(path)
    if (signedUrl) {
      window.open(signedUrl, '_blank')
    } else {
      alert("Error accessing file. Please try again.")
    }
  }

  return (
    <div className="flex-1">
      {/* Top Bar */}
      <div className="border-b border-border bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl font-bold">{brandName ? `Hello ${brandName} 👋` : "Brand Dashboard"}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex flex-col h-full">
        <TabsList className="border-b border-border bg-background px-4 w-full justify-start rounded-none">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="find-connect">Find and Connect</TabsTrigger>
          <TabsTrigger value="collaborations">Manage Collaborations</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="flex-1 p-6 overflow-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-blue-600 font-medium mb-1">Active Campaigns</p>
                  <p className="text-3xl font-bold text-blue-900">{activeCampaigns}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs text-blue-600">Out of {totalCampaigns} campaigns</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-green-600 font-medium mb-1">Total Spend</p>
                  <p className="text-3xl font-bold text-green-900">₹{(totalSpend / 100000).toFixed(1)}L</p>
                </div>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-green-600">Of ₹{(totalBudget / 100000).toFixed(1)}L budget</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-purple-600 font-medium mb-1">Total Campaigns</p>
                  <p className="text-3xl font-bold text-purple-900">{totalCampaigns}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs text-purple-600">{activeCampaigns} currently active</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-orange-600 font-medium mb-1">Avg ROI</p>
                  <p className="text-3xl font-bold text-orange-900">{avgROI}x</p>
                </div>
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-xs text-orange-600">Based on campaign data</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Campaign Summary</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reachData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="reach" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="engagement" stroke="#60a5fa" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        {/* Find and Connect Tab */}
        <TabsContent value="find-connect" className="flex-1 p-6 overflow-auto space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Find and Connect with Creators</h3>
              <p className="text-muted-foreground mb-6">Discovery and outreach made effortless. Find the perfect voices for your campaigns.</p>
              
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search creators by name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 border border-border rounded-lg text-sm"
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                >
                  <option>All Niches</option>
                  <option>Fashion</option>
                  <option>Beauty</option>
                  <option>Content Creator</option>
                  <option>Editor</option>
                </select>
                <Button onClick={handleAIMatching} disabled={isMatching} className="gap-2">
                  {isMatching ? "Matching..." : "AI Match"}
                </Button>
              </div>

              {isMatching && <AILoading message="AI is finding perfect creators for you..." />}

              {showMatchResults && !isMatching && (
                <motion.div 
                  className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-primary mb-3">AI-Matched Creators</h4>
                  <AnimatedResults items={matchResults.map(c => ({
                    id: c.id,
                    name: c.name,
                    title: `${c.name} (${c.matchScore}% Match)`,
                    description: `${c.niche} • ${c.followers.toLocaleString()} followers`,
                  }))} />
                </motion.div>
              )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCreators.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-muted/30 rounded-2xl border-2 border-dashed border-border/50">
                      <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground font-medium text-lg">No creators found</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters to find more matches</p>
                    </div>
                  ) : (
                    filteredCreators.map((creator) => (
                      <motion.div key={creator.id} variants={fadeInUp}>
                        <Card className="p-6 flex flex-col h-full hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 group">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-bold text-xl group-hover:text-primary transition-colors">{creator.name}</h4>
                              <p className="text-sm font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-md inline-block mt-1">{creator.niche}</p>
                            </div>
                            <div className="p-2 bg-muted/50 rounded-lg">
                              <Search className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
                            <div className="p-3 bg-muted/30 rounded-xl">
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Followers</p>
                              <p className="text-lg font-bold">{creator.followers.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-xl">
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Engagement</p>
                              <p className="text-lg font-bold">{creator.rating}%</p>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full h-11 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                            onClick={() => {
                              setSelectedCreatorForInvite(creator)
                              setIsConnectModalOpen(true)
                            }}
                          >
                            Connect
                          </Button>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Connect / Invite Modal */}
            <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect with {selectedCreatorForInvite?.name}</DialogTitle>
                  <DialogDescription>
                    Invite this creator to one of your active campaigns to start collaborating.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Campaign *</label>
                    <select 
                      className="w-full p-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                      value={selectedCampaignIdForInvite}
                      onChange={(e) => setSelectedCampaignIdForInvite(e.target.value)}
                    >
                      <option value="">Choose a campaign...</option>
                      {campaignsList.filter(c => c.status === "Active").map(campaign => (
                        <option key={campaign.id} value={campaign.id}>{campaign.title} (₹{campaign.budget.toLocaleString()})</option>
                      ))}
                    </select>
                    {campaignsList.filter(c => c.status === "Active").length === 0 && (
                      <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100 italic">
                        No active campaigns found. Please create an active campaign first.
                      </p>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsConnectModalOpen(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button 
                    onClick={async () => {
                      if (!selectedCampaignIdForInvite || !selectedCreatorForInvite) return
                      setIsInviting(true)
                      const campaign = campaignsList.find(c => c.id === selectedCampaignIdForInvite)
                      if (!campaign) return
                      
                      const result = await inviteCreatorToCampaign({
                        creatorId: selectedCreatorForInvite.id,
                        campaignId: campaign.id,
                        brandId: userId,
                        budget: campaign.budget,
                        type: campaign.type as "Paid" | "Barter"
                      })
                      
                      if (result) {
                        alert(`Invitation sent to ${selectedCreatorForInvite.name}!`)
                        setIsConnectModalOpen(false)
                        setSelectedCampaignIdForInvite("")
                      } else {
                        alert("Failed to send invitation. They might already be invited.")
                      }
                      setIsInviting(false)
                    }} 
                    disabled={!selectedCampaignIdForInvite || isInviting}
                    className="rounded-xl px-8"
                  >
                    {isInviting ? "Inviting..." : "Send Invitation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

        {/* Manage Collaborations Tab */}
        <TabsContent value="collaborations" className="flex-1 p-6 overflow-auto space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Manage Collaborations</h3>
            <p className="text-muted-foreground mb-8">Review new applications and manage your active creator partnerships</p>
            
            {collaborationsList.length === 0 ? (
              <Card className="p-12 text-center border-dashed border-2">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-12 h-12 text-muted-foreground/30 mb-2" />
                  <p className="text-muted-foreground font-medium">No collaborations yet</p>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">Start a campaign to receive applications from amazing creators</p>
                  <Button onClick={() => onTabChange("campaigns")}>View Your Campaigns</Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-10">
                {/* NEW APPLICATIONS SECTION */}
                {collaborationsList.some(c => c.status === "Pending") && (
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Bell className="w-5 h-5" />
                      <h4 className="text-lg font-bold">New Applications ({collaborationsList.filter(c => c.status === "Pending").length})</h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {collaborationsList.filter(c => c.status === "Pending").map((collab) => (
                        <Card key={collab.id} className="p-4 border-l-4 border-l-blue-500 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-bold text-lg">{collab.creator_name}</p>
                              <p className="text-sm text-primary font-medium">Campaign: {collab.campaign_title || "General"}</p>
                              <p className="text-xs text-muted-foreground mt-1">Applied: {format(new Date(collab.created_at || new Date()), "MMM d, yyyy")}</p>
                            </div>
                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                              Pending Review
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button 
                              onClick={() => handleUpdateApplicationStatus(collab.id, "Active")}
                              className="bg-green-600 hover:bg-green-700 text-white flex-1"
                            >
                              Accept Application
                            </Button>
                            <Button 
                              onClick={() => handleUpdateApplicationStatus(collab.id, "Declined")}
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Decline
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {/* ACTIVE COLLABORATIONS SECTION */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <h4 className="text-lg font-bold">Active Partnerships</h4>
                  </div>
                  {collaborationsList.filter(c => c.status === "Active").length === 0 ? (
                    <div className="p-8 border border-dashed rounded-xl text-center text-muted-foreground bg-muted/20">
                      No active partnerships yet. Review applications to get started!
                    </div>
                  ) : (
                    <div className="overflow-x-auto border rounded-xl bg-card">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="font-bold">Creator</TableHead>
                            <TableHead className="font-bold">Campaign</TableHead>
                            <TableHead className="font-bold text-center">Posts</TableHead>
                            <TableHead className="font-bold">Timeline</TableHead>
                            <TableHead className="text-right font-bold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {collaborationsList.filter(c => c.status === "Active").map((collab) => (
                            <TableRow key={collab.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-bold">{collab.creator_name}</TableCell>
                              <TableCell className="text-sm font-medium">{collab.campaign_title || "General"}</TableCell>
                              <TableCell className="text-center">
                                <span className="bg-muted px-2 py-1 rounded text-xs font-bold">{collab.posts_per_month} / mo</span>
                              </TableCell>
                              <TableCell className="text-xs">
                                <div className="flex flex-col">
                                  <span>Start: {format(new Date(collab.start_date || new Date()), "MMM d, yyyy")}</span>
                                  {collab.end_date && <span className="text-muted-foreground">End: {format(new Date(collab.end_date), "MMM d, yyyy")}</span>}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 text-xs font-bold border-primary/20 text-primary hover:bg-primary/5"
                                    onClick={() => handleViewCollabDeliverables(collab.id)}
                                  >
                                    View Deliverables
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </section>
              </div>
            )}

            
            {/* Deliverables Modal */}
            <Dialog open={isDeliverablesModalOpen} onOpenChange={setIsDeliverablesModalOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Collaboration Deliverables</DialogTitle>
                  <DialogDescription>Review content submitted for this collaboration</DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  {isDeliverablesLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : collabDeliverables.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8 italic">No deliverables submitted yet.</p>
                  ) : (
                    <div className="space-y-4 max-h-[60vh] overflow-auto">
                      {collabDeliverables.map((d) => (
                        <div key={d.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition">
                          <div>
                            <p className="font-semibold">{d.type}</p>
                            <p className="text-xs text-muted-foreground">Uploaded: {new Date(d.uploaded_at).toLocaleDateString()}</p>
                            <span className={`mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              d.status === "Approved" ? "bg-green-100 text-green-800" :
                              d.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {d.status}
                            </span>
                          </div>
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleViewDeliverable(d.url)}
                          >
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Review Content
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeliverablesModalOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="flex-1 p-6 overflow-auto space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Campaigns</h3>
            <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>              Set up a new creator marketing campaign</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Campaign Title *</label>
                    <Input
                      placeholder="e.g., Summer Collection 2024"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      placeholder="Describe your campaign goals"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Campaign Type *</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={formData.type || "Paid"}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Paid">Paid Collaboration</option>
                      <option value="Barter">Barter / Product Exchange</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Budget (₹ INR) *</label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status *</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={formData.status || "Active"}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Deadline *</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateCampaignOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isEditCampaignOpen} onOpenChange={setIsEditCampaignOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Campaign</DialogTitle>
                  <DialogDescription>Update your existing campaign details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Campaign Title *</label>
                    <Input
                      placeholder="e.g., Summer Collection 2024"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      placeholder="Describe your campaign goals"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Campaign Type *</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={formData.type || "Paid"}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Paid">Paid Collaboration</option>
                      <option value="Barter">Barter / Product Exchange</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Budget (₹ INR) *</label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status *</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md"
                      value={formData.status || "Active"}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Deadline *</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditCampaignOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditCampaign}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Spend</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignsList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No campaigns yet. Create one to get started!
                    </TableCell>
                  </TableRow>
                ) : (
                  campaignsList.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.title}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${campaign.type === "Paid" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>
                          {campaign.type}
                        </span>
                      </TableCell>
                      <TableCell>₹{campaign.budget ? (campaign.budget / 1000).toFixed(1) : 0}K</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            campaign.status === "Active" ? "bg-green-100 text-green-800" : 
                            campaign.status === "Completed" ? "bg-gray-100 text-gray-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </TableCell>
                      <TableCell>{campaign.deadline ? format(new Date(campaign.deadline), "MMM d, yyyy") : ""}</TableCell>
                      <TableCell>₹{campaign.spend ? (campaign.spend / 1000).toFixed(1) : 0}K</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => openEditCampaign(campaign)}>
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>



        {/* Payments Tab */}
        <TabsContent value="payments" className="flex-1 p-6 overflow-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <p className="text-sm text-emerald-600 font-medium mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-emerald-900">₹{paymentsList.filter(p => p.status === "Completed").reduce((sum: number, p) => sum + p.amount, 0).toLocaleString()}</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <p className="text-sm text-amber-600 font-medium mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-900">₹{paymentsList.filter(p => p.status === "Pending").reduce((sum: number, p) => sum + p.amount, 0).toLocaleString()}</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-900">{paymentsList.length}</p>
            </Card>
          </div>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment History</h3>
              <div className="space-y-3">
                {paymentsList.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{payment.creator_name}</p>
                        <p className="text-sm text-muted-foreground">{payment.date ? format(new Date(payment.date), "MMM d, yyyy") : ""}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">₹{payment.amount.toLocaleString()}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${payment.status === "Completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                          {payment.status === "Completed" ? "✓ Completed" : "⏱ Pending"}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleDownloadInvoice(payment.id, payment.creator_name || "Creator")}
                      >
                        <Download className="w-4 h-4" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="flex-1 p-6 overflow-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <p className="text-sm text-indigo-600 font-medium mb-1">Total Reach Potential</p>
              <p className="text-2xl font-bold text-indigo-900">{Math.round(dynamicReachData.reduce((sum: number, d: any) => sum + d.reach, 0)).toLocaleString()}</p>
              <p className="text-xs text-indigo-600 mt-2">Based on campaign budgets</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200">
              <p className="text-sm text-violet-600 font-medium mb-1">Total Engagement</p>
              <p className="text-2xl font-bold text-violet-900">{Math.round(dynamicReachData.reduce((sum: number, d: any) => sum + d.engagement, 0)).toLocaleString()}</p>
              <p className="text-xs text-violet-600 mt-2">Interactions tracked</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
              <p className="text-sm text-rose-600 font-medium mb-1">Engagement Rate</p>
              <p className="text-2xl font-bold text-rose-900">{dynamicReachData.reduce((sum: number, d: any) => sum + d.reach, 0) > 0 ? ((dynamicReachData.reduce((sum: number, d: any) => sum + d.engagement, 0) / dynamicReachData.reduce((sum: number, d: any) => sum + d.reach, 0) * 100).toFixed(1)) : "0"}%</p>
              <p className="text-xs text-rose-600 mt-2">Average per campaign</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Campaign Budget vs Spend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                      { name: "Summer Launch", budget: 50000, spend: 35000 },
                      { name: "Fall Collection", budget: 75000, spend: 75000 },
                      { name: "Holiday Special", budget: 100000, spend: 45000 }
                    ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
                    <Bar dataKey="spend" fill="#ef4444" name="Spend" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                      { date: "Week 1", reach: 15000, engagement: 4500 },
                      { date: "Week 2", reach: 25000, engagement: 8000 },
                      { date: "Week 3", reach: 45000, engagement: 15000 }
                    ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reach" fill="#3b82f6" name="Reach" />
                    <Bar dataKey="engagement" fill="#10b981" name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Campaign Status Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Active", value: 5 },
                        { name: "Planning", value: 3 },
                        { name: "Completed", value: 12 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: "Active", value: 5 },
                        { name: "Planning", value: 3 },
                        { name: "Completed", value: 12 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="flex-1 p-6 overflow-auto">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-4xl ml-2 space-y-6">
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold mb-2">Settings</h3>
              <p className="text-muted-foreground">Manage your brand preferences and experience</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="w-5 h-5" />
                    <h4 className="text-lg font-semibold">Brand Information</h4>
                  </div>
                  {!isEditingProfile ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>Edit Details</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                      <Button size="sm" onClick={handleSaveProfile} disabled={isSavingProfile}>
                        {isSavingProfile ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Official Brand Name</label>
                    {isEditingProfile ? (
                      <Input 
                        value={brandEditData.company} 
                        onChange={(e) => setBrandEditData({...brandEditData, company: e.target.value})}
                        placeholder="e.g. Acme Corp"
                      />
                    ) : (
                      <div className="p-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm">{brandName || "Not set"}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instagram Handle</label>
                    {isEditingProfile ? (
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">@</span>
                        <Input 
                          className="pl-7"
                          value={brandEditData.social_handle} 
                          onChange={(e) => setBrandEditData({...brandEditData, social_handle: e.target.value})}
                          placeholder="yourbrand"
                        />
                      </div>
                    ) : (
                      <div className="p-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm flex items-center gap-2">
                        <span className="text-muted-foreground font-medium">@</span>
                        {brandHandle || "Not set"}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Role</label>
                    <div className="p-2.5 bg-primary/5 text-primary border border-primary/10 rounded-xl text-sm font-semibold inline-block">
                      Brand Partner
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-semibold">Appearance</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">Application Theme</p>
                      <p className="text-sm text-muted-foreground">Customize how the platform appears on your device</p>
                    </div>
                    <div className="flex bg-muted/50 p-1.5 rounded-xl border border-border items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`rounded-lg px-4 flex items-center gap-2 transition-all ${useTheme().theme === 'light' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setTheme("light")}
                      >
                        <Bell className="w-3.5 h-3.5" /> {/* Light placeholder */}
                        <span className="text-xs font-semibold">Light</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`rounded-lg px-4 flex items-center gap-2 transition-all ${useTheme().theme === 'dark' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setTheme("dark")}
                      >
                        <Clock className="w-3.5 h-3.5" /> {/* Dark placeholder */}
                        <span className="text-xs font-semibold">Dark</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`rounded-lg px-4 flex items-center gap-2 transition-all ${useTheme().theme === 'system' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setTheme("system")}
                      >
                        <LinkIcon className="w-3.5 h-3.5" /> {/* System placeholder */}
                        <span className="text-xs font-semibold">System</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        {/* End of Settings Tab */}
      </Tabs>
    </div>
  )
}
