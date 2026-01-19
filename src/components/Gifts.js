import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const Subtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const MainCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 32px;
  padding: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const MainIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const MainTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
`;

const MainText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.9);
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const CopyBox = styled.div`
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  display: inline-block;
  max-width: 100%;
`;

const CopyLabel = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin-bottom: 0.5rem;
`;

const CopyValue = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  word-break: break-all;
`;

const WishlistTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  margin-bottom: 2rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: all 0.8s ease;
  transition-delay: 0.3s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const GiftCard = styled.div`
  background: #f9fafb;
  border: 2px solid ${p => p.$reserved ? '#e5e7eb' : 'transparent'};
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: ${p => 0.4 + p.$index * 0.1}s;
  
  ${p => !p.$reserved && `
    &:hover {
      border-color: #8B5CF6;
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.15);
      transform: translateY(-5px);
    }
  `}
`;

const ReservedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #10b981;
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
`;

const GiftImage = styled.div`
  width: 100%;
  height: 140px;
  background: ${p => p.$image ? `url(${p.$image}) center/cover` : 'linear-gradient(135deg, #e0e7ff, #fce7f3)'};
  border-radius: 12px;
  margin-bottom: 1rem;
  opacity: ${p => p.$reserved ? 0.5 : 1};
`;

const GiftName = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${p => p.$reserved ? '#9ca3af' : '#1a1a2e'};
  margin-bottom: 0.5rem;
`;

const GiftPrice = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  background: ${p => p.$reserved ? '#9ca3af' : 'linear-gradient(135deg, #8B5CF6, #EC4899)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const ReserveButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${p => p.$reserved ? '#9ca3af' : '#fff'};
  background: ${p => p.$reserved ? '#e5e7eb' : 'linear-gradient(135deg, #8B5CF6, #EC4899)'};
  border: none;
  border-radius: 10px;
  cursor: ${p => p.$reserved ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  ${p => !p.$reserved && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
    }
  `}
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
`;

const ModalTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const ModalSubtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 1rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$primary ? `
    color: #fff;
    background: linear-gradient(135deg, #8B5CF6, #EC4899);
    &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3); }
  ` : `
    color: #6b7280;
    background: #f3f4f6;
    &:hover { background: #e5e7eb; }
  `}
`;

function Gifts({ title = 'No registry, but...', subtitle = 'Das größte Geschenk ist eure Anwesenheit! Wer uns dennoch etwas schenken möchte:', gifts = [], onReserve }) {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [reserverName, setReserverName] = useState('');
  const sectionRef = useRef(null);

  const defaultGifts = [
    { id: 1, name: 'KitchenAid Küchenmaschine', price: '599€', image: null, reserved: false },
    { id: 2, name: 'Dyson Staubsauger V15', price: '649€', image: null, reserved: true, reservedBy: 'Familie Müller' },
    { id: 3, name: 'Nespresso Kaffeemaschine', price: '299€', image: null, reserved: false },
    { id: 4, name: 'Philips Hue Starter Set', price: '149€', image: null, reserved: false },
    { id: 5, name: 'Weber Gasgrill Spirit', price: '549€', image: null, reserved: true, reservedBy: 'Thomas' },
    { id: 6, name: 'Bettwäsche-Set Premium', price: '189€', image: null, reserved: false },
  ];

  const items = gifts.length > 0 ? gifts : defaultGifts;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleReserve = (gift) => {
    setSelectedGift(gift);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (onReserve) await onReserve({ gift: selectedGift, reserverName });
    setModalOpen(false);
    setReserverName('');
  };

  return (
    <Section ref={sectionRef} id="gifts">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <MainCard $visible={visible}>
          <MainIcon>✈️</MainIcon>
          <MainTitle>Honeymoon Fund</MainTitle>
          <MainText>
            Anstatt einer klassischen Hochzeitsliste freuen wir uns über einen Beitrag zu unserer Traumreise nach Bali! 🌴
          </MainText>
          <CopyBox>
            <CopyLabel>IBAN</CopyLabel>
            <CopyValue>DE89 3704 0044 0532 0130 00</CopyValue>
          </CopyBox>
        </MainCard>
        
        <WishlistTitle $visible={visible}>Oder von unserer Wunschliste 🎁</WishlistTitle>
        
        <Grid>
          {items.map((gift, i) => (
            <GiftCard key={gift.id} $index={i} $visible={visible} $reserved={gift.reserved}>
              {gift.reserved && <ReservedBadge>Reserviert</ReservedBadge>}
              <GiftImage $image={gift.image} $reserved={gift.reserved} />
              <GiftName $reserved={gift.reserved}>{gift.name}</GiftName>
              <GiftPrice $reserved={gift.reserved}>{gift.price}</GiftPrice>
              <ReserveButton 
                $reserved={gift.reserved}
                onClick={() => !gift.reserved && handleReserve(gift)}
                disabled={gift.reserved}
              >
                {gift.reserved ? `von ${gift.reservedBy}` : 'Reservieren'}
              </ReserveButton>
            </GiftCard>
          ))}
        </Grid>
        
        <Modal $open={modalOpen} onClick={() => setModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Geschenk reservieren</ModalTitle>
            <ModalSubtitle>{selectedGift?.name} – {selectedGift?.price}</ModalSubtitle>
            <ModalInput 
              type="text"
              value={reserverName}
              onChange={e => setReserverName(e.target.value)}
              placeholder="Dein Name"
            />
            <ModalButtons>
              <ModalButton onClick={() => setModalOpen(false)}>Abbrechen</ModalButton>
              <ModalButton $primary onClick={handleConfirm}>Reservieren</ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      </Container>
    </Section>
  );
}

export default Gifts;
