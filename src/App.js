import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import WeddingPage from './components/WeddingPage';

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║  CONTEMPORARY WEDDING THEME - Configuration                               ║
// ║  Brutalist Style: Bold Colors, Hard Shadows, Space Grotesk                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

const config = {
  // ─────────────────────────────────────────────────────────────────────────
  // COUPLE INFO
  // ─────────────────────────────────────────────────────────────────────────
  coupleNames: {
    name1: 'Sophie',
    name2: 'Max',
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // WEDDING DATE & LOCATION
  // ─────────────────────────────────────────────────────────────────────────
  weddingDate: '2025-08-15T14:00:00',  // ISO format for countdown
  displayDate: '15. August 2025',       // Display format
  location: 'Schloss Heidelberg',
  
  // ─────────────────────────────────────────────────────────────────────────
  // NAVIGATION LINKS (leave empty for defaults)
  // ─────────────────────────────────────────────────────────────────────────
  navLinks: [
    { label: 'Story', href: '#story' },
    { label: 'Location', href: '#location' },
    { label: 'Ablauf', href: '#timeline' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
  ],
  
  // ─────────────────────────────────────────────────────────────────────────
  // ACTIVE COMPONENTS (set to false to hide)
  // ─────────────────────────────────────────────────────────────────────────
  activeComponents: {
    hero: true,
    countdown: true,
    loveStory: true,
    locations: true,
    timeline: true,
    directions: true,
    gallery: true,
    rsvp: true,
    dresscode: true,
    accommodations: true,
    gifts: true,
    musicWishes: true,
    guestbook: true,
    weddingABC: true,
    photoUpload: true,
    faq: true,
    contact: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // ADMIN CREDENTIALS
  // ─────────────────────────────────────────────────────────────────────────
  adminCredentials: {
    username: 'admin',
    password: 'wedding2025',
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // DATABASE (Supabase) - Add your credentials
  // ─────────────────────────────────────────────────────────────────────────
  supabase: {
    url: '',      // Your Supabase project URL
    anonKey: '',  // Your Supabase anon key
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // PHOTO UPLOAD (Cloudinary) - Add your credentials
  // ─────────────────────────────────────────────────────────────────────────
  cloudinary: {
    cloudName: '',   // Your Cloudinary cloud name
    uploadPreset: '', // Your upload preset
  },
};

function App() {
  return (
    <>
      <GlobalStyles />
      <WeddingPage config={config} />
    </>
  );
}

export default App;
