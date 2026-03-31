# Omniguard

Hey! This is my AI-powered admin dashboard. It's got a dark theme (because dark mode looks cool 😎) and handles customer support stuff - think chat, knowledge base, security logs, and analytics.

## What it does

**Live Agent** - Chat interface where users can talk to an AI. Handles orders, refunds, pricing questions, shipping info - you name it. The AI uses tools to actually do things (check order status, process refunds) instead of just pretending.

**Knowledge Base** - Upload documents and the AI learns from them. Great for FAQs and company policies.

**Security Logs** - Tracks what's happening in the system. Warnings, errors, info events - all in one place.

**Analytics** - Basic charts showing how the AI is performing. Bar chart for daily inquiries, pie chart for resolution ratios.

**Settings** - Toggle dark mode, configure API keys.

## Tech stuff

Built with Next.js 15, TypeScript, and Tailwind CSS. AI powered by Gemini 1.5 Pro through Vercel AI SDK. Uses Zod for validation, Clerk for auth, and Recharts for charts.

## Quick start

```bash
npm install
npm run dev
```

You'll need a Gemini API key and Clerk account for the full experience. Check `.env.local.example` for what keys are required.

## Files

- `src/app/` - Next.js app router pages
- `src/app/api/chat/` - The chat API endpoint with tools
- `src/app/knowledge/` - Knowledge base page
- `src/app/analytics/` - Charts and stats
- `src/app/security/` - Security logs
- `src/app/settings/` - Settings page
- `index.html` - Standalone demo version (no backend needed)

The `index.html` file is a standalone demo that works without any server - just open it in a browser. Useful for showing the UI without setting up API keys.

## Note

This is a personal project. The AI responses are mocked in the demo version, but the full app connects to Gemini for real responses. If something breaks, that's on me - but feel free to mess around with it!