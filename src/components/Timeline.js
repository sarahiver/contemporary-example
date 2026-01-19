import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, var(--gray-100) 0%, var(--white) 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--black);
  letter-spacing: -0.03em;
`;

// Zig-Zag timeline layout
const TimelineGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  
  /* Center dashed line */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: repeating-linear-gradient(
      180deg,
      var(--coral) 0px,
      var(--coral) 10px,
      transparent 10px,
      transparent 20px
    );
    transform: translateX(-50%);
    
    @media (max-width: 900px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 3rem;
  align-items: center;
  
  /* Alternate layout */
  &:nth-child(even) {
    .content { grid-column: 3; }
    .empty { grid-column: 1; }
  }
  
  &:nth-child(odd) {
    .content { grid-column: 1; text-align: right; }
    .empty { grid-column: 3; }
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 60px 1fr;
    gap: 1.5rem;
    
    &:nth-child(even), &:nth-child(odd) {
      .content { grid-column: 2; text-align: left; }
      .empty { display: none; }
    }
  }
`;

const TimeMarker = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  
  /* Scale in animation */
  opacity: ${p => p.visible ? 1 : 0};
  transform: scale(${p => p.visible ? 1 : 0});
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: ${p => p.index * 0.15}s;
  
  @media (max-width: 900px) {
    grid-column: 1;
  }
`;

const MarkerCircle = styled.div`
  width: 70px;
  height: 70px;
  background: var(--white);
  border: 4px solid ${p => p.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  animation: ${bounce} 3s ease-in-out infinite;
  animation-delay: ${p => p.index * 0.3}s;
  
  @media (max-width: 900px) {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }
`;

const TimeLabel = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${p => p.color};
  background: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
`;

const Content = styled.div`
  /* Fly in from side */
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateX(${p => p.visible ? 0 : (p.fromRight ? '80px' : '-80px')});
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => 0.1 + p.index * 0.15}s;
`;

const ContentCard = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.12);
  }
  
  /* Color accent bar */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${p => p.color};
  }
`;

const EventTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 0.5rem;
`;

const EventDesc = styled.p`
  font-size: 0.95rem;
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const EventMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: var(--gray-600);
    background: var(--gray-100);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
  }
`;

const Empty = styled.div``;

function Timeline({
  events = [
    { time: '14:00', icon: '💒', title: 'Ceremony', description: 'Die freie Trauung im Garten – bring Taschentücher mit!', location: 'Secret Garden', color: 'var(--coral)' },
    { time: '15:30', icon: '🥂', title: 'Champagne Hour', description: 'Cheers! Cocktails, Häppchen und gute Vibes.', location: 'Terrace', color: 'var(--electric)' },
    { time: '17:00', icon: '📸', title: 'Photo Time', description: 'Gruppenfoto mit allen – seid dabei!', location: 'Main Lawn', color: 'var(--yellow)' },
    { time: '18:30', icon: '🍽️', title: 'Dinner', description: 'Fine Dining mit vegetarischen & veganen Optionen.', location: 'Grand Hall', color: 'var(--purple)' },
    { time: '21:00', icon: '🎤', title: 'Speeches & Cake', description: 'Emotionale Reden und die Hochzeitstorte!', location: 'Grand Hall', color: 'var(--pink)' },
    { time: '22:00', icon: '🎉', title: 'Party Time', description: 'DJ, Dancefloor, bis in den Morgen feiern!', location: 'Dance Hall', color: 'var(--coral)' },
  ],
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
        <Header visible={visible}>
          <Eyebrow>The Schedule</Eyebrow>
          <Title>What's happening</Title>
        </Header>
        
        <TimelineGrid>
          {events.map((event, i) => (
            <TimelineItem key={i}>
              <Content 
                className="content" 
                index={i} 
                visible={visible}
                fromRight={i % 2 === 0}
              >
                <ContentCard color={event.color}>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDesc>{event.description}</EventDesc>
                  <EventMeta>
                    <span>📍 {event.location}</span>
                  </EventMeta>
                </ContentCard>
              </Content>
              
              <TimeMarker index={i} visible={visible}>
                <MarkerCircle color={event.color} index={i}>
                  {event.icon}
                </MarkerCircle>
                <TimeLabel color={event.color}>{event.time}</TimeLabel>
              </TimeMarker>
              
              <Empty className="empty" />
            </TimelineItem>
          ))}
        </TimelineGrid>
      </Container>
    </Section>
  );
}

export default Timeline;
