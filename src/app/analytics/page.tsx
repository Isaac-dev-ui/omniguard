'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  MessageSquare, 
  Book, 
  Shield, 
  Settings, 
  Bot,
  BarChart3,
  User,
  LogOut,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

// Mock data for charts
const dailyInquiriesData = [
  { day: 'Mon', inquiries: 45 },
  { day: 'Tue', inquiries: 52 },
  { day: 'Wed', inquiries: 38 },
  { day: 'Thu', inquiries: 67 },
  { day: 'Fri', inquiries: 55 },
  { day: 'Sat', inquiries: 28 },
  { day: 'Sun', inquiries: 22 },
]

const resolutionData = [
  { name: 'AI Resolved', value: 280, color: '#3b82f6' },
  { name: 'Human Escalation', value: 45, color: '#ef4444' },
]

// Summary stats
const stats = [
  { label: 'Total Inquiries', value: '325', change: '+12%', icon: MessageSquare },
  { label: 'AI Resolved', value: '280', change: '+8%', icon: CheckCircle },
  { label: 'Human Escalations', value: '45', change: '-15%', icon: AlertTriangle },
  { label: 'Success Rate', value: '86%', change: '+5%', icon: TrendingUp },
]

const sidebarItems = [
  { name: 'Live Agent', href: '/', icon: MessageSquare },
  { name: 'Knowledge Base', href: '/knowledge', icon: Book },
  { name: 'Security Logs', href: '/security', icon: Shield },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const mockUser = {
  name: 'Admin User',
  email: 'admin@omniguard.com'
}

export default function AnalyticsPage() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Omniguard</h1>
              <p className="text-xs text-muted-foreground">AI Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
              <p className="text-xs text-muted-foreground">Track AI performance and metrics</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 bg-card border border-border rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart - Daily Inquiries */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Daily Inquiries</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyInquiriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(217.2 32.6% 17.5%)" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(215 20.2% 65.1%)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(215 20.2% 65.1%)"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(222.2 84% 6.5%)',
                        border: '1px solid hsl(217.2 32.6% 17.5%)',
                        borderRadius: '8px',
                        color: 'hsl(210 40% 98%)'
                      }}
                    />
                    <Bar 
                      dataKey="inquiries" 
                      fill="hsl(217.2 91.2% 59.8%)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart - Resolution Ratio */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resolution Ratio</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resolutionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={{ stroke: 'hsl(215 20.2% 65.1%)' }}
                    >
                      {resolutionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(222.2 84% 6.5%)',
                        border: '1px solid hsl(217.2 32.6% 17.5%)',
                        borderRadius: '8px',
                        color: 'hsl(210 40% 98%)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: 'hsl(210 40% 98%)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="mt-6 p-6 bg-card border border-border rounded-xl">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">AI Resolution Rate Up</p>
                  <p className="text-xs text-muted-foreground">The AI has successfully resolved 86% of all inquiries this week</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Peak Hours: 9 AM - 5 PM</p>
                  <p className="text-xs text-muted-foreground">Most inquiries are handled during business hours with minimal wait time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}