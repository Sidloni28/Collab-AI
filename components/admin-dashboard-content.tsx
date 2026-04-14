"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, MoreHorizontal, Search, Trash2, Edit, AlertTriangle } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data
const users = [
  { id: 1, name: "John Brand", email: "john@brand.com", type: "Brand", status: "Active", joined: "2024-01-15" },
  {
    id: 2,
    name: "Sarah Creator",
    email: "sarah@creator.com",
    type: "Creator",
    status: "Active",
    joined: "2024-02-20",
  },
  { id: 3, name: "Alex Marketing", email: "alex@brand.com", type: "Brand", status: "Suspended", joined: "2024-03-10" },
  {
    id: 4,
    name: "Emma Creator",
    email: "emma@creator.com",
    type: "Creator",
    status: "Active",
    joined: "2024-04-05",
  },
]

const campaignStats = [
  {
    id: 1,
    name: "Summer Campaign",
    status: "Active",
    totalBudget: 500000,
    activeCampaigns: 12,
    influencers: 45,
    reach: "2.3M",
  },
  {
    id: 2,
    name: "Fall Promotions",
    status: "Completed",
    totalBudget: 350000,
    activeCampaigns: 8,
    influencers: 32,
    reach: "1.8M",
  },
]

const disputes = [
  {
    id: 1,
    campaign: "Summer Collection",
    brand: "Fashion Co",
    creator: "Sarah Fashion",
    issue: "Content quality dispute",
    status: "Open",
    date: "2024-10-20",
  },
  {
    id: 2,
    campaign: "Product Launch",
    brand: "Tech Corp",
    creator: "Tech Guru Mike",
    issue: "Payment disagreement",
    status: "In Progress",
    date: "2024-10-18",
  },
]

const collaborations = [
  {
    id: 1,
    brand: "Fashion Co",
    creator: "Sarah Fashion",
    campaign: "Summer Collection",
    startDate: "2024-09-01",
    endDate: "2024-10-15",
    status: "Active",
    budget: 15000,
    deliverables: "5 Instagram posts, 2 TikTok videos",
  },
  {
    id: 2,
    brand: "Tech Corp",
    creator: "Tech Guru Mike",
    campaign: "Product Launch",
    startDate: "2024-08-15",
    endDate: "2024-09-30",
    status: "Completed",
    budget: 25000,
    deliverables: "YouTube review, 3 Instagram reels",
  },
  {
    id: 3,
    brand: "Beauty Brand",
    creator: "Emma Beauty",
    campaign: "Q4 Beauty Campaign",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    status: "Active",
    budget: 18000,
    deliverables: "10 TikTok videos, 5 Instagram posts",
  },
  {
    id: 4,
    brand: "Fitness Plus",
    creator: "Alex Fitness",
    campaign: "Gym Equipment Review",
    startDate: "2024-09-10",
    endDate: "2024-10-20",
    status: "In Progress",
    budget: 12000,
    deliverables: "YouTube video, 8 Instagram stories",
  },
]

const supportTickets = [
  {
    id: 1,
    user: "John Brand",
    type: "Payment Issue",
    subject: "Invoice not received",
    status: "Open",
    priority: "High",
    date: "2024-10-22",
  },
  {
    id: 2,
    user: "Emma Creator",
    type: "Technical",
    subject: "Cannot upload files",
    status: "In Progress",
    priority: "High",
    date: "2024-10-21",
  },
  {
    id: 3,
    user: "Sarah Creator",
    type: "General",
    subject: "Account settings help",
    status: "Resolved",
    priority: "Low",
    date: "2024-10-20",
  },
  {
    id: 4,
    user: "Emma Creator",
    type: "Collaboration",
    subject: "Creator payment not received",
    status: "Open",
    priority: "High",
    date: "2024-10-22",
  },
]

