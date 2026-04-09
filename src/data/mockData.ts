import { ProjectData, Message, DocumentItem, Referral, QuoteData, GoogleReview, ReputationStats } from '../types';

export const mockProjectData: ProjectData = {
  address: "742 Evergreen Terrace, Springfield, IL 62704",
  installType: "Plumbing",
  installDate: "May 15, 2026",
  timeWindow: "8:00 AM - 10:00 AM",
  status: "In Progress",
  projectManager: {
    name: "Mike Thompson",
    phone: "(555) 234-5678",
    email: "mike@mikesplumbing.com"
  },
  crewLead: "Carlos Rodriguez",
  materials: [
    { item: "3/4\" Copper Pipe (Type L)", quantity: "120 ft" },
    { item: "PEX Tubing (Red/Blue)", quantity: "200 ft" },
    { item: "SharkBite Fittings Assorted", quantity: "24 pcs" },
    { item: "AO Smith 50 Gal Water Heater", quantity: "1 unit" },
    { item: "Pipe Insulation Foam", quantity: "80 ft" },
    { item: "Ball Valves 3/4\"", quantity: "8 pcs" },
  ],
  weather: {
    temp: "72°",
    condition: "Sunny",
    tomorrowTemp: "68°",
    tomorrowCondition: "Partly Cloudy"
  }
};

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'contractor',
    text: "Hi! We've completed the initial inspection. The main water line needs replacement - I'll send the updated quote shortly.",
    time: '9:15 AM',
    read: true
  },
  {
    id: '2',
    sender: 'client',
    text: "Thanks Mike! How long will the replacement take?",
    time: '9:22 AM',
    read: true
  },
  {
    id: '3',
    sender: 'contractor',
    text: "About 2 days for the main line. We'll also re-route the kitchen supply while we're at it — no extra charge since we're already opened up.",
    time: '9:30 AM',
    read: true
  },
  {
    id: '4',
    sender: 'client',
    text: "That's great, appreciate you taking care of that. Will we have water during the work?",
    time: '9:45 AM',
    read: true
  },
  {
    id: '5',
    sender: 'contractor',
    text: "Yes! We'll set up a temporary bypass. Water will be off for about 2 hours during the connection phase. I'll give you a heads up before we shut it down. 👍",
    time: '10:02 AM',
    read: true
  }
];

export const mockDocuments: DocumentItem[] = [
  { id: '1', name: 'Service Contract', type: 'contract', size: '245 KB', date: 'Apr 28, 2026' },
  { id: '2', name: 'Building Permit', type: 'pdf', size: '180 KB', date: 'May 1, 2026' },
  { id: '3', name: 'Insurance Certificate', type: 'pdf', size: '320 KB', date: 'Apr 28, 2026' },
  { id: '4', name: 'Before Photos', type: 'image', size: '4.2 MB', date: 'May 10, 2026' },
  { id: '5', name: 'Material Invoice', type: 'pdf', size: '95 KB', date: 'May 12, 2026' },
];

export const mockReferrals: Referral[] = [
  { id: '1', name: 'Sarah Johnson', status: 'completed', reward: '$50 credit', date: 'Mar 15, 2026' },
  { id: '2', name: 'Tom Williams', status: 'signed_up', reward: '$50 credit', date: 'Apr 2, 2026' },
  { id: '3', name: 'Jenny Parker', status: 'pending', reward: '$50 credit', date: 'Apr 20, 2026' },
];

export const mockReviews: GoogleReview[] = [
  {
    id: '1',
    reviewerName: 'David Martinez',
    rating: 5,
    text: "Mike's team did an amazing job on our water heater installation. Fast, professional, and they cleaned up everything. Highly recommend!",
    timeAgo: '2 days ago',
    hasReply: true,
    replyText: "Thanks David! We're glad we could help. Don't hesitate to reach out if you need anything!"
  },
  {
    id: '2',
    reviewerName: 'Emily Chen',
    rating: 5,
    text: "Best plumbing service in Springfield! They fixed our kitchen leak same-day and the price was fair. Will definitely use again.",
    timeAgo: '5 days ago',
    hasReply: true,
    replyText: "Thank you Emily! We appreciate your business and the kind words!"
  },
  {
    id: '3',
    reviewerName: 'Robert Johnson',
    rating: 4,
    text: "Good work overall. Took a bit longer than expected but the quality was solid. Would use their services again.",
    timeAgo: '1 week ago',
    hasReply: false
  },
  {
    id: '4',
    reviewerName: 'Lisa Thompson',
    rating: 2,
    text: "Had to wait 3 hours past the scheduled window. The work was fine but the communication could have been better.",
    timeAgo: '2 weeks ago',
    hasReply: true,
    replyText: "Lisa, we sincerely apologize for the delay. This isn't our standard. Please call us at (555) 234-5678 so we can make it right."
  },
  {
    id: '5',
    reviewerName: 'James Wilson',
    rating: 5,
    text: "Exceptional service from start to finish. Mike gave us a detailed quote and the team was professional throughout. 10/10!",
    timeAgo: '3 weeks ago',
    hasReply: false
  }
];

export const reputationStats: ReputationStats = {
  overallRating: 4.2,
  totalReviews: 47,
  areaAverage: 4.6,
  reviewsThisMonth: 2,
  reviewGoal: 8,
  lastMonthReviews: 5,
  responseRate: 78,
  avgResponseTime: 4.2,
  sentimentScore: 82
};

