import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fff;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Eyebrow = styled.div`
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
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #1a1a2e;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.8s ease;
  transition-delay: ${p => 0.2 + p.$index * 0.15}s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 220px;
  background: ${p => p.$image ? `url(${p.$image}) center/cover` : 'linear-gradient(135deg, #667eea, #764ba2, #EC4899)'};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%);
  }
`;

const CardBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8B5CF6;
  z-index: 1;
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const CardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
`;

const CardDetail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  
  .icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  
  .text {
    font-family: 'Sora', sans-serif;
    font-size: 0.9rem;
    color: #6b7280;
    line-height: 1.5;
  }
`;

const CardButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #8B5CF6;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #EC4899;
    gap: 0.75rem;
  }
`;

function Locations({ title = 'Where it all happens', locations = [] }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const defaultLocations = [
    { 
      type: 'Zeremonie', 
      name: 'Schloss Heidelberg', 
      address: 'Schlosshof 1, 69117 Heidelberg', 
      time: '14:00 Uhr',
      description: 'Die Trauung findet in der historischen Schlosskapelle statt.',
      image: null, 
      mapUrl: 'https://maps.google.com' 
    },
    { 
      type: 'Feier', 
      name: 'Orangerie im Schlosspark', 
      address: 'Schlosspark 5, 69117 Heidelberg', 
      time: 'Ab 16:00 Uhr',
      description: 'Hier feiern wir bis in die Nacht mit Dinner, Musik und Tanz.',
      image: null, 
      mapUrl: 'https://maps.google.com' 
    },
  ];

  const items = locations.length > 0 ? locations : defaultLocations;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="location">
      <Container>
        <Header>
          <Eyebrow $visible={visible}>📍 Die Locations</Eyebrow>
          <Title $visible={visible}>{title}</Title>
        </Header>
        
        <Grid>
          {items.map((loc, i) => (
            <Card key={i} $index={i} $visible={visible}>
              <CardImage $image={loc.image}>
                <CardBadge>{loc.type}</CardBadge>
              </CardImage>
              <CardContent>
                <CardTitle>{loc.name}</CardTitle>
                <CardDetail>
                  <span className="icon">📍</span>
                  <span className="text">{loc.address}</span>
                </CardDetail>
                <CardDetail>
                  <span className="icon">🕐</span>
                  <span className="text">{loc.time}</span>
                </CardDetail>
                {loc.description && (
                  <CardDetail>
                    <span className="icon">✨</span>
                    <span className="text">{loc.description}</span>
                  </CardDetail>
                )}
                {loc.mapUrl && (
                  <CardButton href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                    Route anzeigen
                    <span>→</span>
                  </CardButton>
                )}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default Locations;