const revenueData = [
  { month: "Jan", revenue: 45000, transactions: 320 },
  { month: "Feb", revenue: 52000, transactions: 380 },
  { month: "Mar", revenue: 48000, transactions: 350 },
  { month: "Apr", revenue: 61000, transactions: 440 },
  { month: "May", revenue: 73000, transactions: 520 },
  { month: "Jun", revenue: 85000, transactions: 610 },
]

const userGrowthData = [
  { month: "Jan", brands: 45, creators: 120 },
  { month: "Feb", brands: 52, creators: 145 },
  { month: "Mar", brands: 58, creators: 175 },
  { month: "Apr", brands: 65, creators: 210 },
  { month: "May", brands: 73, creators: 255 },
  { month: "Jun", brands: 82, creators: 305 },
]

export function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex-1">
      {/* Top Bar */}
      <div className="border-b border-border bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <TabsList className="border-b border-border bg-background px-4 w-full justify-start rounded-none">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
        </TabsList>

        {/* Collaborations Tab */}
        <TabsContent value="collaborations" className="flex-1 p-6 overflow-auto space-y-4">
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search collaborations..."
              className="flex-1"
            />
            <select className="px-3 py-2 border border-border rounded-lg text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>In Progress</option>
            </select>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deliverables</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collaborations.map((collab) => (
                  <TableRow key={collab.id}>
                    <TableCell className="font-medium">{collab.brand}</TableCell>
                    <TableCell>{collab.creator}</TableCell>
                    <TableCell>{collab.campaign}</TableCell>
                    <TableCell className="text-xs">{collab.startDate} to {collab.endDate}</TableCell>
                    <TableCell>${collab.budget.toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          collab.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : collab.status === "Completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {collab.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{collab.deliverables}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="flex-1 p-6 overflow-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
              <p className="text-3xl font-bold">$364K</p>
              <p className="text-xs text-green-600 mt-2">+12% this month</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Active Users</p>
              <p className="text-3xl font-bold">387</p>
              <p className="text-xs text-muted-foreground mt-2">82 brands, 305 creators</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Open Disputes</p>
              <p className="text-3xl font-bold">2</p>
              <p className="text-xs text-yellow-600 mt-2">Requires attention</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Open Tickets</p>
              <p className="text-3xl font-bold">3</p>
              <p className="text-xs text-muted-foreground mt-2">2 high priority</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}K`} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">User Growth</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="brands" fill="#3b82f6" />
                    <Bar dataKey="creators" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="flex-1 p-6 overflow-auto space-y-4">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
              <select className="px-3 py-2 border border-border rounded-lg text-sm">
              <option>All Users</option>
              <option>Brands</option>
              <option>Creators</option>
            </select>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="flex-1 p-6 overflow-auto space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Budget</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Influencers</TableHead>
                  <TableHead>Reach</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignStats.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${campaign.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {campaign.status}
                      </span>
                    </TableCell>
                    <TableCell>${campaign.totalBudget / 1000}K</TableCell>
                    <TableCell>{campaign.activeCampaigns}</TableCell>
                    <TableCell>{campaign.influencers}</TableCell>
                    <TableCell>{campaign.reach}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="flex-1 p-6 overflow-auto space-y-4">
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <Card key={dispute.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <h4 className="font-semibold">{dispute.campaign}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{dispute.issue}</p>
                    <div className="flex gap-4 text-sm">
                      <span>
                        <span className="font-medium">Brand:</span> {dispute.brand}
                      </span>
                      <span>
                        <span className="font-medium">Creator:</span> {dispute.creator}
                      </span>
                      <span>
                        <span className="font-medium">Date:</span> {dispute.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${dispute.status === "Open" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                    >
                      {dispute.status}
                    </span>
                    <Button size="sm">Resolve</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Support Tickets Tab */}
        <TabsContent value="support" className="flex-1 p-6 overflow-auto">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supportTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.user}</TableCell>
                    <TableCell>{ticket.type}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          ticket.status === "Open"
                            ? "bg-red-100 text-red-800"
                            : ticket.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${ticket.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {ticket.priority}
                      </span>
                    </TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
