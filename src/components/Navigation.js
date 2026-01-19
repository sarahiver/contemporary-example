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
  padding: 1rem 0;
  background: ${p => p.scrolled ? 'rgba(250,250,250,0.95)' : 'transparent'};
  backdrop-filter: ${p => p.scrolled ? 'blur(20px)' : 'none'};
  transition: all 0.4s ease;
  animation: ${slideDown} 0.6s ease;
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${p => p.scrolled ? 'var(--black)' : 'var(--white)'};
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
  
  span {
    color: var(--coral);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.li`
  a {
    font-size: 0.85rem;
    font-weight: 500;
    color: ${p => p.scrolled ? 'var(--gray-600)' : 'rgba(255,255,255,0.8)'};
    position: relative;
    padding: 0.5rem 0;
    transition: color 0.3s ease;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--coral);
      border-radius: 3px;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: ${p => p.scrolled ? 'var(--black)' : 'var(--white)'};
      &::after { width: 100%; }
    }
  }
`;

const CTAButton = styled.a`
  padding: 0.8rem 1.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--white);
  background: var(--coral);
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--coral-dark);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255,107,107,0.4);
  }
  
  @media (max-width: 900px) {
    display: none;
  }
`;

// Mobile Menu
const MobileMenuBtn = styled.button`
  display: none;
  background: ${p => p.scrolled ? 'var(--black)' : 'var(--white)'};
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
  
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  span {
    display: block;
    width: 20px;
    height: 2px;
    background: ${p => p.scrolled ? 'var(--white)' : 'var(--black)'};
    position: relative;
    transition: all 0.3s ease;
    
    ${p => p.isOpen && `background: transparent;`}
    
    &::before, &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background: ${p => p.scrolled ? 'var(--white)' : 'var(--black)'};
      left: 0;
      transition: all 0.3s ease;
    }
    
    &::before {
      top: -6px;
      ${p => p.isOpen && `top: 0; transform: rotate(45deg); background: var(--white);`}
    }
    &::after {
      bottom: -6px;
      ${p => p.isOpen && `bottom: 0; transform: rotate(-45deg); background: var(--white);`}
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 900px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--black);
    padding: 8rem 2rem 2rem;
    transform: translateX(${p => p.isOpen ? '0' : '100%'});
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
  }
`;

const MobileNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileNavLink = styled.li`
  overflow: hidden;
  
  a {
    display: block;
    font-size: 3rem;
    font-weight: 700;
    color: var(--white);
    padding: 0.5rem 0;
    transform: translateY(${p => p.isOpen ? '0' : '100%'});
    transition: transform 0.5s ease;
    transition-delay: ${p => 0.1 + p.index * 0.05}s;
    
    &:hover { color: var(--coral); }
  }
`;

const MobileDate = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 2rem;
  
  span {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gray-600);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--coral);
  }
`;

function Navigation({
  coupleNames = 'Sophie & Max',
  weddingDate = '12. Oktober 2025',
  links = [
    { label: 'Story', href: '#story' },
    { label: 'Details', href: '#location' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
  ],
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  return (
    <>
      <Nav scrolled={scrolled}>
        <NavInner>
          <Logo href="#top" scrolled={scrolled}>
            {coupleNames.split(' & ')[0]}<span>&</span>{coupleNames.split(' & ')[1]}
          </Logo>
          
          <NavLinks>
            {links.map((link, i) => (
              <NavLink key={i} scrolled={scrolled}>
                <a href={link.href}>{link.label}</a>
              </NavLink>
            ))}
          </NavLinks>
          
          <CTAButton href="#rsvp">RSVP Now</CTAButton>
          
          <MobileMenuBtn 
            scrolled={scrolled}
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span />
          </MobileMenuBtn>
        </NavInner>
      </Nav>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLinks>
          {links.map((link, i) => (
            <MobileNavLink key={i} index={i} isOpen={mobileMenuOpen}>
              <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </a>
            </MobileNavLink>
          ))}
        </MobileNavLinks>
        <MobileDate>
          <span>Save the date</span>
          <p>{weddingDate}</p>
        </MobileDate>
      </MobileMenu>
    </>
  );
}

export default Navigation;
