import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${p => p.$scrolled ? 'var(--white)' : 'transparent'};
  border-bottom: ${p => p.$scrolled ? '3px solid var(--black)' : 'none'};
  transition: all 0.3s ease;
  animation: ${slideDown} 0.5s ease;
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .dot {
    width: 12px;
    height: 12px;
    background: var(--coral);
    border: 2px solid var(--black);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  @media (max-width: 900px) { display: none; }
`;

const NavLink = styled.a`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--black);
  padding: 0.6rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--yellow);
    border-color: var(--black);
  }
`;

const CTAButton = styled.a`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--white);
  background: var(--coral);
  padding: 0.75rem 1.5rem;
  border: 3px solid var(--black);
  box-shadow: var(--shadow-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--black);
  }
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--black);
  }
`;

const MobileButton = styled.button`
  display: none;
  width: 48px;
  height: 48px;
  background: var(--yellow);
  border: 3px solid var(--black);
  box-shadow: var(--shadow-sm);
  
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Hamburger = styled.div`
  width: 20px;
  height: 14px;
  position: relative;
  
  span {
    position: absolute;
    width: 100%;
    height: 3px;
    background: var(--black);
    transition: all 0.3s ease;
    
    &:nth-child(1) { top: 0; transform: ${p => p.$open ? 'rotate(45deg) translate(4px, 4px)' : 'none'}; }
    &:nth-child(2) { top: 5px; opacity: ${p => p.$open ? 0 : 1}; }
    &:nth-child(3) { top: 10px; transform: ${p => p.$open ? 'rotate(-45deg) translate(4px, -4px)' : 'none'}; }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 1rem;
  right: 1rem;
  background: var(--white);
  border: 3px solid var(--black);
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transform: translateY(${p => p.$open ? 0 : '-20px'});
  transition: all 0.3s ease;
  z-index: 999;
`;

const MobileLink = styled.a`
  font-size: 1rem;
  font-weight: 600;
  color: var(--black);
  padding: 1rem;
  text-transform: uppercase;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--yellow);
    border-color: var(--black);
  }
`;

function Navigation({ coupleNames = 'Sophie & Max', links = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const defaultLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Location', href: '#location' },
    { label: 'Ablauf', href: '#timeline' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav $scrolled={scrolled}>
        <NavInner>
          <Logo href="#">
            <span className="dot" />
            {coupleNames}
          </Logo>
          
          <NavLinks>
            {navLinks.map((link, i) => (
              <NavLink key={i} href={link.href}>{link.label}</NavLink>
            ))}
            <CTAButton href="#rsvp">RSVP</CTAButton>
          </NavLinks>
          
          <MobileButton onClick={() => setMobileOpen(!mobileOpen)}>
            <Hamburger $open={mobileOpen}>
              <span /><span /><span />
            </Hamburger>
          </MobileButton>
        </NavInner>
      </Nav>
      
      <MobileMenu $open={mobileOpen}>
        {navLinks.map((link, i) => (
          <MobileLink key={i} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </MobileLink>
        ))}
        <CTAButton href="#rsvp" style={{ marginTop: '1rem', textAlign: 'center' }}>RSVP</CTAButton>
      </MobileMenu>
    </>
  );
}

export default Navigation;
