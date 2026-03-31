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
  Moon,
  Sun,
  Bell,
  Lock,
  Key,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

export default function SettingsPage() {
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [apiKey, setApiKey] = useState('')

  const handleGenerateApiKey = () => {
    const key = 'sk-' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    setApiKey(key)
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
              <Settings className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>
              <p className="text-xs text-muted-foreground">Configure your dashboard</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl space-y-6">
            {/* Appearance */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Use dark theme for the dashboard</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors relative',
                    darkMode ? 'bg-primary' : 'bg-secondary'
                  )}
                >
                  <div className={cn(
                    'absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform',
                    darkMode ? 'right-0.5' : 'left-0.5'
                  )} />
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive notifications for important events</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors relative',
                    notifications ? 'bg-primary' : 'bg-secondary'
                  )}
                >
                  <div className={cn(
                    'absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform',
                    notifications ? 'right-0.5' : 'left-0.5'
                  )} />
                </button>
              </div>
            </div>

            {/* API Configuration */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">API Configuration</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Gemini API Key</label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="password"
                      placeholder="Enter your API key"
                      className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                      Save
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Clerk Publishable Key</label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="password"
                      placeholder="pk_test_..."
                      className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Language & Region</h3>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Language</label>
                <select className="w-full mt-2 bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>

            {/* Security */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Security</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Change Password</p>
                    <p className="text-xs text-muted-foreground">Update your account password</p>
                  </div>
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-6 bg-card border border-destructive/50 rounded-xl">
              <h3 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
                </div>
                <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}