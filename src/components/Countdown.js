import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const expand = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Section = styled.section`
  padding: 10rem 2rem;
  background: var(--black);
  position: relative;
  overflow: hidden;
`;

const BgNumber = styled.div`
  position: absolute;
  font-size: clamp(20rem, 50vw, 50rem);
  font-weight: 700;
  color: rgba(255,255,255,0.02);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  line-height: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 5rem;
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
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.03em;
  line-height: 1;
`;

const DateDisplay = styled.div`
  text-align: right;
  
  .label {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gray-600);
    margin-bottom: 0.5rem;
  }
  
  .date {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--electric);
  }
  
  @media (max-width: 600px) {
    text-align: left;
  }
`;

const CountdownStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CountdownRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  gap: 2rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateX(${p => p.visible ? 0 : '-50px'});
  transition: all 0.8s ease;
  transition-delay: ${p => p.index * 0.1}s;
  
  @media (max-width: 700px) {
    grid-template-columns: 80px 1fr auto;
    gap: 1rem;
  }
`;

const Label = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gray-600);
`;

const ProgressBar = styled.div`
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${p => p.color};
  border-radius: 4px;
  width: ${p => p.percent}%;
  transform-origin: left;
  transform: scaleX(0);
  ${p => css`
    animation: ${expand} 1.5s ease forwards;
    animation-delay: ${0.3 + p.index * 0.1}s;
  `}
`;

const Value = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--white);
  min-width: 100px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  
  span {
    font-size: 1rem;
    color: var(--gray-600);
    margin-left: 0.25rem;
  }
  
  @media (max-width: 700px) {
    font-size: 2rem;
    min-width: 70px;
  }
`;

const Message = styled.div`
  margin-top: 5rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--coral), var(--purple));
  border-radius: 20px;
  text-align: center;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.5s;
  
  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
    
    strong {
      display: block;
      font-size: 2rem;
      margin-top: 0.5rem;
    }
  }
`;

const AccentShape = styled.div`
  position: absolute;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background: ${p => p.color};
  border-radius: ${p => p.shape === 'circle' ? '50%' : '0'};
  top: ${p => p.top};
  right: ${p => p.right};
  opacity: 0.5;
  ${p => css`
    animation: ${pulse} ${p.duration}s ease-in-out infinite;
  `}
`;

function Countdown({ weddingDate = '2025-10-12T14:00:00' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const formatDate = () => {
    return new Date(weddingDate).toLocaleDateString('de-DE', { 
      day: 'numeric', month: 'long', year: 'numeric' 
    });
  };

  const items = [
    { label: 'Days', value: timeLeft.days, max: 365, color: 'var(--coral)', unit: 'd' },
    { label: 'Hours', value: timeLeft.hours, max: 24, color: 'var(--electric)', unit: 'h' },
    { label: 'Minutes', value: timeLeft.minutes, max: 60, color: 'var(--yellow)', unit: 'm' },
    { label: 'Seconds', value: timeLeft.seconds, max: 60, color: 'var(--purple)', unit: 's' },
  ];

  return (
    <Section ref={sectionRef}>
      <BgNumber>{timeLeft.days}</BgNumber>
      <AccentShape size={150} color="var(--coral)" shape="circle" top="10%" right="5%" duration={4} />
      <AccentShape size={80} color="var(--electric)" shape="square" top="70%" right="15%" duration={6} />
      
      <Container>
        <Header visible={visible}>
          <TitleGroup>
            <Eyebrow>The Countdown</Eyebrow>
            <Title>Time is ticking</Title>
          </TitleGroup>
          <DateDisplay>
            <div className="label">Wedding Day</div>
            <div className="date">{formatDate()}</div>
          </DateDisplay>
        </Header>
        
        <CountdownStack>
          {items.map((item, i) => (
            <CountdownRow key={i} index={i} visible={visible}>
              <Label>{item.label}</Label>
              <ProgressBar>
                <ProgressFill 
                  percent={(item.value / item.max) * 100} 
                  color={item.color}
                  index={i}
                />
              </ProgressBar>
              <Value>
                {String(item.value).padStart(2, '0')}
                <span>{item.unit}</span>
              </Value>
            </CountdownRow>
          ))}
        </CountdownStack>
        
        <Message visible={visible}>
          <p>
            Can't wait to celebrate with you!
            <strong>Let's make it epic 🎉</strong>
          </p>
        </Message>
      </Container>
    </Section>
  );
}

export default Countdown;
