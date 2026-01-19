import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const Section = styled.section`
  padding: 8rem 0;
  background: var(--white);
  position: relative;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  align-items: end;
  
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
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
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--black);
  letter-spacing: -0.03em;
  line-height: 1;
`;

const Intro = styled.p`
  font-size: 1.1rem;
  color: var(--gray-600);
  line-height: 1.8;
  max-width: 500px;
`;

// Horizontal scroll container
const ScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2rem 0 4rem;
  margin: 0 -3rem;
  scrollbar-width: none;
  
  &::-webkit-scrollbar { display: none; }
  
  @media (max-width: 768px) {
    margin: 0 -1.5rem;
  }
`;

const ScrollTrack = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0 3rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const StoryCard = styled.div`
  flex-shrink: 0;
  width: 400px;
  position: relative;
  
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '50px'}) rotate(${p => p.visible ? 0 : (p.index % 2 === 0 ? '-5deg' : '5deg')});
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => p.index * 0.1}s;
  
  &:hover {
    transform: translateY(-10px) rotate(0deg) !important;
    
    .card-image { transform: scale(1.05); }
    .year-badge { transform: rotate(-5deg) scale(1.1); }
  }
  
  @media (max-width: 600px) {
    width: 300px;
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/5;
  background: var(--gray-100);
  margin-bottom: 1.5rem;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    ${p => p.colors[0]} 0%, 
    ${p => p.colors[1]} 100%
  );
  transition: transform 0.6s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 8rem;
    font-weight: 700;
    color: rgba(255,255,255,0.3);
  }
`;

const YearBadge = styled.div`
  position: absolute;
  top: -15px;
  right: 20px;
  background: var(--black);
  color: var(--white);
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 10px;
  transform: rotate(3deg);
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

const CardContent = styled.div``;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: var(--gray-600);
  line-height: 1.7;
`;

// Scroll indicator
const ScrollHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.5s ease;
  transition-delay: 0.5s;
  
  .line {
    width: 60px;
    height: 3px;
    background: var(--coral);
    border-radius: 3px;
  }
  
  span {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray-600);
  }
`;

// Navigation dots
const NavDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Dot = styled.button`
  width: ${p => p.active ? '30px' : '10px'};
  height: 10px;
  background: ${p => p.active ? 'var(--coral)' : 'var(--gray-200)'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${p => p.active ? 'var(--coral)' : 'var(--gray-300)'};
  }
`;

// Floating decoration
const FloatingEmoji = styled.div`
  position: absolute;
  font-size: ${p => p.size}rem;
  top: ${p => p.top};
  left: ${p => p.left};
  right: ${p => p.right};
  opacity: 0.6;
  z-index: 0;
  ${p => css`
    animation: ${float} ${p.duration}s ease-in-out infinite;
    animation-delay: ${p.delay}s;
  `}
`;

function LoveStory({
  milestones = [
    { year: '2020', title: 'The Match', text: 'Eines Abends, ein Match auf Bumble – und plötzlich schrieben wir bis 3 Uhr morgens. Zwei Wochen später das erste Date.', image: null, colors: ['var(--coral)', 'var(--pink)'] },
    { year: '2021', title: 'Moving In', text: 'Ein verrückter Umzug während Corona. 40m², zwei Laptops, eine Kaffeemaschine – und trotzdem das größte Glück.', image: null, colors: ['var(--electric)', 'var(--purple)'] },
    { year: '2022', title: 'Adventure Time', text: 'Roadtrip durch Portugal, Surfen in Bali, Camping in Schweden. Gemeinsam die Welt entdecken.', image: null, colors: ['var(--yellow)', 'var(--coral)'] },
    { year: '2024', title: 'The Question', text: 'Auf dem Tempelhofer Feld bei Sonnenuntergang. Ein Ring, eine Frage, unendlich viele Tränen der Freude.', image: null, colors: ['var(--purple)', 'var(--electric)'] },
  ],
}) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollPos = container.scrollLeft;
      const cardWidth = 400 + 32;
      const index = Math.round(scrollPos / cardWidth);
      setActiveIndex(Math.min(index, milestones.length - 1));
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [milestones.length]);

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: index * (400 + 32), behavior: 'smooth' });
  };

  return (
    <Section ref={sectionRef} id="story">
      <FloatingEmoji size={4} top="10%" left="5%" duration={6} delay={0}>💕</FloatingEmoji>
      <FloatingEmoji size={3} top="60%" right="8%" duration={8} delay={2}>✨</FloatingEmoji>
      <FloatingEmoji size={2.5} top="80%" left="15%" duration={7} delay={1}>💍</FloatingEmoji>
      
      <Container>
        <Header visible={visible}>
          <TitleGroup>
            <Eyebrow>Our Story</Eyebrow>
            <Title>How we got here</Title>
          </TitleGroup>
          <Intro>
            Von einem Swipe nach rechts zu "Ja, ich will" – hier ist unsere Geschichte 
            in vier unvergesslichen Kapiteln.
          </Intro>
        </Header>
      </Container>
      
      <ScrollContainer ref={scrollRef}>
        <ScrollTrack>
          {milestones.map((m, i) => (
            <StoryCard key={i} index={i} visible={visible}>
              <YearBadge className="year-badge">{m.year}</YearBadge>
              <CardImageWrapper>
                <CardImage className="card-image" colors={m.colors}>
                  {m.image ? (
                    <img src={m.image} alt={m.title} />
                  ) : (
                    <Placeholder><span>{m.year.slice(-2)}</span></Placeholder>
                  )}
                </CardImage>
              </CardImageWrapper>
              <CardContent>
                <CardTitle>{m.title}</CardTitle>
                <CardText>{m.text}</CardText>
              </CardContent>
            </StoryCard>
          ))}
        </ScrollTrack>
      </ScrollContainer>
      
      <Container>
        <ScrollHint visible={visible}>
          <div className="line" />
          <span>Swipe to explore</span>
          <div className="line" />
        </ScrollHint>
        
        <NavDots>
          {milestones.map((_, i) => (
            <Dot key={i} active={i === activeIndex} onClick={() => scrollToCard(i)} />
          ))}
        </NavDots>
      </Container>
    </Section>
  );
}

export default LoveStory;
