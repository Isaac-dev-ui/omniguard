// Mock knowledge base storage (in-memory)
export const knowledgeBase: { id: string; content: string; name: string; createdAt: Date }[] = [
  {
    id: '1',
    name: 'Company Policy',
    content: 'Our refund policy allows returns within 30 days of purchase. All refunds are processed within 5-7 business days.',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Shipping Guidelines',
    content: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping takes 7-14 business days.',
    createdAt: new Date('2024-01-20')
  }
]