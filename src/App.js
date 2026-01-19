import React, { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import LoveStory from './components/LoveStory';
import Timeline from './components/Timeline';
import Locations from './components/Locations';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Gifts from './components/Gifts';
import FAQ from './components/FAQ';
import WeddingABC from './components/WeddingABC';
import PhotoUpload from './components/PhotoUpload';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [rsvpResponses, setRsvpResponses] = useState([
    { name: 'Lisa & Thomas Meier', email: 'lisa@email.de', status: 'yes', guests: 2, menu: 'Vegetarisch', date: '2024-03-15' },
    { name: 'Anna Weber', email: 'anna@email.de', status: 'yes', guests: 1, menu: 'Vegan', date: '2024-03-14' },
    { name: 'Familie Müller', email: 'mueller@email.de', status: 'no', guests: 0, menu: '-', date: '2024-03-13' },
    { name: 'Max Hoffmann', email: 'max@email.de', status: 'pending', guests: 0, menu: '-', date: '-' },
  ]);
  const [uploadedPhotos, setUploadedPhotos] = useState([
    { url: null, guestName: 'Lisa Meier' },
    { url: null, guestName: 'Anna Weber' },
    { url: null, guestName: 'Thomas Meier' },
    { url: null, guestName: 'Lisa Meier' },
  ]);

  // Wedding Data - Contemporary Style
  const weddingData = {
    couple: {
      name1: 'Sophie',
      name2: 'Max',
      coupleNames: 'Sophie & Max',
    },
    wedding: {
      date: '2025-10-12T14:00:00',
      dateFormatted: '12. Oktober 2025',
      location: 'Berlin, Germany',
    },
    navLinks: [
      { label: 'Story', href: '#story' },
      { label: 'Details', href: '#location' },
      { label: 'Schedule', href: '#timeline' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'FAQ', href: '#faq' },
    ],
    milestones: [
      { year: '2020', title: 'The Match', text: 'Eines Abends, ein Match auf Bumble – und plötzlich schrieben wir bis 3 Uhr morgens. Zwei Wochen später das erste Date.', image: null, colors: ['var(--coral)', 'var(--pink)'] },
      { year: '2021', title: 'Moving In', text: 'Ein verrückter Umzug während Corona. 40m², zwei Laptops, eine Kaffeemaschine – und trotzdem das größte Glück.', image: null, colors: ['var(--electric)', 'var(--purple)'] },
      { year: '2022', title: 'Adventure Time', text: 'Roadtrip durch Portugal, Surfen in Bali, Camping in Schweden. Gemeinsam die Welt entdecken.', image: null, colors: ['var(--yellow)', 'var(--coral)'] },
      { year: '2024', title: 'The Question', text: 'Auf dem Tempelhofer Feld bei Sonnenuntergang. Ein Ring, eine Frage, unendlich viele Tränen der Freude.', image: null, colors: ['var(--purple)', 'var(--electric)'] },
    ],
    locations: [
      { 
        type: 'Ceremony', 
        name: 'Secret Garden', 
        address: 'Mitte, Berlin', 
        time: '14:00', 
        description: 'Eine versteckte Oase mitten in der Stadt. Hier sagen wir "Ja" unter freiem Himmel, umgeben von wilden Blumen und alten Bäumen.', 
        image: null, 
        emoji: '🌿',
        mapUrl: 'https://maps.google.com',
        gradient: 'linear-gradient(135deg, var(--coral), var(--pink))'
      },
      { 
        type: 'Celebration', 
        name: 'The Loft', 
        address: 'Kreuzberg, Berlin', 
        time: '18:00', 
        description: 'Industrial Chic meets Boho Vibes. Hohe Decken, exposed brick walls und die beste Tanzfläche der Stadt.', 
        image: null, 
        emoji: '🎉',
        mapUrl: 'https://maps.google.com',
        gradient: 'linear-gradient(135deg, var(--electric), var(--purple))'
      },
    ],
    timelineEvents: [
      { time: '14:00', icon: '💒', title: 'Ceremony', description: 'Die freie Trauung im Garten – bring Taschentücher mit!', location: 'Secret Garden', color: 'var(--coral)' },
      { time: '15:30', icon: '🥂', title: 'Champagne Hour', description: 'Cheers! Cocktails, Häppchen und gute Vibes.', location: 'Terrace', color: 'var(--electric)' },
      { time: '17:00', icon: '📸', title: 'Photo Time', description: 'Gruppenfoto mit allen – seid dabei!', location: 'Main Lawn', color: 'var(--yellow)' },
      { time: '18:30', icon: '🍽️', title: 'Dinner', description: 'Fine Dining mit vegetarischen & veganen Optionen.', location: 'Grand Hall', color: 'var(--purple)' },
      { time: '21:00', icon: '🎤', title: 'Speeches & Cake', description: 'Emotionale Reden und die Hochzeitstorte!', location: 'Grand Hall', color: 'var(--pink)' },
      { time: '22:00', icon: '🎉', title: 'Party Time', description: 'DJ, Dancefloor, bis in den Morgen feiern!', location: 'Dance Hall', color: 'var(--coral)' },
    ],
    galleryImages: Array(12).fill(null).map((_, i) => ({ 
      src: null, 
      alt: `Photo ${i + 1}`,
      size: i % 5 === 0 ? 'large' : i % 3 === 0 ? 'medium' : 'small'
    })),
    faqs: [
      { question: 'Dresscode?', answer: 'Smart Casual mit einem Twist! Denkt an bunte Farben und bequeme Schuhe zum Tanzen. Kein Weiß bitte – das ist für die Braut reserviert! 👗', avatar: '👔' },
      { question: 'Begleitung?', answer: 'Schaut auf eure Einladung – dort steht, wer alles eingeladen ist. Bei Fragen meldet euch gerne direkt bei uns! 💌', avatar: '💑' },
      { question: 'Kinder?', answer: 'We love kids! Es gibt eine Kinderbetreuung und ein spezielles Kindermenü. Bringt eure Kleinen gerne mit! 👶', avatar: '👶' },
      { question: 'Geschenke?', answer: 'Eure Anwesenheit ist das größte Geschenk! Wer dennoch etwas beitragen möchte, freuen wir uns über einen Beitrag zu unserer Hochzeitsreise. 🎁', avatar: '🎁' },
      { question: 'Fotos?', answer: 'Unplugged Ceremony bitte! Bei der Feier dürft ihr dann alles knipsen und teilen. #SophieUndMax 📸', avatar: '📸' },
      { question: 'Parken?', answer: 'Kostenlose Parkplätze direkt an der Location. Für die Party-People: Taxi oder Uber empfohlen! 🚗', avatar: '🚗' },
    ],
    abcEntries: [
      { letter: 'A', title: 'Anfahrt', text: 'Mit der U-Bahn bis Kreuzberg, dann 5 min zu Fuß. Parkplätze direkt an der Location.' },
      { letter: 'B', title: 'Bar', text: 'Open Bar die ganze Nacht! Cocktails, Bier, Wein – alles da!' },
      { letter: 'D', title: 'Dresscode', text: 'Smart Casual mit einem Twist. Bunte Farben erlaubt, Weiß bitte nicht.' },
      { letter: 'F', title: 'Fotos', text: 'Unplugged Ceremony! Bei der Party: #SophieUndMax' },
      { letter: 'K', title: 'Kids', text: 'Herzlich willkommen! Kinderbetreuung und Spielecke vorhanden.' },
      { letter: 'M', title: 'Music', text: 'DJ ab 22 Uhr. Songrequests? Her damit – im RSVP-Formular!' },
      { letter: 'P', title: 'Parken', text: 'Kostenlose Parkplätze vorhanden. Für die Feierwütigen: Taxi empfohlen!' },
      { letter: 'T', title: 'Taxi', text: 'Sammelruf um 3 Uhr morgens. Alternativ: Uber funktioniert super!' },
      { letter: 'U', title: 'Unterkunft', text: 'Hotelkontingent im "The Hotel" – Code "SophieMax" für 15% Rabatt.' },
      { letter: 'W', title: 'Wetter', text: 'Plan B bei Regen: Alles findet indoor statt. Keine Sorge!' },
    ],
    gifts: {
      intro: 'Eure Anwesenheit ist uns das Wichtigste! Wer uns dennoch beschenken möchte, findet hier einige Ideen.',
      honeymoonText: 'Wir träumen von einem Abenteuer nach der Hochzeit! Ob Road Trip durch Kalifornien oder Strandurlaub in Thailand – jeder Beitrag bringt uns dem Traum näher.',
      bankDetails: {
        recipient: 'Sophie & Max Mustermann',
        iban: 'DE89 3704 0044 0532 0130 00',
        bic: 'COBADEFFXXX',
        reference: 'Adventure Fund ✈️',
      },
      wishlistUrl: null,
    },
    rsvp: {
      deadline: '15. September 2025',
      menuOptions: ['Vegetarisch', 'Vegan', 'Fleisch', 'Fisch'],
    },
    contact: {
      email: 'hello@sophieundmax.de',
    },
  };

  const handleRsvpSubmit = (data) => {
    const newResponse = {
      ...data,
      status: data.attendance,
      date: new Date().toISOString().split('T')[0],
    };
    setRsvpResponses([...rsvpResponses, newResponse]);
  };

  const handlePhotoUpload = (files, guestName) => {
    const newPhotos = files.map(file => ({
      url: URL.createObjectURL(file),
      guestName,
    }));
    setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
  };

  const handleLogin = (email, password) => {
    if (email === 'demo' && password === 'demo') {
      setIsAdmin(true);
    }
  };

  // Admin View
  if (isAdmin) {
    return (
      <>
        <GlobalStyles />
        <Navigation 
          coupleNames={weddingData.couple.coupleNames}
          weddingDate={weddingData.wedding.dateFormatted}
          links={weddingData.navLinks}
        />
        <AdminDashboard
          coupleNames={weddingData.couple.coupleNames}
          rsvpData={rsvpResponses}
          photos={uploadedPhotos}
          onLogout={() => setIsAdmin(false)}
        />
      </>
    );
  }

  // Guest View
  return (
    <>
      <GlobalStyles />
      <Navigation 
        coupleNames={weddingData.couple.coupleNames}
        weddingDate={weddingData.wedding.dateFormatted}
        links={weddingData.navLinks}
      />
      <Hero
        name1={weddingData.couple.name1}
        name2={weddingData.couple.name2}
        date={weddingData.wedding.dateFormatted}
        location={weddingData.wedding.location}
      />
      <Countdown weddingDate={weddingData.wedding.date} />
      <LoveStory milestones={weddingData.milestones} />
      <Locations locations={weddingData.locations} />
      <Timeline events={weddingData.timelineEvents} />
      <RSVP
        deadline={weddingData.rsvp.deadline}
        menuOptions={weddingData.rsvp.menuOptions}
        onSubmit={handleRsvpSubmit}
      />
      <Gallery images={weddingData.galleryImages} />
      <Gifts
        intro={weddingData.gifts.intro}
        honeymoonText={weddingData.gifts.honeymoonText}
        bankDetails={weddingData.gifts.bankDetails}
        wishlistUrl={weddingData.gifts.wishlistUrl}
      />
      <FAQ 
        faqs={weddingData.faqs}
        contactEmail={weddingData.contact.email}
      />
      <WeddingABC entries={weddingData.abcEntries} />
      <PhotoUpload
        onUpload={handlePhotoUpload}
        totalPhotos={uploadedPhotos.length}
        totalGuests={new Set(uploadedPhotos.map(p => p.guestName)).size}
      />
      <Footer
        coupleNames={weddingData.couple.coupleNames}
        tagline="Can't wait to celebrate our love story with all of you!"
        links={weddingData.navLinks.slice(0, 3)}
        quickLinks={[
          { label: 'Gallery', href: '#gallery' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Wedding ABC', href: '#abc' },
        ]}
        onLogin={handleLogin}
        adminEmail="demo"
        adminPassword="demo"
      />
    </>
  );
}

export default App;
