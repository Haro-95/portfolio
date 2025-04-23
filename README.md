# Portfolio

My personal portfolio website built with Next.js

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Spring

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Haro-95/portfolio.git
```

2. Install dependencies
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

## Environment Setup

For the contact form to work, you need to set up EmailJS credentials:

1. Create a `.env.local` file in the project root with the following variables:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Replace the values with your own EmailJS credentials.

3. For production, set these environment variables in your hosting platform (e.g., Vercel).

---

Developed by Haro Abdulah
