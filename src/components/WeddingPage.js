import React, { useState } from 'react';
import GlobalStyles from '../styles/GlobalStyles';

// Import all 20 components
import Navigation from './Navigation';
import Hero from './Hero';
import Countdown from './Countdown';
import LoveStory from './LoveStory';
import Locations from './Locations';
import Timeline from './Timeline';
import Directions from './Directions';
import RSVP from './RSVP';
import Dresscode from './Dresscode';
import Gifts from './Gifts';
import Accommodations from './Accommodations';
import Contact from './Contact';
import Gallery from './Gallery';
import MusicWishes from './MusicWishes';
import Guestbook from './Guestbook';
import FAQ from './FAQ';
import WeddingABC from './WeddingABC';
import PhotoUpload from './PhotoUpload';
import AdminDashboard from './AdminDashboard';
import Footer from './Footer';

function WeddingPage({ config = {} }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Default configuration
  const defaultConfig = {
    coupleNames: 'Sophie & Max',
    weddingDate: '2025-08-15T14:00:00',
    name1: 'Sophie',
    name2: 'Max',
    location: 'Schloss Heidelberg',
    
    // Component visibility
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
    
    // Show "Inklusive" badges
    showBadges: {
      hero: true,
      navigation: true,
      loveStory: true,
      rsvp: true,
      adminDashboard: true,
      footer: true,
    },
    
    // Navigation links
    navLinks: [
      { label: 'Story', href: '#story' },
      { label: 'Location', href: '#location' },
      { label: 'Ablauf', href: '#timeline' },
      { label: 'RSVP', href: '#rsvp' },
      { label: 'FAQ', href: '#faq' },
    ],
    
    // Admin credentials
    adminEmail: 'admin',
    adminPassword: 'password',
  };

  const cfg = { ...defaultConfig, ...config };
  const active = cfg.activeComponents;
  const badges = cfg.showBadges;

  // Handlers
  const handleRSVPSubmit = async (data) => {
    console.log('RSVP submitted:', data);
    // Integrate with Supabase here
  };

  const handlePhotoUpload = async (files) => {
    console.log('Photos uploaded:', files);
    // Integrate with Cloudinary here
  };

  const handleAdminLogin = (email, password) => {
    if (email === cfg.adminEmail && password === cfg.adminPassword) {
      setIsAdmin(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // Render Admin Dashboard if logged in
  if (isAdmin) {
    return (
      <>
        <GlobalStyles />
        <AdminDashboard 
          coupleNames={cfg.coupleNames}
          onLogout={handleAdminLogout}
          showBadge={badges.adminDashboard}
        />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      
      {active.navigation && (
        <Navigation 
          coupleNames={cfg.coupleNames}
          links={cfg.navLinks}
          showBadge={badges.navigation}
        />
      )}
      
      {active.hero && (
        <Hero 
          name1={cfg.name1}
          name2={cfg.name2}
          date={new Date(cfg.weddingDate).toLocaleDateString('de-DE', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
          location={cfg.location}
          showBadge={badges.hero}
        />
      )}
      
      {active.countdown && (
        <Countdown 
          weddingDate={cfg.weddingDate}
        />
      )}
      
      {active.loveStory && (
        <LoveStory 
          showBadge={badges.loveStory}
        />
      )}
      
      {active.locations && (
        <Locations />
      )}
      
      {active.timeline && (
        <Timeline />
      )}
      
      {active.directions && (
        <Directions />
      )}
      
      {active.rsvp && (
        <RSVP 
          onSubmit={handleRSVPSubmit}
          showBadge={badges.rsvp}
        />
      )}
      
      {active.gallery && (
        <Gallery />
      )}
      
      {active.gifts && (
        <Gifts />
      )}
      
      {active.faq && (
        <FAQ />
      )}
      
      {active.weddingABC && (
        <WeddingABC />
      )}
      
      {active.photoUpload && (
        <PhotoUpload 
          onUpload={handlePhotoUpload}
        />
      )}
      
      {active.dresscode && (
        <Dresscode />
      )}
      
      {active.accommodations && (
        <Accommodations />
      )}
      
      {active.contact && (
        <Contact />
      )}
      
      {active.musicWishes && (
        <MusicWishes />
      )}
      
      {active.guestbook && (
        <Guestbook />
      )}
      
      {active.footer && (
        <Footer 
          coupleNames={cfg.coupleNames}
          onLogin={handleAdminLogin}
          adminEmail={cfg.adminEmail}
          adminPassword={cfg.adminPassword}
          showBadge={badges.footer}
        />
      )}
    </>
  );
}

export default WeddingPage;
