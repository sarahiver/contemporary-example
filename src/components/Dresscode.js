import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
`;

const Container = styled.div`
  max-width: 1000px;
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
  color: #fff;
  margin-bottom: 1rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const Subtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.7);
  max-width: 500px;
  margin: 0 auto;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 2.5rem;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: ${p => 0.2 + p.$index * 0.15}s;
  
  &:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-5px);
  }
`;

const CardIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

const CardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const CardList = styled.ul`
  text-align: left;
`;

const CardItem = styled.li`
  font-family: 'Sora', sans-serif;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  
  &:last-child { border: none; }
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
  }
`;

const ColorPalette = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.5s;
`;

const ColorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ColorSwatch = styled.div`
  width: 50px;
  height: 50px;
  background: ${p => p.$color};
  border-radius: 12px;
  border: ${p => p.$border ? '2px solid rgba(255,255,255,0.2)' : 'none'};
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

const ColorName = styled.span`
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
`;

const Note = styled.div`
  margin-top: 3rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: all 0.8s ease;
  transition-delay: 0.6s;
`;

const NoteText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
  margin: 0;
  
  strong { color: #fff; }
`;

function Dresscode({ title = 'Dresscode 👔👗', subtitle = 'Elegante Abendgarderobe in festlichem Rahmen.' }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const colors = [
    { color: '#1a1a2e', name: 'Schwarz' },
    { color: '#4b5563', name: 'Anthrazit' },
    { color: '#6b7280', name: 'Grau' },
    { color: '#ffffff', name: 'Weiß', border: true },
    { color: '#d4af37', name: 'Gold' },
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
    <Section ref={sectionRef} id="dresscode">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Grid>
          <Card $index={0} $visible={visible}>
            <CardIcon $delay="0s">🤵</CardIcon>
            <CardTitle>Für die Herren</CardTitle>
            <CardList>
              <CardItem>Dunkler Anzug</CardItem>
              <CardItem>Hemd mit Krawatte oder Fliege</CardItem>
              <CardItem>Elegante Lederschuhe</CardItem>
              <CardItem>Optional: Einstecktuch</CardItem>
            </CardList>
          </Card>
          
          <Card $index={1} $visible={visible}>
            <CardIcon $delay="0.5s">👰</CardIcon>
            <CardTitle>Für die Damen</CardTitle>
            <CardList>
              <CardItem>Cocktail- oder Abendkleid</CardItem>
              <CardItem>Eleganter Jumpsuit</CardItem>
              <CardItem>Absatzschuhe oder elegante Flats</CardItem>
              <CardItem>Bitte kein Weiß oder Creme</CardItem>
            </CardList>
          </Card>
        </Grid>
        
        <ColorPalette $visible={visible}>
          {colors.map((c, i) => (
            <ColorItem key={i}>
              <ColorSwatch $color={c.color} $border={c.border} />
              <ColorName>{c.name}</ColorName>
            </ColorItem>
          ))}
        </ColorPalette>
        
        <Note $visible={visible}>
          <NoteText>
            <strong>💡 Tipp:</strong> Die Feier findet teils im Freien statt – denkt an einen leichten Überwurf für den Abend!
          </NoteText>
        </Note>
      </Container>
    </Section>
  );
}

export default Dresscode;
