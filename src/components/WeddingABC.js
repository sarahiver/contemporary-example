import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 0;
  background: var(--black);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const TitleGroup = styled.div``;

const Eyebrow = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 700;
  color: var(--white);
`;

// Filter buttons
const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${p => p.active ? 'var(--black)' : 'var(--gray-300)'};
  background: ${p => p.active ? 'var(--coral)' : 'transparent'};
  border: 2px solid ${p => p.active ? 'var(--coral)' : 'var(--gray-600)'};
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    ${p => !p.active && 'border-color: var(--gray-300); color: var(--white);'}
  }
`;

// Cards grid
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ABCCard = styled.div`
  background: var(--gray-800);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition-delay: ${p => Math.min(p.index * 0.05, 0.5)}s;
  
  &:hover {
    transform: translateY(-5px);
    background: var(--gray-600);
    
    .letter { transform: scale(1.1) rotate(-5deg); }
  }
`;

const CardLetter = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 5rem;
  font-weight: 700;
  color: rgba(255,255,255,0.05);
  line-height: 1;
  transition: all 0.3s ease;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background: var(--coral);
    color: var(--white);
    font-size: 1rem;
    font-weight: 700;
    border-radius: 10px;
  }
`;

const CardText = styled.p`
  font-size: 0.9rem;
  color: var(--gray-300);
  line-height: 1.6;
`;

function WeddingABC({
  entries = [
    { letter: 'A', title: 'Anfahrt', text: 'Mit der U-Bahn bis Kreuzberg, dann 5 min zu Fuß. Parkplätze direkt an der Location.' },
    { letter: 'B', title: 'Bar', text: 'Open Bar die ganze Nacht! Cocktails, Bier, Wein – alles da!' },
    { letter: 'D', title: 'Dresscode', text: 'Smart Casual mit einem Twist. Bunte Farben erlaubt, Weiß bitte nicht.' },
    { letter: 'F', title: 'Fotos', text: 'Unplugged Ceremony! Bei der Party: #SophieUndMax' },
    { letter: 'K', title: 'Kids', text: 'Herzlich willkommen! Kinderbetreuung und Spielecke vorhanden.' },
    { letter: 'M', title: 'Music', text: 'DJ ab 22 Uhr. Songrequests? Her damit – im RSVP-Formular!' },
    { letter: 'P', title: 'Parken', text: 'Kostenlose Parkplätze vorhanden. Für die Feierwütigen: Taxi empfohlen!' },
    { letter: 'T', title: 'Taxi', text: 'Sammelruf um 3 Uhr morgens. Alternativ: Uber funktioniert super!' },
    { letter: 'U', title: 'Unterkunft', text: 'Hotelkontingent im "The Hotel" – Code "SophieMax" für 15% Rabatt.' },
    { letter: 'W', title: 'Wetter', text: 'Plan B bei Regen: Alles findet indoor statt. Keine Sorge!' },
  ],
}) {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const alphabet = [...new Set(entries.map(e => e.letter))].sort();
  const filteredEntries = filter === 'all' ? entries : entries.filter(e => e.letter === filter);

  return (
    <Section ref={sectionRef} id="abc">
      <Container>
        <Header visible={visible}>
          <TitleGroup>
            <Eyebrow>Everything you need to know</Eyebrow>
            <Title>Wedding A-Z</Title>
          </TitleGroup>
          
          <FilterButtons>
            <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterBtn>
            {alphabet.map(letter => (
              <FilterBtn 
                key={letter}
                active={filter === letter}
                onClick={() => setFilter(letter)}
              >
                {letter}
              </FilterBtn>
            ))}
          </FilterButtons>
        </Header>
        
        <CardsGrid>
          {filteredEntries.map((entry, i) => (
            <ABCCard key={`${entry.letter}-${i}`} index={i} visible={visible}>
              <CardLetter className="letter">{entry.letter}</CardLetter>
              <CardContent>
                <CardTitle>
                  <span>{entry.letter}</span>
                  {entry.title}
                </CardTitle>
                <CardText>{entry.text}</CardText>
              </CardContent>
            </ABCCard>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  );
}

export default WeddingABC;
