import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #fff;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const ViewAllButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  
  &:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 220px);
  gap: 1rem;
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 180px);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 200px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: ${p => p.$delay}s;
  
  &:nth-child(1) { grid-column: span 2; grid-row: span 2; }
  
  @media (max-width: 1000px) {
    &:nth-child(1) { grid-column: span 2; grid-row: span 1; }
  }
  
  @media (max-width: 500px) {
    &:nth-child(1) { grid-column: span 1; }
  }
  
  &:hover .overlay {
    opacity: 1;
  }
  
  &:hover img, &:hover .gradient {
    transform: scale(1.1);
  }
`;

const GradientPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.$gradient || 'linear-gradient(135deg, #8B5CF6, #EC4899)'};
  transition: transform 0.6s ease;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const OverlayText = styled.span`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #fff;
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const LightboxContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  animation: ${fadeIn} 0.3s ease;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 12px;
  }
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${p => p.$direction === 'prev' ? 'left: 2rem;' : 'right: 2rem;'}
  width: 56px;
  height: 56px;
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8B5CF6, #EC4899);
  }
`;

function Gallery({ title = 'Captured moments', images = [] }) {
  const [visible, setVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const gradients = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #764ba2, #EC4899)',
    'linear-gradient(135deg, #EC4899, #F97316)',
    'linear-gradient(135deg, #F97316, #fbbf24)',
    'linear-gradient(135deg, #10b981, #3b82f6)',
    'linear-gradient(135deg, #8B5CF6, #06b6d4)',
  ];

  const defaultImages = gradients.map((gradient, i) => ({ 
    src: null, 
    alt: `Moment ${i + 1}`,
    gradient 
  }));
  
  const galleryImages = images.length > 0 ? images : defaultImages;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index) => {
    if (!galleryImages[index]?.src) return;
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigate = useCallback((direction) => {
    if (direction === 'prev') {
      setCurrentIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1);
    } else {
      setCurrentIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1);
    }
  }, [galleryImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, navigate]);

  return (
    <Section ref={sectionRef} id="gallery">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <ViewAllButton href="#" $visible={visible}>
            View all
            <span>→</span>
          </ViewAllButton>
        </Header>
        
        <Grid>
          {galleryImages.slice(0, 6).map((img, i) => (
            <ImageWrapper 
              key={i} 
              $visible={visible}
              $delay={0.1 + i * 0.1}
              onClick={() => openLightbox(i)}
            >
              {img.src ? (
                <Image src={img.src} alt={img.alt} />
              ) : (
                <GradientPlaceholder className="gradient" $gradient={img.gradient} />
              )}
              <Overlay className="overlay">
                <OverlayText>{img.alt}</OverlayText>
              </Overlay>
            </ImageWrapper>
          ))}
        </Grid>
        
        <Lightbox $open={lightboxOpen} onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox}>×</LightboxClose>
          <NavButton $direction="prev" onClick={(e) => { e.stopPropagation(); navigate('prev'); }}>‹</NavButton>
          <LightboxContent onClick={e => e.stopPropagation()}>
            {galleryImages[currentIndex]?.src && (
              <img src={galleryImages[currentIndex].src} alt={galleryImages[currentIndex].alt} />
            )}
          </LightboxContent>
          <NavButton $direction="next" onClick={(e) => { e.stopPropagation(); navigate('next'); }}>›</NavButton>
        </Lightbox>
      </Container>
    </Section>
  );
}

export default Gallery;
