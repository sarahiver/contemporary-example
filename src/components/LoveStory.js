import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const IncludedBadge = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  &::before { content: '✓'; }
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
  color: #EC4899;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Subtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.6);
  max-width: 600px;
  margin: 0 auto;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: ${p => p.$gradient};
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.8s ease;
  transition-delay: ${p => 0.3 + p.$index * 0.1}s;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
`;

const Year = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
  line-height: 1;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
  flex: 1;
`;

const CardImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${p => p.$image ? `url(${p.$image}) center/cover` : 'rgba(255,255,255,0.2)'};
  margin-top: auto;
`;

function LoveStory({ title = 'How we got here', subtitle = 'Unsere gemeinsame Reise durch die Jahre – von der ersten Begegnung bis zum Ja.', milestones = [], showBadge = false }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const gradients = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #764ba2, #EC4899)',
    'linear-gradient(135deg, #EC4899, #F97316)',
    'linear-gradient(135deg, #F97316, #fbbf24)',
  ];

  const defaultMilestones = [
    { year: "'20", title: 'First Match', text: 'Ein Swipe nach rechts und unsere Geschichte begann.', gradient: gradients[0] },
    { year: "'21", title: 'First Date', text: 'Unser erstes Date im kleinen Café am Neckarufer.', gradient: gradients[1] },
    { year: "'22", title: 'Adventure', text: 'Unsere erste gemeinsame Reise nach Portugal.', gradient: gradients[2] },
    { year: "'24", title: 'The Question', text: 'Der magische Moment, als ich JA gesagt habe!', gradient: gradients[3] },
  ];

  const items = milestones.length > 0 ? milestones : defaultMilestones;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="story">
      {showBadge && <IncludedBadge>Inklusive</IncludedBadge>}
      
      <Container>
        <Header>
          <Eyebrow $visible={visible}>💕 Unsere Story</Eyebrow>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Grid>
          {items.map((milestone, i) => (
            <Card 
              key={i} 
              $index={i} 
              $visible={visible}
              $gradient={milestone.gradient || gradients[i % gradients.length]}
            >
              <Year>{milestone.year}</Year>
              <CardTitle>{milestone.title}</CardTitle>
              <CardText>{milestone.text}</CardText>
              {milestone.image && <CardImage $image={milestone.image} />}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default LoveStory;
