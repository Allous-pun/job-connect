# JobConnect - Job Listings Platform

A modern, fully responsive job board web application built with React, TanStack Router, and shadcn/ui. Browse job opportunities, filter by category/location/budget, and submit proposals directly through an accessible modal interface.

## ✨ Features

### Core Functionality (Q12)
- ✅ **Sticky Header** with logo and navigation (Home, Jobs, Post a Job, Sign In)
- ✅ **Real-time Search Bar** - searches job titles and descriptions
- ✅ **3 Working Filters** - Category, Location, Budget Range (update instantly)
- ✅ **12+ Job Cards** from local JSON data
- ✅ **Job Card Details** - title, employer, budget, location, skills tags, posted date, proposal count, Apply button
- ✅ **Dynamic Counter** - Shows "Showing X of Y jobs" that updates with filters
- ✅ **Responsive Grid** - 3 columns (desktop), 2 columns (tablet: 768px), 1 column (mobile: 480px)
- ✅ **Loading Skeleton** - 1.5s simulated delay with skeleton UI (no blank screen)
- ✅ **Empty State** - Friendly message when no jobs match filters

### Job Details Modal (Q13)
- ✅ **Modal opens on card click** with complete job information
- ✅ **Close methods** - ESC key + click outside
- ✅ **Proposal Submission Form** with:
  - Cover letter (textarea, required, min 100 chars)
  - Proposed budget (number, required)
  - Timeline in days (number, required)
  - Portfolio URL (optional)
- ✅ **Inline Form Validation** - Real-time error messages next to each field
- ✅ **Success Message** - Mock submission confirmation (no actual API)
- ✅ **Accessibility** - Labels for all inputs, logical tab navigation

### UX Improvements (Q14)
- ✅ **Error State** - Simulated API failure with user-friendly error message
- ✅ **Retry Button** - Attempts to fetch jobs again on demand
- ✅ **Sorting Dropdown** with 3 options:
  - Newest First (by posted date)
  - Budget: High to Low
  - Budget: Low to High
- ✅ **Sorting applies to filtered results** (not full list)

### Code Quality (Q15)
- ✅ **Semantic HTML5** - article, header, section, time, address tags used
- ✅ **Zero inline styles** - All styling via Tailwind CSS classes
- ✅ **Meaningful alt text** on all images
- ✅ **5+ explanatory comments** explaining WHY code works (not WHAT)
- ✅ **Complete README** with setup instructions and AI tools used

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TanStack Router | File-based routing |
| shadcn/ui | Component library |
| Tailwind CSS | Styling |
| Vite | Build tool |
| Bun | Package manager & runtime |

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ or Bun installed
- Git

### Steps to Run Locally

1. Clone the repository
```bash
git clone https://github.com/Allous-pun/job-connect.git
cd job-connect

2. Install dependencies

bash

# Using Bun (recommended)
bun install

# Using npm
npm install

    Start the development server

bash

# Using Bun
bun run dev

# Using npm
npm run dev

    Open your browser


http://localhost:5173

3. Build for Production
bash

bun run build
bun run preview

📁 Project Structure
text

job-connect/
├── src/
│   ├── components/
│   │   ├── jobs/
│   │   │   ├── Header.jsx          # Sticky header with nav
│   │   │   ├── JobsPage.jsx        # Main listings page
│   │   │   ├── JobCard.jsx         # Individual job card
│   │   │   ├── JobCardSkeleton.jsx # Loading skeleton
│   │   │   └── JobModal.jsx        # Modal with proposal form
│   │   └── ui/                     # shadcn/ui components
│   ├── data/
│   │   └── jobs.json               # 12+ local job listings
│   ├── lib/
│   │   ├── jobs-api.js             # Job fetching with error simulation
│   │   └── format.js               # Date/budget formatting utilities
│   ├── routes/
│   │   └── index.tsx               # Main route
│   └── styles.css                  # Global styles
├── package.json
├── README.md
└── .gitignore

🎯 Usage Guide
Filtering Jobs

    Use the search bar to find jobs by title or description

    Select Category from dropdown

    Enter Location (partial matches work)

    Set Max Budget to filter by budget range

    Filters apply instantly - no button needed

Sorting Jobs

Use the Sort By dropdown to reorder results:

    Newest First - shows recent postings at top

    Budget High→Low - highest paying first

    Budget Low→High - lowest paying first

Applying for a Job

    Click any job card to open the details modal

    Fill out the proposal form:

        Cover letter (minimum 100 characters)

        Your proposed budget

        Timeline in days

        Portfolio URL (optional)

    Submit to see success confirmation

Error Recovery

If jobs fail to load (simulated occasionally):

    An error message appears

    Click Retry to attempt fetching again

🤖 AI Tools Used

This project was developed with assistance from:
Tool	Purpose
v0.dev	Component inspiration and Tailwind styling
⚠️ Known Limitations

    Budget Filter - Currently only supports maximum budget (not range filtering)

    Mock Data - All job listings are from local JSON; no backend API integration

    Proposal Submission - Mock success only; does not save to database

    Error Simulation - Fetch failures are simulated; not actual network errors

    No Authentication - Post a Job and Sign In buttons are UI-only placeholders

🔮 Future Improvements

    Connect to real backend API (Node.js/Express + MongoDB)

    User authentication (sign up / login)

    Save proposals to database

    Budget range filter (min to max)

    Infinite scroll pagination

    Dark mode support

    Email notifications for proposals

📄 License

This project is for educational/assessment purposes only.
👤 Author
Aloyce 
📞 Support

For issues or questions, please open a GitHub issue or contact [your email].

Happy job hunting! 🚀
text


## 📝 Additional Files You Should Create

1. `.gitignore` (if missing)
```gitignore
node_modules/
dist/
.env
.DS_Store
*.log

2. Update your package.json scripts section:
json

{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
