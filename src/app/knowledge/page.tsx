'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  MessageSquare, 
  Book, 
  Shield, 
  Settings, 
  Upload,
  FileText,
  Trash2,
  Bot,
  BarChart3,
  User,
  LogOut,
  Search,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock user data
const mockUser = {
  name: 'Admin User',
  email: 'admin@omniguard.com'
}

// Knowledge base document type
interface KnowledgeDoc {
  id: string
  name: string
  content: string
  createdAt: string
}

// Mock initial documents
const initialDocs: KnowledgeDoc[] = [
  {
    id: '1',
    name: 'Company Policy',
    content: 'Our refund policy allows returns within 30 days of purchase. All refunds are processed within 5-7 business days.',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Shipping Guidelines',
    content: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping takes 7-14 business days.',
    createdAt: '2024-01-20'
  }
]

const sidebarItems = [
  { name: 'Live Agent', href: '/', icon: MessageSquare },
  { name: 'Knowledge Base', href: '/knowledge', icon: Book },
  { name: 'Security Logs', href: '/security', icon: Shield },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function KnowledgeBasePage() {
  const pathname = usePathname()
  const [documents, setDocuments] = useState<KnowledgeDoc[]>(initialDocs)
  const [newDocContent, setNewDocContent] = useState('')
  const [newDocName, setNewDocName] = useState('')
  const [isAddingDoc, setIsAddingDoc] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddDocument = () => {
    if (!newDocContent.trim() || !newDocName.trim()) return

    const newDoc: KnowledgeDoc = {
      id: Date.now().toString(),
      name: newDocName,
      content: newDocContent,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setDocuments([...documents, newDoc])
    setNewDocContent('')
    setNewDocName('')
    setIsAddingDoc(false)
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id))
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
              <Book className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Knowledge Base</h2>
              <p className="text-xs text-muted-foreground">Upload and manage documents</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Search and Add */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => setIsAddingDoc(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Document
            </button>
          </div>

          {/* Add Document Form */}
          {isAddingDoc && (
            <div className="mb-6 p-4 bg-card border border-border rounded-xl animate-slide-in">
              <h3 className="text-sm font-semibold text-foreground mb-3">Add New Document</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Document name"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <textarea
                  placeholder="Document content..."
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  rows={4}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddDocument}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Save Document
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingDoc(false)
                      setNewDocContent('')
                      setNewDocName('')
                    }}
                    className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div className="mb-6 p-8 border-2 border-dashed border-border rounded-xl text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Drag and drop files here, or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">Supports .txt, .md, .pdf (mock)</p>
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Uploaded Documents</h3>
            {filteredDocs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No documents found</p>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{doc.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">Added: {doc.createdAt}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}