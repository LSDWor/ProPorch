# ProPorch

## Product Overview
Client Portal + Referral Engine + Instant Quoting Tool for home service businesses (plumbers, electricians, HVAC, contractors)

## Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes + tRPC or REST
- **Database**: PostgreSQL (via Supabase or Railway)
- **Auth**: NextAuth.js with Google OAuth
- **File Storage**: AWS S3 or Supabase Storage
- **Payments**: Stripe (for SaaS subscriptions + quoting payments)
- **Email**: Resend or SendGrid
- **SMS**: Twilio (for quoting notifications)
- **Hosting**: Vercel

## Core Features

### 1. Client Portal
- Branded subdomain (customer.proporch.com/plumber-mike)
- Project status tracking (Not Started → In Progress → Complete)
- Document/file sharing (contracts, permits, photos)
- Invoice viewing & payment
- Messaging/chat between client and contractor
- Appointment scheduling

### 2. Instant Quoting Tool
- Service selector (plumbing, electrical, HVAC, etc.)
- Dynamic form builder per service type
- Photo/video upload for remote quotes
- Pricing calculator with markup rules
- Quote PDF generation
- E-signature for quote approval
- Deposit collection via Stripe

### 3. Referral Engine
- One-click referral link generation
- Referral tracking dashboard
- Automated reward emails
- Integration with portal ("Refer a friend, get $50 off")
- Leaderboard for top referrers

## Database Schema

```sql
-- Companies (contractors)
companies: id, name, subdomain, logo, industry, plan_tier, stripe_customer_id, created_at

-- Users (contractor staff)
users: id, email, name, company_id, role, created_at

-- Clients
clients: id, email, name, phone, company_id, created_at

-- Projects
projects: id, client_id, company_id, title, description, status, start_date, end_date, budget, created_at

-- Quotes
quotes: id, project_id, client_id, company_id, amount, status, pdf_url, signed_at, created_at

-- Invoices
invoices: id, project_id, client_id, company_id, amount, status, paid_at, stripe_payment_intent_id, created_at

-- Documents
documents: id, project_id, file_url, file_name, uploaded_by, created_at

-- Messages
messages: id, project_id, sender_id, sender_type, content, created_at

-- Referrals
referrals: id, referrer_client_id, referred_client_id, company_id, status, reward_amount, paid_at, created_at
```

## API Endpoints

```
POST   /api/auth/[...nextauth]
GET    /api/companies/:subdomain
POST   /api/quotes
GET    /api/quotes/:id
PUT    /api/quotes/:id/approve
POST   /api/invoices
POST   /api/webhooks/stripe
GET    /api/projects
POST   /api/messages
GET    /api/referrals
```

## MVP Milestones

### Phase 1: Core Portal (Week 1-2)
- [ ] Company onboarding & subdomain setup
- [ ] Client login/registration
- [ ] Project dashboard
- [ ] Basic messaging

### Phase 2: Quoting (Week 3-4)
- [ ] Service form builder
- [ ] Quote generation & PDF
- [ ] E-signature integration
- [ ] Stripe payment collection

### Phase 3: Referrals (Week 5)
- [ ] Referral link generation
- [ ] Tracking dashboard
- [ ] Reward automation

### Phase 4: Polish (Week 6)
- [ ] Mobile responsiveness
- [ ] Email notifications
- [ ] Analytics dashboard

## Pricing Tiers
- **Starter**: $29/mo — 50 clients, basic portal
- **Pro**: $79/mo — 200 clients, instant quoting
- **Business**: $149/mo — Unlimited, full referral engine, white-label

## Marketing Flywheel → Services
- "Your Google rating is low — let us run review campaigns"
- "Your portal looks great — let us manage your social media"
- "You're getting leads — let us run your paid ads"
