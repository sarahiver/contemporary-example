import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--white);
  position: relative;
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

// Stacked cards layout
const CardsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  
  @media (min-width: 900px) {
    gap: 0;
    position: relative;
  }
`;

const LocationCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '50px'});
  transition: all 0.8s ease;
  transition-delay: ${p => p.index * 0.2}s;
  
  /* Alternate layout */
  &:nth-child(even) {
    .image-side { order: 2; }
    .content-side { order: 1; }
  }
  
  @media (min-width: 900px) {
    /* Sticky stack effect */
    position: sticky;
    top: 150px;
    background: var(--white);
    padding: 2rem;
    margin-bottom: 5rem;
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    
    &:nth-child(even) {
      .image-side { order: 1; }
      .content-side { order: 2; }
    }
  }
`;

const ImageSide = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/3;
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  background: ${p => p.gradient};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  ${LocationCard}:hover & img {
    transform: scale(1.05);
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.gradient};
  
  span {
    font-size: 5rem;
    font-weight: 700;
    color: rgba(255,255,255,0.2);
  }
`;

const TypeBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--black);
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 30px;
  z-index: 5;
`;

const FloatingEmoji = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  font-size: 3rem;
  animation: ${float} 3s ease-in-out infinite;
  z-index: 5;
`;

const ContentSide = styled.div`
  padding: 1rem 0;
`;

const LocationNumber = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: var(--gray-100);
  line-height: 1;
  margin-bottom: 1rem;
`;

const LocationName = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .icon {
    width: 45px;
    height: 45px;
    background: var(--gray-100);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
  
  .text {
    .label {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gray-600);
      margin-bottom: 0.2rem;
    }
    .value {
      font-size: 1rem;
      color: var(--black);
    }
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: var(--gray-600);
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const MapButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--coral);
  color: var(--white);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--coral-dark);
    transform: translateX(5px);
  }
`;

function Locations({
  locations = [
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
    <Section ref={sectionRef} id="location">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Venues</Eyebrow>
          <Title>Where it all happens</Title>
        </Header>
        
        <CardsStack>
          {locations.map((loc, i) => (
            <LocationCard key={i} index={i} visible={visible}>
              <ImageSide className="image-side">
                <TypeBadge>{loc.type}</TypeBadge>
                <FloatingEmoji>{loc.emoji}</FloatingEmoji>
                <ImageWrapper gradient={loc.gradient}>
                  {loc.image ? (
                    <img src={loc.image} alt={loc.name} />
                  ) : (
                    <Placeholder gradient={loc.gradient}>
                      <span>0{i + 1}</span>
                    </Placeholder>
                  )}
                </ImageWrapper>
              </ImageSide>
              
              <ContentSide className="content-side">
                <LocationNumber>0{i + 1}</LocationNumber>
                <LocationName>{loc.name}</LocationName>
                
                <Details>
                  <DetailRow>
                    <div className="icon">📍</div>
                    <div className="text">
                      <div className="label">Location</div>
                      <div className="value">{loc.address}</div>
                    </div>
                  </DetailRow>
                  <DetailRow>
                    <div className="icon">🕐</div>
                    <div className="text">
                      <div className="label">Time</div>
                      <div className="value">{loc.time} Uhr</div>
                    </div>
                  </DetailRow>
                </Details>
                
                <Description>{loc.description}</Description>
                
                {loc.mapUrl && (
                  <MapButton href={loc.mapUrl} target="_blank">
                    Get Directions
                    <span>→</span>
                  </MapButton>
                )}
              </ContentSide>
            </LocationCard>
          ))}
        </CardsStack>
      </Container>
    </Section>
  );
}

export default Locations;
