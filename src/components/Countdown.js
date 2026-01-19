import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50% { box-shadow: 0 0 0 20px rgba(139, 92, 246, 0); }
`;

const flip = keyframes`
  0% { transform: rotateX(0); }
  50% { transform: rotateX(-90deg); }
  100% { transform: rotateX(0); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #fafafa 0%, #fff 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #8B5CF6;
  margin-bottom: 1rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  
  &::before, &::after {
    content: '✦';
    color: #EC4899;
  }
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 3rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const CountdownCard = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.08));
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 28px;
  padding: 2.5rem 1rem;
  position: relative;
  overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${p => 0.2 + p.$index * 0.1}s;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${p => p.$index * 0.3}s;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #8B5CF6, #EC4899, #F97316, #8B5CF6);
    background-size: 300% 100%;
    animation: ${shimmer} 3s linear infinite;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.3);
  }
`;

const Number = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.75rem;
  transition: transform 0.3s ease;
  
  ${CountdownCard}:hover & {
    transform: scale(1.05);
  }
`;

const Label = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7280;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  padding: 1.25rem 3rem;
  border-radius: 60px;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 0 6px 30px rgba(139, 92, 246, 0.35);
  animation: ${pulse} 2.5s ease-in-out infinite;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.45);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.15s;
  
  span {
    font-family: 'Sora', sans-serif;
    font-size: 0.9rem;
    color: #6b7280;
  }
  
  .icon {
    font-size: 1.1rem;
  }
`;

function Countdown({ weddingDate = '2026-08-15T14:00:00', title = 'Time is ticking', subtitle = '15. August 2026' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    { value: timeLeft.days, label: 'Tage' },
    { value: timeLeft.hours, label: 'Stunden' },
    { value: timeLeft.minutes, label: 'Minuten' },
    { value: timeLeft.seconds, label: 'Sekunden' },
  ];

  return (
    <Section ref={sectionRef} id="countdown">
      <Container>
        <Eyebrow $visible={visible}>Countdown</Eyebrow>
        <Title $visible={visible}>{title}</Title>
        <DateDisplay $visible={visible}>
          <span className="icon">📅</span>
          <span>{subtitle}</span>
        </DateDisplay>
        
        <CountdownGrid>
          {items.map((item, i) => (
            <CountdownCard key={i} $index={i} $visible={visible}>
              <Number>{String(item.value).padStart(2, '0')}</Number>
              <Label>{item.label}</Label>
            </CountdownCard>
          ))}
        </CountdownGrid>
        
        <CTAButton href="#rsvp" $visible={visible} style={{ transitionDelay: '0.6s' }}>
          Let's make it epic
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </CTAButton>
      </Container>
    </Section>
  );
}

export default Countdown;
