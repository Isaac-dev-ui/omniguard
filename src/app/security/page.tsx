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
  Search,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock security logs
const securityLogs = [
  { id: '1', type: 'info', message: 'User login successful', timestamp: '2024-01-28 09:15:32', user: 'admin@omniguard.com' },
  { id: '2', type: 'warning', message: 'Failed login attempt', timestamp: '2024-01-28 09:45:12', user: 'unknown' },
  { id: '3', type: 'success', message: 'Password reset requested', timestamp: '2024-01-28 10:22:45', user: 'user@example.com' },
  { id: '4', type: 'info', message: 'API key generated', timestamp: '2024-01-28 11:05:18', user: 'admin@omniguard.com' },
  { id: '5', type: 'warning', message: 'Rate limit exceeded', timestamp: '2024-01-28 11:30:55', user: 'bot@system' },
  { id: '6', type: 'info', message: 'Session expired', timestamp: '2024-01-28 12:15:00', user: 'user@example.com' },
  { id: '7', type: 'error', message: 'Unauthorized access attempt', timestamp: '2024-01-28 13:22:11', user: 'unknown' },
  { id: '8', type: 'success', message: 'Firewall rule updated', timestamp: '2024-01-28 14:45:33', user: 'admin@omniguard.com' },
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

export default function SecurityLogsPage() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredLogs = securityLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || log.type === filterType
    return matchesSearch && matchesFilter
  })

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500'
      case 'warning': return 'border-l-yellow-500'
      case 'error': return 'border-l-red-500'
      default: return 'border-l-blue-500'
    }
  }

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
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Security Logs</h2>
              <p className="text-xs text-muted-foreground">Monitor system security events</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-card border border-border rounded-xl">
              <p className="text-2xl font-bold text-foreground">{securityLogs.length}</p>
              <p className="text-sm text-muted-foreground">Total Events</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-xl">
              <p className="text-2xl font-bold text-blue-500">{securityLogs.filter(l => l.type === 'info').length}</p>
              <p className="text-sm text-muted-foreground">Info</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-xl">
              <p className="text-2xl font-bold text-yellow-500">{securityLogs.filter(l => l.type === 'warning').length}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-xl">
              <p className="text-2xl font-bold text-red-500">{securityLogs.filter(l => l.type === 'error').length}</p>
              <p className="text-sm text-muted-foreground">Errors</p>
            </div>
          </div>

          {/* Logs List */}
          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={cn(
                  'flex items-center gap-4 p-4 bg-card border border-l-4 border-border rounded-xl hover:border-primary/30 transition-colors',
                  getLogColor(log.type)
                )}
              >
                {getLogIcon(log.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{log.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    User: {log.user} • {log.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}