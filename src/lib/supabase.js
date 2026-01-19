import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ═══════════════════════════════════════════════════════════════════════════
// RSVP FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const submitRSVP = async (data) => {
  if (!supabase) return { error: 'Supabase not configured' };
  
  const { data: result, error } = await supabase
    .from('rsvp')
    .insert([{
      name: data.name,
      email: data.email,
      attending: data.attending,
      guests: parseInt(data.guests) || 1,
      menu: data.menu || null,
      dietary: data.dietary || null,
      song: data.song || null,
      message: data.message || null,
      created_at: new Date().toISOString(),
    }]);
  
  return { data: result, error };
};

export const getRSVPs = async () => {
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// ═══════════════════════════════════════════════════════════════════════════
// GUESTBOOK FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const submitGuestbookEntry = async (data) => {
  if (!supabase) return { error: 'Supabase not configured' };
  
  const { data: result, error } = await supabase
    .from('guestbook')
    .insert([{
      name: data.name,
      email: data.email,
      message: data.message,
      created_at: new Date().toISOString(),
    }]);
  
  return { data: result, error };
};

export const getGuestbookEntries = async () => {
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// ═══════════════════════════════════════════════════════════════════════════
// MUSIC WISHES FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const submitMusicWish = async (data) => {
  if (!supabase) return { error: 'Supabase not configured' };
  
  const { data: result, error } = await supabase
    .from('music_wishes')
    .insert([{
      name: data.name,
      song: data.song,
      artist: data.artist,
      message: data.message || null,
      created_at: new Date().toISOString(),
    }]);
  
  return { data: result, error };
};

export const getMusicWishes = async () => {
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('music_wishes')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const savePhotoUrl = async (url, uploadedBy = 'Guest') => {
  if (!supabase) return { error: 'Supabase not configured' };
  
  const { data: result, error } = await supabase
    .from('photos')
    .insert([{
      url,
      uploaded_by: uploadedBy,
      created_at: new Date().toISOString(),
    }]);
  
  return { data: result, error };
};

export const getPhotos = async () => {
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// ═══════════════════════════════════════════════════════════════════════════
// GIFTS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const reserveGift = async (giftId, reservedBy) => {
  if (!supabase) return { error: 'Supabase not configured' };
  
  const { data: result, error } = await supabase
    .from('gifts')
    .update({ reserved: true, reserved_by: reservedBy })
    .eq('id', giftId);
  
  return { data: result, error };
};

export const getGifts = async () => {
  if (!supabase) return { data: [], error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('gifts')
    .select('*')
    .order('name');
  
  return { data, error };
};

/*
═══════════════════════════════════════════════════════════════════════════════
SQL SCHEMA - Run this in your Supabase SQL Editor
═══════════════════════════════════════════════════════════════════════════════

-- RSVP Table
CREATE TABLE rsvp (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INTEGER DEFAULT 1,
  menu TEXT,
  dietary TEXT,
  song TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guestbook Table
CREATE TABLE guestbook (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Music Wishes Table
CREATE TABLE music_wishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  song TEXT NOT NULL,
  artist TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Photos Table
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gifts Table
CREATE TABLE gifts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT,
  emoji TEXT,
  reserved BOOLEAN DEFAULT FALSE,
  reserved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

*/
