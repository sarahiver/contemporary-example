import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50% { transform: scale(1.1); box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fafafa;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #1a1a2e;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const TimelineWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #8B5CF6, #EC4899, #F97316);
    transform: translateX(-50%);
    border-radius: 4px;
    
    @media (max-width: 768px) {
      left: 24px;
    }
  }
`;

const Event = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center;
  
  &:nth-child(odd) {
    .content { grid-column: 1; text-align: right; }
    .time-card { grid-column: 3; }
  }
  
  &:nth-child(even) {
    .content { grid-column: 3; }
    .time-card { grid-column: 1; text-align: right; }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 48px 1fr;
    gap: 1.5rem;
    
    &:nth-child(odd), &:nth-child(even) {
      .content { grid-column: 2; text-align: left; }
      .time-card { display: none; }
    }
  }
`;

const Dot = styled.div`
  grid-column: 2;
  width: 56px;
  height: 56px;
  background: ${p => p.$active ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : '#fff'};
  border: 4px solid ${p => p.$active ? '#8B5CF6' : '#e5e7eb'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: scale(${p => p.$visible ? 1 : 0});
  transition: all 0.5s ease;
  transition-delay: ${p => p.$delay}s;
  
  ${p => p.$active && css`animation: ${pulse} 2s ease-in-out infinite;`}
  
  @media (max-width: 768px) {
    grid-column: 1;
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }
`;

const Content = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : (p.$fromRight ? '30px' : '-30px')});
  transition: all 0.8s ease;
  transition-delay: ${p => p.$delay}s;
`;

const EventCard = styled.div`
  background: #fff;
  padding: 1.75rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(139, 92, 246, 0.15);
  }
`;

const EventTime = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #8B5CF6;
  margin-bottom: 0.5rem;
  display: inline-block;
  background: rgba(139, 92, 246, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
`;

const EventTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const EventDesc = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
`;

const TimeCard = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: all 0.8s ease;
  transition-delay: ${p => p.$delay}s;
`;

function Timeline({ title = "What's happening", events = [] }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const defaultEvents = [
    { time: '14:00', icon: '💒', title: 'Ceremony', description: 'Standesamtliche Trauung in der Schlosskapelle.', highlight: true },
    { time: '15:00', icon: '🥂', title: 'Champagne & Co', description: 'Sektempfang auf der Terrasse mit Canapés.' },
    { time: '16:00', icon: '📸', title: 'Photo Time', description: 'Gruppenfotos mit allen Gästen im Schlossgarten.' },
    { time: '18:00', icon: '🍽️', title: 'Dinner', description: 'Festliches 4-Gänge-Menü in der Orangerie.', highlight: true },
    { time: '20:00', icon: '🎂', title: 'Cake Cutting', description: 'Anschnitt der dreistöckigen Hochzeitstorte.' },
    { time: '21:00', icon: '💃', title: 'First Dance', description: 'Eröffnungstanz und Start der Party!' },
  ];

  const items = events.length > 0 ? events : defaultEvents;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="timeline">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
        </Header>
        
        <TimelineWrapper>
          {items.map((event, i) => (
            <Event key={i}>
              <Content className="content" $visible={visible} $delay={0.2 + i * 0.1} $fromRight={i % 2 === 0}>
                <EventCard>
                  <EventTime>{event.time}</EventTime>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDesc>{event.description}</EventDesc>
                </EventCard>
              </Content>
              
              <Dot $active={event.highlight} $visible={visible} $delay={0.2 + i * 0.1}>
                {event.icon}
              </Dot>
              
              <TimeCard className="time-card" $visible={visible} $delay={0.2 + i * 0.1}>
                {event.time}
              </TimeCard>
            </Event>
          ))}
        </TimelineWrapper>
      </Container>
    </Section>
  );
}

export default Timeline;
