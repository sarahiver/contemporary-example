import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -20px) rotate(5deg); }
  50% { transform: translate(-10px, -30px) rotate(-5deg); }
  75% { transform: translate(-20px, 10px) rotate(3deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 0.8; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
  background-size: 400% 400%;
  animation: ${gradientMove} 15s ease infinite;
`;

const IncludedBadge = styled.div`
  position: absolute;
  top: 100px;
  right: 2rem;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
  
  &::before { content: '✓'; }
`;

const FloatingBlob = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${p => p.$gradient || 'linear-gradient(135deg, #8B5CF6, #EC4899)'};
  filter: blur(${p => p.$blur || '80px'});
  opacity: ${p => p.$opacity || 0.5};
  width: ${p => p.$size || '400px'};
  height: ${p => p.$size || '400px'};
  animation: ${float} ${p => p.$duration || '8s'} ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
`;

const Eyebrow = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 0.2s;
`;

const Names = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 14vw, 9rem);
  font-weight: 700;
  color: #fff;
  line-height: 0.95;
  margin-bottom: 2rem;
  
  .name {
    display: block;
    opacity: 0;
    animation: ${slideUp} 0.8s ease forwards;
    
    &:nth-child(1) { animation-delay: 0.4s; }
    &:nth-child(2) { animation-delay: 0.5s; }
    &:nth-child(3) { animation-delay: 0.6s; }
  }
  
  .ampersand {
    font-size: 0.35em;
    background: linear-gradient(135deg, #8B5CF6, #EC4899, #F97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    margin: 0.3rem 0;
    animation: ${pulse} 3s ease-in-out infinite;
  }
`;

const DateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  padding: 1.25rem 2.5rem;
  border-radius: 60px;
  border: 1px solid rgba(255,255,255,0.2);
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 0.8s;
  
  span {
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .divider {
    width: 6px;
    height: 6px;
    background: linear-gradient(135deg, #8B5CF6, #EC4899);
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 1s;
  box-shadow: 0 4px 30px rgba(139, 92, 246, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 40px rgba(139, 92, 246, 0.5);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 1.2s;
  
  span {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }
`;

const ScrollDot = styled.div`
  width: 26px;
  height: 44px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 13px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 10px;
    background: linear-gradient(180deg, #8B5CF6, #EC4899);
    border-radius: 4px;
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;

function Hero({ name1 = 'Sophie', name2 = 'Max', date = '15. August 2026', location = 'Schloss Heidelberg', showBadge = false }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Section id="top">
      {showBadge && <IncludedBadge>Inklusive</IncludedBadge>}
      
      <FloatingBlob $gradient="linear-gradient(135deg, #8B5CF6, #EC4899)" $size="500px" style={{ top: '5%', left: '-15%' }} $duration="10s" />
      <FloatingBlob $gradient="linear-gradient(135deg, #EC4899, #F97316)" $size="400px" style={{ top: '50%', right: '-10%' }} $duration="12s" $delay="2s" />
      <FloatingBlob $gradient="linear-gradient(135deg, #F97316, #8B5CF6)" $size="300px" style={{ bottom: '5%', left: '20%' }} $duration="8s" $delay="1s" $opacity="0.4" />
      <FloatingBlob $gradient="linear-gradient(135deg, #667eea, #764ba2)" $size="250px" style={{ top: '30%', left: '10%' }} $duration="15s" $delay="3s" $opacity="0.3" />
      
      <Content>
        <Eyebrow>Wir heiraten</Eyebrow>
        <Names>
          <span className="name">{name1}</span>
          <span className="name ampersand">&</span>
          <span className="name">{name2}</span>
        </Names>
        
        <DateBadge>
          <span>📅 {date}</span>
          <div className="divider" />
          <span>📍 {location}</span>
        </DateBadge>
        
        <CTAButton href="#rsvp">
          Zur Zusage
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </CTAButton>
      </Content>
      
      <ScrollIndicator>
        <span>Scroll</span>
        <ScrollDot />
      </ScrollIndicator>
    </Section>
  );
}

export default Hero;
