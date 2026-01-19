import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fafafa;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const Subtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #6b7280;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MapWrapper = styled.div`
  border-radius: 24px;
  overflow: hidden;
  height: 400px;
  background: linear-gradient(135deg, #e0e7ff, #fce7f3);
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const DirectionsContent = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.3s;
`;

const DirectionCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex;
  gap: 1.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: ${p => p.$gradient || 'linear-gradient(135deg, #8B5CF6, #EC4899)'};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
`;

const AddressBox = styled.div`
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1.5rem;
  color: #fff;
`;

const AddressTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const AddressText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  opacity: 0.95;
`;

const AddressButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #8B5CF6;
  background: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }
`;

function Directions({ 
  title = 'Anfahrt 🗺️', 
  subtitle = 'So findet ihr zu uns.',
  address = 'Schloss Heidelberg\nSchlosshof 1\n69117 Heidelberg',
  mapEmbedUrl = '',
  mapsLink = 'https://maps.google.com'
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const directions = [
    { 
      icon: '🚗', 
      title: 'Mit dem Auto', 
      text: 'Über die A5, Ausfahrt Heidelberg. Parkplätze sind direkt am Schloss vorhanden (kostenfrei).',
      gradient: 'linear-gradient(135deg, #8B5CF6, #7c3aed)'
    },
    { 
      icon: '🚆', 
      title: 'Mit der Bahn', 
      text: 'Bis Heidelberg Hbf. Von dort mit der Bergbahn (Linie 1) direkt zum Schloss.',
      gradient: 'linear-gradient(135deg, #EC4899, #db2777)'
    },
    { 
      icon: '✈️', 
      title: 'Mit dem Flugzeug', 
      text: 'Nächster Flughafen: Frankfurt (FRA), ca. 80 km entfernt. Von dort Direktverbindung mit der Bahn.',
      gradient: 'linear-gradient(135deg, #F97316, #ea580c)'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="directions">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Grid>
          <MapWrapper $visible={visible}>
            {mapEmbedUrl ? (
              <iframe 
                src={mapEmbedUrl}
                title="Location Map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#6b7280', fontFamily: 'Sora' }}>
                🗺️ Karte wird geladen...
              </div>
            )}
          </MapWrapper>
          
          <DirectionsContent $visible={visible}>
            {directions.map((dir, i) => (
              <DirectionCard key={i}>
                <IconWrapper $gradient={dir.gradient}>{dir.icon}</IconWrapper>
                <CardContent>
                  <CardTitle>{dir.title}</CardTitle>
                  <CardText>{dir.text}</CardText>
                </CardContent>
              </DirectionCard>
            ))}
            
            <AddressBox>
              <AddressTitle>📍 Adresse</AddressTitle>
              <AddressText style={{ whiteSpace: 'pre-line' }}>{address}</AddressText>
              <AddressButton href={mapsLink} target="_blank" rel="noopener noreferrer">
                In Google Maps öffnen
                <span>→</span>
              </AddressButton>
            </AddressBox>
          </DirectionsContent>
        </Grid>
      </Container>
    </Section>
  );
}

export default Directions;
