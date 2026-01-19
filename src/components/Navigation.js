import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${p => p.$scrolled ? 'rgba(26, 26, 46, 0.95)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(20px)' : 'none'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: ${p => p.$scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'};
  animation: ${slideDown} 0.6s ease;
`;

const IncludedBadge = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 2rem;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.35rem 0.7rem;
  border-radius: 50px;
  display: ${p => p.$visible ? 'flex' : 'none'};
  align-items: center;
  gap: 0.3rem;
  
  &::before { content: '✓'; }
`;

const Logo = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  .ampersand {
    background: linear-gradient(135deg, #8B5CF6, #EC4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  
  @media (max-width: 968px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 400px;
    background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
    flex-direction: column;
    justify-content: center;
    gap: 2.5rem;
    transform: translateX(${p => p.$isOpen ? '0' : '100%'});
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${p => p.$isOpen ? '-10px 0 40px rgba(0,0,0,0.3)' : 'none'};
  }
`;

const NavLink = styled.a`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.8);
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #8B5CF6, #EC4899);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
    border-radius: 2px;
  }
  
  &:hover {
    color: #fff;
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  
  @media (max-width: 968px) {
    font-size: 1.4rem;
    letter-spacing: 0.05em;
  }
`;

const CTAButton = styled.a`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  padding: 0.85rem 1.75rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
  }
`;

const MenuButton = styled.button`
  display: none;
  width: 36px;
  height: 28px;
  position: relative;
  background: none;
  border: none;
  z-index: 1001;
  
  @media (max-width: 968px) { display: block; }
  
  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #8B5CF6, #EC4899);
    border-radius: 3px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:nth-child(1) {
      top: ${p => p.$isOpen ? '50%' : '0'};
      transform: ${p => p.$isOpen ? 'translateY(-50%) rotate(45deg)' : 'none'};
    }
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${p => p.$isOpen ? 0 : 1};
      width: ${p => p.$isOpen ? '0' : '100%'};
    }
    &:nth-child(3) {
      bottom: ${p => p.$isOpen ? '50%' : '0'};
      transform: ${p => p.$isOpen ? 'translateY(50%) rotate(-45deg)' : 'none'};
    }
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 968px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
    opacity: ${p => p.$isOpen ? 1 : 0};
    visibility: ${p => p.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.4s ease;
    z-index: 999;
  }
`;

function Navigation({ coupleNames = 'Sophie & Max', links = [], showBadge = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const defaultLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Ablauf', href: '#timeline' },
    { label: 'Location', href: '#location' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Galerie', href: '#gallery' },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;
  const names = coupleNames.split('&');

  return (
    <>
      <Header $scrolled={scrolled}>
        <Logo href="#top">
          {names[0]?.trim()} <span className="ampersand">&</span> {names[1]?.trim()}
        </Logo>
        
        <Nav $isOpen={isOpen}>
          {navLinks.map((link, i) => (
            <NavLink key={i} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <CTAButton href="#rsvp" onClick={() => setIsOpen(false)}>RSVP</CTAButton>
        </Nav>
        
        <MenuButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          <span /><span /><span />
        </MenuButton>
        
        <IncludedBadge $visible={showBadge && scrolled}>Inklusive</IncludedBadge>
      </Header>
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
}

export default Navigation;
