import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const colorShift = keyframes`
  0%, 100% { color: var(--coral); }
  33% { color: var(--electric); }
  66% { color: var(--purple); }
`;

const Section = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const LeftPanel = styled.div`
  background: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: ${p => p.shape === 'circle' ? '50%' : '0'};
  background: ${p => p.color};
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  top: ${p => p.top};
  left: ${p => p.left};
  opacity: 0.15;
  transform: rotate(${p => p.rotate || 0}deg);
  ${p => css`
    animation: ${bounce} ${p.duration}s ease-in-out infinite;
    animation-delay: ${p.delay}s;
  `}
`;

const RightPanel = styled.div`
  position: relative;
  overflow: hidden;
  
  @media (max-width: 900px) {
    min-height: 50vh;
  }
`;

const ParallaxImage = styled.div`
  position: absolute;
  inset: -50px;
  background: linear-gradient(135deg, var(--coral) 0%, var(--purple) 100%);
  transform: scale(${p => 1 + p.scroll * 0.2});
  transition: transform 0.1s ease-out;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: flex-end;
  padding: 3rem;
`;

const DateBadge = styled.div`
  background: var(--white);
  color: var(--black);
  padding: 1.5rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transform: rotate(-3deg);
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  opacity: 0;
  ${css`
    animation: ${slideIn} 1s ease forwards;
    animation-delay: 1.2s;
  `}
  
  @media (max-width: 600px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 2rem;
  overflow: hidden;
  
  span {
    transform: translateY(100%);
    ${css`
      animation: ${slideUp} 0.8s ease forwards;
      animation-delay: 0.2s;
    `}
  }
  
  .line {
    width: 50px;
    height: 2px;
    background: var(--coral);
    opacity: 0;
    ${css`
      animation: ${slideIn} 0.8s ease forwards;
      animation-delay: 0.4s;
    `}
  }
`;

const NamesWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 1rem;
`;

const NameTitle = styled.h1`
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  color: var(--white);
  line-height: 0.9;
  letter-spacing: -0.03em;
  transform: translateY(100%);
  ${css`
    animation: ${slideUp} 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `}
  
  &:nth-child(1) { animation-delay: 0.3s; }
  &:nth-child(2) { animation-delay: 0.5s; }
  
  .highlight {
    ${css`
      animation: ${colorShift} 4s ease-in-out infinite;
    `}
  }
`;

const Ampersand = styled.span`
  display: inline-block;
  font-style: italic;
  font-weight: 300;
  color: var(--coral);
  margin: 0 0.2em;
  ${css`
    animation: ${rotate} 20s linear infinite;
  `}
`;

const Location = styled.p`
  font-size: 1rem;
  color: var(--gray-300);
  margin-top: 2rem;
  overflow: hidden;
  
  span {
    display: inline-block;
    transform: translateY(100%);
    ${css`
      animation: ${slideUp} 0.8s ease forwards;
      animation-delay: 0.8s;
    `}
  }
`;

const ScrollPrompt = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--gray-300);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  
  @media (max-width: 900px) {
    left: 2rem;
    bottom: 2rem;
  }
`;

const ScrollDot = styled.div`
  width: 8px;
  height: 8px;
  background: var(--coral);
  border-radius: 50%;
  ${css`
    animation: ${bounce} 2s ease-in-out infinite;
  `}
`;

const SpinningDecor = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border: 2px solid var(--coral);
  ${css`
    animation: ${rotate} 10s linear infinite;
  `}
  
  &::before {
    content: '';
    position: absolute;
    inset: 8px;
    border: 2px solid var(--electric);
    transform: rotate(45deg);
  }
`;

function Hero({
  name1 = 'Sophie',
  name2 = 'Max',
  date = '12. Oktober 2025',
  location = 'Berlin, Germany',
}) {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        setScrollY(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section ref={sectionRef} id="top">
      <LeftPanel>
        <FloatingShape shape="circle" size={100} color="var(--coral)" top="10%" left="80%" duration={6} delay={0} />
        <FloatingShape shape="square" size={60} color="var(--electric)" top="70%" left="10%" duration={8} delay={1} rotate={45} />
        <FloatingShape shape="circle" size={40} color="var(--yellow)" top="50%" left="70%" duration={5} delay={2} />
        <SpinningDecor />
        
        <Content>
          <Eyebrow>
            <span>We're getting married</span>
            <div className="line" />
          </Eyebrow>
          
          <NamesWrapper>
            <NameTitle><span className="highlight">{name1}</span></NameTitle>
            <NameTitle><Ampersand>&</Ampersand>{name2}</NameTitle>
          </NamesWrapper>
          
          <Location><span>📍 {location}</span></Location>
        </Content>
        
        <ScrollPrompt>
          <ScrollDot />
          Scroll to explore
        </ScrollPrompt>
      </LeftPanel>
      
      <RightPanel>
        <ParallaxImage scroll={scrollY} />
        <ImageOverlay>
          <DateBadge>{date}</DateBadge>
        </ImageOverlay>
      </RightPanel>
    </Section>
  );
}

export default Hero;
