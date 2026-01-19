import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fff;
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
  max-width: 500px;
  margin: 0 auto;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #f9fafb;
  border-radius: 24px;
  overflow: hidden;
  border: 2px solid transparent;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: ${p => 0.2 + p.$index * 0.1}s;
  
  &:hover {
    border-color: #8B5CF6;
    box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15);
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  background: ${p => p.$image ? `url(${p.$image}) center/cover` : 'linear-gradient(135deg, #e0e7ff, #fce7f3)'};
  position: relative;
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const CardDistance = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.8rem;
  color: #8B5CF6;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardDesc = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CardPrice = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
  
  span { font-size: 0.85rem; font-weight: 400; color: #6b7280; }
`;

const CardButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
  }
`;

const Note = styled.div`
  margin-top: 3rem;
  background: #f9fafb;
  border-radius: 20px;
  padding: 2rem;
  border-left: 4px solid #8B5CF6;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.5s;
`;

const NoteTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const NoteText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  
  strong { color: #8B5CF6; }
`;

function Accommodations({ title = 'Unterkünfte 🏨', subtitle = 'Wir haben einige Hotels in der Nähe für euch zusammengestellt.', accommodations = [], bookingCode = 'Hochzeit Sophie & Max' }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const defaultAccommodations = [
    { name: 'Hotel Schlossblick', distance: '500m zur Location', description: 'Unser Top-Tipp! Wir haben ein Kontingent reserviert.', price: 'ab 120€', url: '#', image: null, recommended: true },
    { name: 'Boutique Hotel Am Markt', distance: '1,2 km zur Location', description: 'Charmantes Hotel in der Altstadt mit modernem Design.', price: 'ab 95€', url: '#', image: null },
    { name: 'Pension Heidelberg', distance: '800m zur Location', description: 'Gemütliche Pension mit familiärer Atmosphäre.', price: 'ab 65€', url: '#', image: null },
  ];

  const items = accommodations.length > 0 ? accommodations : defaultAccommodations;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="accommodations">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Grid>
          {items.map((acc, i) => (
            <Card key={i} $index={i} $visible={visible}>
              <CardImage $image={acc.image}>
                {acc.recommended && <RecommendedBadge>⭐ Empfehlung</RecommendedBadge>}
              </CardImage>
              <CardContent>
                <CardName>{acc.name}</CardName>
                <CardDistance>📍 {acc.distance}</CardDistance>
                <CardDesc>{acc.description}</CardDesc>
                <CardPrice>{acc.price} <span>/ Nacht</span></CardPrice>
                <CardButton href={acc.url} target="_blank">Zur Website →</CardButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
        
        <Note $visible={visible}>
          <NoteTitle>💡 Buchungs-Tipp</NoteTitle>
          <NoteText>Im Hotel Schlossblick haben wir ein Kontingent reserviert. Nennt bei der Buchung einfach <strong>"{bookingCode}"</strong>!</NoteText>
        </Note>
      </Container>
    </Section>
  );
}

export default Accommodations;
