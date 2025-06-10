# Oasis Landing Page

A modern landing page for Oasis - the AI-first client service platform for law firms and legal professionals.

## 🛠 Tech Stack

- Next.js 15.1.5
- React 18.3
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Three.js for 3D animations
- Motion for animations
- Intercom for client communication

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ScienceIsBroken/landingpage
cd landing-page
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗 Project Structure

```
landing-page/
├── src/
│   ├── components/     # Reusable UI components
│   ├── app/           # Next.js app router pages
│   ├── lib/           # Utility functions and configurations
│   └── styles/        # Global styles and Tailwind configurations
├── public/            # Static assets
└── tests/            # Test files
```

## 🧪 Running Tests

```bash
# Run unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run e2e tests
yarn test:e2e
```

## 📦 Building for Production

```bash
# Create production build
yarn build

# Start production server
yarn start
```