export const serviceQuotes: Record<string, QuoteData> = {
  plumbing: {
    serviceType: "Plumbing",
    description: "Complete bathroom repiping with PEX, new water heater installation, and fixture upgrades",
    lineItems: [
      { label: "Labor (16 hrs @ $95/hr)", amount: 1520 },
      { label: "AO Smith 50 Gal Water Heater", amount: 1200 },
      { label: "PEX Tubing & Fittings", amount: 380 },
      { label: "Fixture Installation (3)", amount: 450 },
      { label: "Permit & Inspection", amount: 275 },
    ],
    total: 3825,
    estimatedDays: "2-3 days"
  },
  electrical: {
    serviceType: "Electrical",
    description: "200A panel upgrade, dedicated circuits for kitchen appliances, and whole-home surge protection",
    lineItems: [
      { label: "Labor (12 hrs @ $110/hr)", amount: 1320 },
      { label: "200A Panel & Breakers", amount: 950 },
      { label: "Wiring & Conduit", amount: 420 },
      { label: "Surge Protector (Whole Home)", amount: 350 },
      { label: "Permit & Inspection", amount: 325 },
    ],
    total: 3365,
    estimatedDays: "1-2 days"
  },
  hvac: {
    serviceType: "HVAC",
    description: "14 SEER2 central AC replacement with smart thermostat and duct sealing",
    lineItems: [
      { label: "Labor (8 hrs @ $105/hr)", amount: 840 },
      { label: "Carrier 3-Ton AC Unit", amount: 3200 },
      { label: "Refrigerant Line Set", amount: 280 },
      { label: "Ecobee Smart Thermostat", amount: 250 },
      { label: "Duct Sealing & Testing", amount: 450 },
      { label: "Permit & Inspection", amount: 200 },
    ],
    total: 5220,
    estimatedDays: "1 day"
  },
  roofing: {
    serviceType: "Roofing",
    description: "Full tear-off and reroof with architectural shingles, new underlayment, and ridge vent",
    lineItems: [
      { label: "Labor (24 hrs @ $85/hr)", amount: 2040 },
      { label: "OC Duration Shingles (32 sq)", amount: 3840 },
      { label: "Synthetic Underlayment", amount: 480 },
      { label: "Ice & Water Shield", amount: 320 },
      { label: "Drip Edge & Flashing", amount: 280 },
      { label: "Ridge Vent System", amount: 350 },
      { label: "Permit & Dumpster", amount: 450 },
    ],
    total: 7760,
    estimatedDays: "2-3 days"
  },
  painting: {
    serviceType: "Painting",
    description: "Full exterior repaint — power wash, prime, two coats of premium acrylic latex",
    lineItems: [
      { label: "Labor (32 hrs @ $65/hr)", amount: 2080 },
      { label: "Sherwin-Williams Duration (12 gal)", amount: 780 },
      { label: "Primer (8 gal)", amount: 320 },
      { label: "Power Washing", amount: 250 },
      { label: "Caulking & Prep Materials", amount: 180 },
    ],
    total: 3610,
    estimatedDays: "3-4 days"
  }
};

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2670&auto=format&fit=crop",
];

export const SERVICE_FORM_FIELDS: Record<string, { label: string; placeholder: string; type: string }[]> = {
  plumbing: [
    { label: "What needs fixing?", placeholder: "e.g. Leaky faucet, water heater replacement...", type: "text" },
    { label: "Number of fixtures", placeholder: "e.g. 3", type: "number" },
    { label: "Home age (years)", placeholder: "e.g. 25", type: "number" },
  ],
  electrical: [
    { label: "Describe the work needed", placeholder: "e.g. Panel upgrade, new outlets...", type: "text" },
    { label: "Current panel amperage", placeholder: "e.g. 100A", type: "text" },
    { label: "Number of circuits needed", placeholder: "e.g. 4", type: "number" },
  ],
  hvac: [
    { label: "What's the issue?", placeholder: "e.g. AC not cooling, furnace replacement...", type: "text" },
    { label: "Square footage", placeholder: "e.g. 2000", type: "number" },
    { label: "System age (years)", placeholder: "e.g. 15", type: "number" },
  ],
  roofing: [
    { label: "Type of work", placeholder: "e.g. Full reroof, repairs, inspection...", type: "text" },
    { label: "Approximate roof area (sq ft)", placeholder: "e.g. 2500", type: "number" },
    { label: "Number of stories", placeholder: "e.g. 2", type: "number" },
  ],
  painting: [
    { label: "Interior or Exterior?", placeholder: "e.g. Exterior full house", type: "text" },
    { label: "Square footage", placeholder: "e.g. 3000", type: "number" },
    { label: "Number of colors", placeholder: "e.g. 2", type: "number" },
  ],
};

export const LOADING_STEPS = [
  "Authenticating property...",
  "Retrieving project schedule...",
  "Connecting to PM system...",
  "Fetching crew assignments...",
  "Loading material manifest...",
  "Finalizing status report..."
];

export const SERVICES_LIST = [
  { id: 'plumbing', name: 'Plumbing', icon: 'wrench', color: 'from-blue-500 to-blue-600' },
  { id: 'electrical', name: 'Electrical', icon: 'zap', color: 'from-yellow-500 to-amber-600' },
  { id: 'hvac', name: 'HVAC', icon: 'snowflake', color: 'from-cyan-500 to-blue-600' },
  { id: 'roofing', name: 'Roofing', icon: 'home', color: 'from-red-500 to-orange-600' },
  { id: 'painting', name: 'Painting', icon: 'paintbrush', color: 'from-purple-500 to-pink-600' },
];
