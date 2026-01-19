import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TitleWrapper = styled.div``;

const Eyebrow = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #EC4899;
  margin-bottom: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: all 0.8s ease;
  
  @media (max-width: 768px) { text-align: center; }
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #fff;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const FilterNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: all 0.8s ease;
  transition-delay: 0.2s;
  
  @media (max-width: 768px) { justify-content: center; }
`;

const FilterButton = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${p => p.$active ? '#fff' : 'rgba(255,255,255,0.5)'};
  background: ${p => p.$active ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : 'rgba(255,255,255,0.05)'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${p => p.$active ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : 'rgba(255,255,255,0.1)'};
    color: #fff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition-delay: ${p => 0.3 + p.$index * 0.03}s;
  
  &:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LetterBadge = styled.div`
  width: 44px;
  height: 44px;
  background: ${p => p.$color || 'linear-gradient(135deg, #8B5CF6, #EC4899)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
`;

const CardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
`;

const CardText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin: 0;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: rgba(255,255,255,0.5);
  font-family: 'Sora', sans-serif;
`;

function WeddingABC({ title = 'Wedding A-Z', entries = [] }) {
  const [visible, setVisible] = useState(false);
  const [activeLetter, setActiveLetter] = useState('Alle');
  const sectionRef = useRef(null);

  const colors = {
    A: 'linear-gradient(135deg, #8B5CF6, #7c3aed)',
    B: 'linear-gradient(135deg, #EC4899, #db2777)',
    D: 'linear-gradient(135deg, #F97316, #ea580c)',
    F: 'linear-gradient(135deg, #10b981, #059669)',
    G: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    H: 'linear-gradient(135deg, #f59e0b, #d97706)',
    K: 'linear-gradient(135deg, #ef4444, #dc2626)',
    M: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    P: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    R: 'linear-gradient(135deg, #f43f5e, #e11d48)',
    S: 'linear-gradient(135deg, #22c55e, #16a34a)',
    T: 'linear-gradient(135deg, #a855f7, #9333ea)',
    U: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    W: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  };

  const defaultEntries = [
    { letter: 'A', title: 'Anreise', text: 'Die Location ist mit dem Auto und ÖPNV gut erreichbar. Parkplätze sind vorhanden.' },
    { letter: 'B', title: 'Blumen', text: 'Unser Farbkonzept ist Weiß und Grün. Wer uns mit Blumen überraschen möchte, kann sich daran orientieren.' },
    { letter: 'D', title: 'Dresscode', text: 'Elegante Abendgarderobe – Anzug für die Herren, Cocktailkleid für die Damen.' },
    { letter: 'F', title: 'Fotos', text: 'Während der Trauung bitte keine eigenen Fotos. Bei der Feier dürft ihr gerne knipsen!' },
    { letter: 'G', title: 'Geschenke', text: 'Das größte Geschenk ist eure Anwesenheit! Infos zu unserer Wunschliste findet ihr unter "Geschenke".' },
    { letter: 'H', title: 'Hochzeitstorte', text: 'Die Torte wird gegen 22 Uhr angeschnitten. Ein süßes Highlight!' },
    { letter: 'K', title: 'Kinder', text: 'Wir haben uns für eine Feier nur für Erwachsene entschieden.' },
    { letter: 'M', title: 'Musik', text: 'Habt ihr einen Song, der euch auf die Tanzfläche bringt? Verratet ihn uns!' },
    { letter: 'P', title: 'Parken', text: 'Kostenlose Parkplätze sind direkt an der Location vorhanden.' },
    { letter: 'R', title: 'Reden', text: 'Möchtet ihr eine Rede halten? Meldet euch bitte bei unseren Trauzeugen.' },
    { letter: 'S', title: 'Sektempfang', text: 'Nach der Trauung gibt es einen Sektempfang auf der Terrasse.' },
    { letter: 'T', title: 'Taxi', text: 'Am Ende der Feier können wir Taxis organisieren.' },
  ];

  const items = entries.length > 0 ? entries : defaultEntries;
  const availableLetters = [...new Set(items.map(e => e.letter.toUpperCase()))].sort();
  const filteredItems = activeLetter === 'Alle' ? items : items.filter(e => e.letter.toUpperCase() === activeLetter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="abc">
      <Container>
        <Header>
          <TitleWrapper>
            <Eyebrow $visible={visible}>📚 Von A bis Z</Eyebrow>
            <Title $visible={visible}>{title}</Title>
          </TitleWrapper>
          
          <FilterNav $visible={visible}>
            <FilterButton $active={activeLetter === 'Alle'} onClick={() => setActiveLetter('Alle')}>
              Alle
            </FilterButton>
            {availableLetters.map(letter => (
              <FilterButton 
                key={letter}
                $active={activeLetter === letter}
                onClick={() => setActiveLetter(letter)}
              >
                {letter}
              </FilterButton>
            ))}
          </FilterNav>
        </Header>
        
        <Grid>
          {filteredItems.length > 0 ? (
            filteredItems.map((entry, i) => (
              <Card key={i} $index={i} $visible={visible}>
                <CardHeader>
                  <LetterBadge $color={colors[entry.letter]}>{entry.letter}</LetterBadge>
                  <CardTitle>{entry.title}</CardTitle>
                </CardHeader>
                <CardText>{entry.text}</CardText>
              </Card>
            ))
          ) : (
            <EmptyState>Keine Einträge für diesen Buchstaben.</EmptyState>
          )}
        </Grid>
      </Container>
    </Section>
  );
}

export default WeddingABC;
