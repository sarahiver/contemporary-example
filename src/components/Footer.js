import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const FooterSection = styled.footer`
  padding: 6rem 2rem 3rem;
  background: var(--black);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopSection = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const BigText = styled.h3`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 2rem;
  
  span {
    color: var(--coral);
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 1.2rem 3rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--black);
  background: var(--yellow);
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &:hover {
    background: var(--coral);
    color: var(--white);
    transform: translateY(-3px);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--gray-800);
  margin-bottom: 3rem;
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const BrandCol = styled.div``;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 1rem;
  
  span { color: var(--coral); }
`;

const Tagline = styled.p`
  font-size: 0.95rem;
  color: var(--gray-600);
  line-height: 1.7;
  max-width: 300px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Column = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 1.5rem;
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const LinkItem = styled.li`
  a, button {
    font-size: 0.9rem;
    color: var(--gray-300);
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover { color: var(--white); }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-800);
  
  p {
    font-size: 0.8rem;
    color: var(--gray-600);
    
    a {
      color: var(--coral);
      text-decoration: none;
      
      &:hover { text-decoration: underline; }
    }
  }
`;

// Modal
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  opacity: ${p => p.isOpen ? 1 : 0};
  visibility: ${p => p.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const Modal = styled.div`
  background: var(--white);
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  padding: 3rem;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  background: var(--gray-100);
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: var(--coral); color: var(--white); }
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 0.5rem;
`;

const ModalSubtitle = styled.p`
  font-size: 0.9rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: var(--black);
  background: var(--gray-100);
  border: 2px solid transparent;
  border-radius: 15px;
  
  &:focus {
    outline: none;
    border-color: var(--coral);
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  background: var(--coral);
  border: none;
  border-radius: 50px;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: var(--coral-dark); }
  &:disabled { opacity: 0.5; }
`;

const ErrorMsg = styled.p`
  font-size: 0.85rem;
  color: var(--coral);
  text-align: center;
  margin-top: 1rem;
`;

function Footer({
  coupleNames = 'Sophie & Max',
  tagline = 'Can\'t wait to celebrate our love story with all of you!',
  links = [
    { label: 'Our Story', href: '#story' },
    { label: 'Details', href: '#location' },
    { label: 'RSVP', href: '#rsvp' },
  ],
  quickLinks = [
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Wedding ABC', href: '#abc' },
  ],
  onLogin = (email, password) => console.log('Login:', email, password),
  adminEmail = 'demo',
  adminPassword = 'demo',
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (email === adminEmail && password === adminPassword) {
      onLogin(email, password);
      setIsModalOpen(false);
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <>
      <FooterSection>
        <Container>
          <TopSection>
            <BigText>See you <span>soon!</span></BigText>
            <CTAButton href="#rsvp">RSVP Now →</CTAButton>
          </TopSection>
          
          <Divider />
          
          <BottomSection>
            <BrandCol>
              <Logo>{coupleNames.split(' & ')[0]}<span>&</span>{coupleNames.split(' & ')[1]}</Logo>
              <Tagline>{tagline}</Tagline>
            </BrandCol>
            
            <Column>
              <ColumnTitle>Navigation</ColumnTitle>
              <LinkList>
                {links.map((link, i) => (
                  <LinkItem key={i}><a href={link.href}>{link.label}</a></LinkItem>
                ))}
              </LinkList>
            </Column>
            
            <Column>
              <ColumnTitle>Quick Links</ColumnTitle>
              <LinkList>
                {quickLinks.map((link, i) => (
                  <LinkItem key={i}><a href={link.href}>{link.label}</a></LinkItem>
                ))}
                <LinkItem><button onClick={() => setIsModalOpen(true)}>Admin 🔒</button></LinkItem>
              </LinkList>
            </Column>
          </BottomSection>
          
          <Copyright>
            <p>© {new Date().getFullYear()} {coupleNames} • Made with ❤️ by <a href="https://si-wedding.de" target="_blank" rel="noopener noreferrer">S&I Wedding</a></p>
          </Copyright>
        </Container>
      </FooterSection>
      
      <ModalOverlay isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <Modal onClick={e => e.stopPropagation()}>
          <ModalClose onClick={() => setIsModalOpen(false)}>✕</ModalClose>
          <ModalTitle>Admin Login</ModalTitle>
          <ModalSubtitle>Access RSVP data and photos</ModalSubtitle>
          <LoginForm onSubmit={handleLogin}>
            <Input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <LoginBtn type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</LoginBtn>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </LoginForm>
        </Modal>
      </ModalOverlay>
    </>
  );
}

export default Footer;
