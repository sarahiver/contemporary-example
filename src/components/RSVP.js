import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
`;

const IncludedBadge = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  &::before { content: '✓'; }
`;

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const Subtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.85);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Form = styled.form`
  background: #fff;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.2);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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
  padding: 1rem 1.25rem;
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
    background: #fff;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${p => p.$checked ? '#fff' : '#6b7280'};
  background: ${p => p.$checked ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : '#f9fafb'};
  border: 2px solid ${p => p.$checked ? 'transparent' : '#e5e7eb'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${p => p.$checked ? 'transparent' : '#8B5CF6'};
  }
  
  input { display: none; }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #1a1a2e;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #1a1a2e;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.25rem 2rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 2s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
    
    &::before { opacity: 1; }
  }
  
  &:disabled {
    background: #e5e7eb;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Success = styled.div`
  text-align: center;
  padding: 3rem;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.2);
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const SuccessText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #6b7280;
`;

function RSVP({ title = 'RSVP', subtitle = 'Bitte lasst uns bis zum 15. Juni wissen, ob ihr dabei seid.', onSubmit, showBadge = false }) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', guests: '1', menu: '', dietary: '', message: '' });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) await onSubmit({ ...formData, attending });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section ref={sectionRef} id="rsvp">
        {showBadge && <IncludedBadge>Inklusive</IncludedBadge>}
        <Container>
          <Success>
            <SuccessIcon>{attending === 'yes' ? '🎉' : '💕'}</SuccessIcon>
            <SuccessTitle>{attending === 'yes' ? 'Awesome!' : 'Danke!'}</SuccessTitle>
            <SuccessText>
              {attending === 'yes' ? 'Wir freuen uns riesig auf euch!' : 'Schade, aber wir verstehen das. Wir denken an euch!'}
            </SuccessText>
          </Success>
        </Container>
      </Section>
    );
  }

  return (
    <Section ref={sectionRef} id="rsvp">
      {showBadge && <IncludedBadge>Inklusive</IncludedBadge>}
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Form $visible={visible} onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name *</Label>
            <Input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Vor- und Nachname"
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>E-Mail *</Label>
            <Input 
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@beispiel.de"
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Bist du dabei? *</Label>
            <RadioGroup>
              <RadioLabel $checked={attending === 'yes'}>
                <input type="radio" name="attending" checked={attending === 'yes'} onChange={() => setAttending('yes')} />
                🎉 Ja, klar!
              </RadioLabel>
              <RadioLabel $checked={attending === 'no'}>
                <input type="radio" name="attending" checked={attending === 'no'} onChange={() => setAttending('no')} />
                😢 Leider nein
              </RadioLabel>
            </RadioGroup>
          </FormGroup>
          
          {attending === 'yes' && (
            <>
              <FormGroup>
                <Label>Anzahl Gäste</Label>
                <Select value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })}>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}</option>)}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Menüwahl</Label>
                <Select value={formData.menu} onChange={e => setFormData({ ...formData, menu: e.target.value })}>
                  <option value="">Bitte auswählen</option>
                  <option value="meat">🥩 Fleisch</option>
                  <option value="fish">🐟 Fisch</option>
                  <option value="veggie">🥗 Vegetarisch</option>
                  <option value="vegan">🌱 Vegan</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Allergien / Unverträglichkeiten</Label>
                <Input 
                  type="text"
                  value={formData.dietary}
                  onChange={e => setFormData({ ...formData, dietary: e.target.value })}
                  placeholder="z.B. Laktoseintoleranz, Nussallergie..."
                />
              </FormGroup>
            </>
          )}
          
          <FormGroup>
            <Label>Nachricht (optional)</Label>
            <TextArea 
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Noch etwas, das wir wissen sollten?"
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={attending === null}>
            Absenden ✨
          </SubmitButton>
        </Form>
      </Container>
    </Section>
  );
}

export default RSVP;
