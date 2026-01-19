import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const marqueeReverse = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const zoomIn = keyframes`
  from { transform: scale(1.2); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Section = styled.section`
  padding: 8rem 0;
  background: var(--black);
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
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
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
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.03em;
`;

const ViewAllBtn = styled.button`
  padding: 1rem 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--white);
  background: transparent;
  border: 2px solid var(--coral);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--coral);
    transform: translateY(-3px);
  }
`;

// Auto-scrolling marquee rows
const MarqueeWrapper = styled.div`
  overflow: hidden;
  padding: 1rem 0;
`;

const MarqueeTrack = styled.div`
  display: flex;
  gap: 1.5rem;
  width: max-content;
  ${p => css`
    animation: ${p.reverse ? marqueeReverse : marquee} ${p.duration}s linear infinite;
  `}
  
  &:hover {
    animation-play-state: paused;
  }
`;

const MarqueeItem = styled.div`
  flex-shrink: 0;
  width: ${p => p.size === 'large' ? '400px' : p.size === 'medium' ? '300px' : '200px'};
  aspect-ratio: ${p => p.size === 'large' ? '16/10' : p.size === 'medium' ? '4/3' : '1/1'};
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  &:hover {
    .image { transform: scale(1.1); }
    .overlay { opacity: 1; }
  }
  
  @media (max-width: 600px) {
    width: ${p => p.size === 'large' ? '300px' : p.size === 'medium' ? '220px' : '150px'};
  }
`;

const MarqueeImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.gradient};
  transition: transform 0.6s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.gradient};
  
  span {
    font-size: 3rem;
    font-weight: 700;
    color: rgba(255,255,255,0.2);
  }
`;

const ItemOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  span {
    width: 50px;
    height: 50px;
    background: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

// Lightbox
const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0,0,0,0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: ${p => p.isOpen ? 1 : 0};
  visibility: ${p => p.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const LightboxContent = styled.div`
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 20px;
  overflow: hidden;
  animation: ${zoomIn} 0.4s ease;
  
  img {
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
  }
`;

const LightboxPlaceholder = styled.div`
  width: 70vw;
  height: 60vh;
  max-width: 900px;
  background: linear-gradient(135deg, var(--coral), var(--purple));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 5rem;
    font-weight: 700;
    color: rgba(255,255,255,0.3);
  }
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: var(--white);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--coral);
    color: var(--white);
    transform: rotate(90deg);
  }
`;

const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: var(--white);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  ${p => p.direction === 'prev' ? 'left: 2rem;' : 'right: 2rem;'}
  
  &:hover {
    background: var(--coral);
    color: var(--white);
  }
`;

const LightboxCounter = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: 600;
  color: var(--white);
  background: rgba(0,0,0,0.5);
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
`;

// Color gradients for placeholders
const gradients = [
  'linear-gradient(135deg, var(--coral), var(--pink))',
  'linear-gradient(135deg, var(--electric), var(--purple))',
  'linear-gradient(135deg, var(--yellow), var(--coral))',
  'linear-gradient(135deg, var(--purple), var(--pink))',
  'linear-gradient(135deg, var(--coral), var(--electric))',
  'linear-gradient(135deg, var(--pink), var(--yellow))',
];

function Gallery({
  images = Array(12).fill(null).map((_, i) => ({ 
    src: null, 
    alt: `Photo ${i + 1}`,
    size: i % 5 === 0 ? 'large' : i % 3 === 0 ? 'medium' : 'small'
  })),
}) {
  const [visible, setVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : 'unset';
    const handleKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft' && currentIndex > 0) setCurrentIndex(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, currentIndex, images.length]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Split images into rows for marquee
  const row1 = images.slice(0, Math.ceil(images.length / 2));
  const row2 = images.slice(Math.ceil(images.length / 2));

  return (
    <Section ref={sectionRef} id="gallery">
      <Container>
        <Header visible={visible}>
          <TitleGroup>
            <Eyebrow>Gallery</Eyebrow>
            <Title>Captured moments</Title>
          </TitleGroup>
          <ViewAllBtn onClick={() => openLightbox(0)}>View All</ViewAllBtn>
        </Header>
      </Container>
      
      {/* Row 1 - Normal direction */}
      <MarqueeWrapper>
        <MarqueeTrack duration={40}>
          {[...row1, ...row1].map((img, i) => (
            <MarqueeItem 
              key={i} 
              size={img.size}
              onClick={() => openLightbox(i % row1.length)}
            >
              <MarqueeImage className="image" gradient={gradients[i % gradients.length]}>
                {img.src ? (
                  <img src={img.src} alt={img.alt} />
                ) : (
                  <Placeholder gradient={gradients[i % gradients.length]}>
                    <span>{(i % row1.length) + 1}</span>
                  </Placeholder>
                )}
              </MarqueeImage>
              <ItemOverlay className="overlay"><span>+</span></ItemOverlay>
            </MarqueeItem>
          ))}
        </MarqueeTrack>
      </MarqueeWrapper>
      
      {/* Row 2 - Reverse direction */}
      <MarqueeWrapper>
        <MarqueeTrack duration={45} reverse>
          {[...row2, ...row2].map((img, i) => (
            <MarqueeItem 
              key={i} 
              size={img.size}
              onClick={() => openLightbox(row1.length + (i % row2.length))}
            >
              <MarqueeImage className="image" gradient={gradients[(i + 3) % gradients.length]}>
                {img.src ? (
                  <img src={img.src} alt={img.alt} />
                ) : (
                  <Placeholder gradient={gradients[(i + 3) % gradients.length]}>
                    <span>{row1.length + (i % row2.length) + 1}</span>
                  </Placeholder>
                )}
              </MarqueeImage>
              <ItemOverlay className="overlay"><span>+</span></ItemOverlay>
            </MarqueeItem>
          ))}
        </MarqueeTrack>
      </MarqueeWrapper>
      
      <Lightbox isOpen={lightboxOpen} onClick={() => setLightboxOpen(false)}>
        <LightboxClose onClick={() => setLightboxOpen(false)}>✕</LightboxClose>
        {currentIndex > 0 && (
          <LightboxNav direction="prev" onClick={(e) => { e.stopPropagation(); setCurrentIndex(currentIndex - 1); }}>←</LightboxNav>
        )}
        <LightboxContent onClick={(e) => e.stopPropagation()}>
          {images[currentIndex]?.src ? (
            <img src={images[currentIndex].src} alt="" />
          ) : (
            <LightboxPlaceholder><span>{currentIndex + 1}</span></LightboxPlaceholder>
          )}
        </LightboxContent>
        {currentIndex < images.length - 1 && (
          <LightboxNav direction="next" onClick={(e) => { e.stopPropagation(); setCurrentIndex(currentIndex + 1); }}>→</LightboxNav>
        )}
        <LightboxCounter>{currentIndex + 1} / {images.length}</LightboxCounter>
      </Lightbox>
    </Section>
  );
}

export default Gallery;
