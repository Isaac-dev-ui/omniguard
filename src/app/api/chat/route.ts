import { NextResponse } from 'next/server'
import { knowledgeBase } from '@/lib/knowledge-base'

export const dynamic = 'force-dynamic'

// Guardrails - check if request should be blocked
const guardrails = [
  { pattern: /hack|exploit|bypass|password.*crack/i, message: "I can't help with that. Please contact a human administrator for security-related concerns." },
  { pattern: /bomb|terror|attack|weapon/i, message: "I can't help with that. This is a safety concern." },
  { pattern: /bribe|corrupt|fraud/i, message: "I can't help with that. Please contact the appropriate department." }
]

function checkGuardrails(input: string): string | null {
  for (const rule of guardrails) {
    if (rule.pattern.test(input)) {
      return rule.message
    }
  }
  return null
}

// Search knowledge base
function searchKnowledgeBase(query: string): string {
  if (knowledgeBase.length === 0) {
    return ''
  }
  
  const queryLower = query.toLowerCase()
  const relevantDocs = knowledgeBase.filter(doc => 
    doc.content.toLowerCase().includes(queryLower) ||
    doc.name.toLowerCase().includes(queryLower)
  )
  
  if (relevantDocs.length === 0) {
    return ''
  }
  
  return relevantDocs.map(doc => 
    `Document: ${doc.name}\nContent: ${doc.content}`
  ).join('\n\n')
}

// Mock order database
const orders: Record<string, { status: string; amount: number }> = {
  'ORD-001': { status: 'Shipped', amount: 150.00 },
  'ORD-002': { status: 'Pending', amount: 89.99 },
  'ORD-003': { status: 'Delivered', amount: 299.99 },
  'ORD-004': { status: 'Shipped', amount: 45.00 },
}

// Mock tool implementations
function checkOrderStatus(orderId: string): string {
  if (!orders[orderId]) {
    return `Order ${orderId} not found. Please verify the order ID.`
  }
  return `Order ${orderId} is currently ${orders[orderId].status}.`
}

function processRefund(orderId: string, reason: string): string {
  // Simulate occasional failure for self-healing demo
  if (Math.random() < 0.2) {
    return "The refund service is temporarily unavailable. Please contact a human manager at support@omniguard.com for immediate assistance."
  }
  
  if (!orders[orderId]) {
    return `Order ${orderId} not found. Unable to process refund.`
  }
  
  return `Refund of $${orders[orderId].amount.toFixed(2)} has been processed for order ${orderId}. Reason: ${reason}. A confirmation email will be sent shortly.`
}

// Generate mock AI response based on user input
function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Check for order status queries
  if (lowerMessage.includes('order status') || lowerMessage.includes('check order') || lowerMessage.includes('where is my order')) {
    const orderMatch = message.match(/ORD-\d+/i)
    if (orderMatch) {
      return checkOrderStatus(orderMatch[0])
    }
    return "I'd be happy to check your order status. Could you please provide your order ID (e.g., ORD-001)?"
  }
  
  // Check for refund requests
  if (lowerMessage.includes('refund') || lowerMessage.includes('money back')) {
    const orderMatch = message.match(/ORD-\d+/i)
    if (orderMatch) {
      const reason = message.toLowerCase().replace(/.*refund/i, '').trim() || 'Customer request'
      return processRefund(orderMatch[0], reason)
    }
    return "I can help process a refund. Could you please provide your order ID and the reason for the refund?"
  }
  
  // Check for shipping info
  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('when will')) {
    return "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. You can track your order using the tracking number in your confirmation email."
  }
  
  // Check for return policy
  if (lowerMessage.includes('return') || lowerMessage.includes('exchange')) {
    return "Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging. To initiate a return, please provide your order ID."
  }
  
  // Check for knowledge base context
  const knowledgeContext = searchKnowledgeBase(message)
  if (knowledgeContext) {
    return `Based on our knowledge base:\n\n${knowledgeContext}\n\nIs there anything else you'd like to know?`
  }
  
  // Default responses
  const responses = [
    "I'm your AI support assistant. I can help you with order status, refunds, shipping info, and more. What can I help you with today?",
    "Hello! How can I assist you today? I can help with order tracking, refunds, shipping, and general questions.",
    "I'm here to help! You can ask me about your orders, refunds, shipping times, or any other questions.",
    "Thanks for reaching out! I can assist with order status, process refunds, and answer common questions. What do you need help with?"
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    // Check guardrails first
    const guardrailResponse = checkGuardrails(message)
    if (guardrailResponse) {
      return NextResponse.json({ error: guardrailResponse }, { status: 400 })
    }

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Generate mock response
    const response = generateMockResponse(message)

    // Stream the response
    const stream = new ReadableStream({
      start(controller) {
        let index = 0
        const interval = setInterval(() => {
          if (index >= response.length) {
            clearInterval(interval)
            controller.close()
            return
          }
          controller.enqueue(new TextEncoder().encode(response[index]))
          index++
        }, 20)
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
      }
    })
  } catch (error) {
    console.error('Chat API error:', error)
    
    return NextResponse.json({ error: 'I apologize, but I encountered an unexpected error. Please try again, or contact support@omniguard.com for immediate assistance.' }, { status: 500 })
  }
}