import React from 'react';

const Header = () => (
  <header className="bg-white shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 py-3">
      <h1 className="text-xl font-bold">Synapse Learn</h1>
    </nav>
  </header>
);

const HeroSection = () => (
  <section className="py-12 text-center">
    <h2 className="text-4xl font-bold mb-4">Welcome to Synapse Learn</h2>
    <p className="text-xl text-gray-600">Your personalized learning journey begins here</p>
  </section>
);

const FeaturesSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
      {/* Add feature items here */}
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="py-12">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
      {/* Add steps here */}
    </div>
  </section>
);

const PersonalizedPlanSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Learning Plan</h2>
      {/* Add plan content here */}
    </div>
  </section>
);

const InterfacePreview = () => (
  <section className="py-12">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Interface Preview</h2>
      {/* Add preview content here */}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} Synapse Learn. All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-gray-50 font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PersonalizedPlanSection />
        <InterfacePreview />
      </main>
      <Footer />
    </div>
  );
}
