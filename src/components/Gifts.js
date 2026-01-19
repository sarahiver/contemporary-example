import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--white);
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 700;
  color: var(--black);
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  font-size: 1.1rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

// Gift card with flip effect
const GiftCard = styled.div`
  background: linear-gradient(135deg, var(--electric), var(--purple));
  border-radius: 30px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '40px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
  
  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

const FloatingEmoji = styled.div`
  position: absolute;
  font-size: ${p => p.size}rem;
  top: ${p => p.top};
  right: ${p => p.right};
  opacity: 0.6;
  ${p => css`
    animation: ${float} ${p.duration}s ease-in-out infinite;
    animation-delay: ${p.delay}s;
  `}
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.7;
  max-width: 500px;
  margin: 0 auto 2rem;
`;

// Bank details with copy function
const BankDetails = styled.div`
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  
  &:last-child { border-bottom: none; }
  
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
`;

const DetailValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  span {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.95rem;
    color: var(--white);
  }
`;

const CopyBtn = styled.button`
  padding: 0.4rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--black);
  background: var(--yellow);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--white);
    transform: scale(1.05);
  }
`;

// Optional wishlist link
const WishlistSection = styled.div`
  margin-top: 3rem;
  text-align: center;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.4s;
`;

const WishlistLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--black);
  background: var(--yellow);
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--coral);
    color: var(--white);
    transform: translateY(-3px);
  }
`;

function Gifts({
  intro = 'Eure Anwesenheit ist uns das Wichtigste! Wer uns dennoch beschenken möchte, findet hier einige Ideen.',
  honeymoonText = 'Wir träumen von einem Abenteuer nach der Hochzeit! Ob Road Trip durch Kalifornien oder Strandurlaub in Thailand – jeder Beitrag bringt uns dem Traum näher.',
  bankDetails = { recipient: 'Sophie & Max Mustermann', iban: 'DE89 3704 0044 0532 0130 00', bic: 'COBADEFFXXX', reference: 'Adventure Fund ✈️' },
  wishlistUrl = null,
}) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Section ref={sectionRef} id="gifts">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Gift Ideas</Eyebrow>
          <Title>No registry, but...</Title>
          <Intro>{intro}</Intro>
        </Header>
        
        <GiftCard visible={visible}>
          <FloatingEmoji size={4} top="10%" right="10%" duration={6} delay={0}>✈️</FloatingEmoji>
          <FloatingEmoji size={3} top="60%" right="5%" duration={8} delay={1}>🌴</FloatingEmoji>
          <FloatingEmoji size={2.5} top="30%" right="25%" duration={5} delay={2}>🎉</FloatingEmoji>
          
          <CardContent>
            <CardIcon>🌍</CardIcon>
            <CardTitle>Honeymoon Fund</CardTitle>
            <CardText>{honeymoonText}</CardText>
            
            {bankDetails && (
              <BankDetails>
                <DetailRow>
                  <DetailLabel>Empfänger</DetailLabel>
                  <DetailValue>
                    <span>{bankDetails.recipient}</span>
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>IBAN</DetailLabel>
                  <DetailValue>
                    <span>{bankDetails.iban}</span>
                    <CopyBtn onClick={() => copyToClipboard(bankDetails.iban, 'iban')}>
                      {copied === 'iban' ? 'Copied! ✓' : 'Copy'}
                    </CopyBtn>
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>BIC</DetailLabel>
                  <DetailValue>
                    <span>{bankDetails.bic}</span>
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Reference</DetailLabel>
                  <DetailValue>
                    <span>{bankDetails.reference}</span>
                  </DetailValue>
                </DetailRow>
              </BankDetails>
            )}
          </CardContent>
        </GiftCard>
        
        {wishlistUrl && (
          <WishlistSection visible={visible}>
            <WishlistLink href={wishlistUrl} target="_blank">
              Or check our wishlist →
            </WishlistLink>
          </WishlistSection>
        )}
      </Container>
    </Section>
  );
}

export default Gifts;
