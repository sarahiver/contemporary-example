import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fafafa;
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
  
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: ${p => 0.2 + p.$index * 0.15}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100px;
  height: 100px;
  background: ${p => p.$image ? `url(${p.$image}) center/cover` : 'linear-gradient(135deg, #e0e7ff, #fce7f3)'};
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  border: 4px solid #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const CardRole = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #8B5CF6;
  margin-bottom: 0.5rem;
`;

const CardName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
`;

const CardRelation = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #8B5CF6;
    background: rgba(139, 92, 246, 0.1);
  }
`;

const InfoBox = styled.div`
  margin-top: 3rem;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.5s;
`;

const InfoTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.9);
  margin: 0;
`;

function Contact({ title = 'Eure Ansprechpartner 📞', subtitle = 'Bei Fragen oder für Überraschungen – meldet euch bei unseren Trauzeugen!', witnesses = [] }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const defaultWitnesses = [
    { role: 'Trauzeugin', name: 'Lisa Schneider', relation: 'Beste Freundin der Braut', phone: '+49 170 1234567', email: 'lisa@email.de', image: null },
    { role: 'Trauzeuge', name: 'Thomas Weber', relation: 'Bester Freund des Bräutigams', phone: '+49 171 7654321', email: 'thomas@email.de', image: null },
  ];

  const items = witnesses.length > 0 ? witnesses : defaultWitnesses;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="contact">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Grid>
          {items.map((person, i) => (
            <Card key={i} $index={i} $visible={visible}>
              <CardImage $image={person.image} />
              <CardRole>{person.role}</CardRole>
              <CardName>{person.name}</CardName>
              <CardRelation>{person.relation}</CardRelation>
              <ContactList>
                {person.phone && <ContactItem href={`tel:${person.phone}`}>📱 {person.phone}</ContactItem>}
                {person.email && <ContactItem href={`mailto:${person.email}`}>✉️ {person.email}</ContactItem>}
              </ContactList>
            </Card>
          ))}
        </Grid>
        
        <InfoBox $visible={visible}>
          <InfoTitle>Überraschungen willkommen! 🎉</InfoTitle>
          <InfoText>Plant ihr eine Überraschung? Sprecht euch mit unseren Trauzeugen ab!</InfoText>
        </InfoBox>
      </Container>
    </Section>
  );
}

export default Contact;
