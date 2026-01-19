import React from 'react';
import WeddingPage from './components/WeddingPage';

function App() {
  // Wedding Configuration
  // Customize these values for each wedding
  const weddingConfig = {
    // Couple Information
    coupleNames: 'Sophie & Max',
    name1: 'Sophie',
    name2: 'Max',
    weddingDate: '2025-08-15T14:00:00',
    location: 'Schloss Heidelberg',
    
    // Active Components (set to false to hide)
    activeComponents: {
      navigation: true,
      hero: true,
      countdown: true,
      loveStory: true,
      locations: true,
      timeline: true,
      directions: true,
      rsvp: true,
      dresscode: true,
      gifts: true,
      accommodations: true,
      contact: true,
      gallery: true,
      musicWishes: true,
      guestbook: true,
      faq: true,
      weddingABC: true,
      photoUpload: true,
      footer: true,
    },
    
    // Show "Inklusive" Badges (for marketing display)
    showBadges: {
      hero: true,
      navigation: true,
      loveStory: true,
      rsvp: true,
      adminDashboard: true,
      footer: true,
    },
    
    // Navigation Links
    navLinks: [
      { label: 'Story', href: '#story' },
      { label: 'Location', href: '#location' },
      { label: 'Ablauf', href: '#timeline' },
      { label: 'RSVP', href: '#rsvp' },
      { label: 'FAQ', href: '#faq' },
    ],
    
    // Admin Credentials
    adminEmail: 'admin',
    adminPassword: 'password',
    
    // Supabase Configuration (add your credentials)
    // supabaseUrl: 'YOUR_SUPABASE_URL',
    // supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
    
    // Cloudinary Configuration (add your credentials)
    // cloudinaryCloudName: 'YOUR_CLOUD_NAME',
    // cloudinaryUploadPreset: 'YOUR_UPLOAD_PRESET',
  };

  return <WeddingPage config={weddingConfig} />;
}

export default App;
