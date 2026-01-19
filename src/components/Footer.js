import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const FooterSection = styled.footer`
  background: #fff;
  padding: 6rem 2rem 2rem;
  position: relative;
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
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  &::before { content: '✓'; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MainContent = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 2rem;
  line-height: 1;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  padding: 1.25rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
  margin-bottom: 2rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Names = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .ampersand {
    background: linear-gradient(135deg, #8B5CF6, #EC4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Copyright = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  color: #9ca3af;
`;

const AdminButton = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover { color: #6b7280; }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 24px;
  max-width: 400px;
  width: 100%;
  position: relative;
`;

const ModalTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #1a1a2e;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
  }
`;

const Error = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  color: #ef4444;
  text-align: center;
  margin-top: 1rem;
`;

function Footer({ coupleNames = 'Sophie & Max', onLogin, adminEmail = 'admin', adminPassword = 'password', showBadge = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (email === adminEmail && password === adminPassword) {
      if (onLogin) onLogin(email, password);
      setModalOpen(false);
      setEmail('');
      setPassword('');
    } else {
      setError('Ungültige Anmeldedaten');
    }
  };

  const names = coupleNames.split('&');
  const year = new Date().getFullYear();

  return (
    <FooterSection id="footer">
      {showBadge && <IncludedBadge>Inklusive</IncludedBadge>}
      
      <Container>
        <MainContent>
          <Title>See you soon!</Title>
          <CTAButton href="#rsvp">
            RSVP Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </CTAButton>
        </MainContent>
        
        <Divider />
        
        <Bottom>
          <Names>
            {names[0]?.trim()} <span className="ampersand">&</span> {names[1]?.trim()}
          </Names>
          <Copyright>© {year} · Made with 💕</Copyright>
          <AdminButton onClick={() => setModalOpen(true)}>Admin</AdminButton>
        </Bottom>
      </Container>
      
      <Modal $open={modalOpen} onClick={() => setModalOpen(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalTitle>Admin Login</ModalTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>E-Mail</Label>
              <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.de" required />
            </FormGroup>
            <FormGroup>
              <Label>Passwort</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </FormGroup>
            <SubmitButton type="submit">Anmelden</SubmitButton>
            {error && <Error>{error}</Error>}
          </form>
        </ModalContent>
      </Modal>
    </FooterSection>
  );
}

export default Footer;
