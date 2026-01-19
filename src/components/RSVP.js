import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, var(--coral) 0%, var(--purple) 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

// Background decorations
const BgCircle = styled.div`
  position: absolute;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  top: ${p => p.top};
  left: ${p => p.left};
  right: ${p => p.right};
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
`;

const Card = styled.div`
  background: var(--white);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 30px 80px rgba(0,0,0,0.2);
  
  @media (max-width: 600px) {
    padding: 2rem;
    border-radius: 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: var(--gray-600);
`;

// Progress bar
const ProgressWrapper = styled.div`
  margin-bottom: 3rem;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 40px;
    right: 40px;
    height: 4px;
    background: var(--gray-200);
    border-radius: 2px;
  }
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 20px;
  left: 40px;
  height: 4px;
  background: var(--coral);
  border-radius: 2px;
  width: ${p => p.progress}%;
  transition: width 0.5s ease;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StepCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${p => p.active ? 'var(--coral)' : p.completed ? 'var(--electric)' : 'var(--gray-200)'};
  color: ${p => p.active || p.completed ? 'var(--white)' : 'var(--gray-600)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  ${p => p.active && css`animation: ${pulse} 2s ease-in-out infinite;`}
`;

const StepLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${p => p.active ? 'var(--coral)' : 'var(--gray-600)'};
  margin-top: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

// Form content
const FormContent = styled.div`
  animation: ${slideIn} 0.4s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray-600);
  margin-bottom: 0.75rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  font-size: 1rem;
  color: var(--black);
  background: var(--gray-100);
  border: 2px solid transparent;
  border-radius: 15px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--coral);
    background: var(--white);
  }
  
  &::placeholder { color: var(--gray-300); }
`;

const Select = styled.select`
  width: 100%;
  padding: 1.2rem 1.5rem;
  font-size: 1rem;
  color: var(--black);
  background: var(--gray-100);
  border: 2px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--coral);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1.2rem 1.5rem;
  font-size: 1rem;
  color: var(--black);
  background: var(--gray-100);
  border: 2px solid transparent;
  border-radius: 15px;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--coral);
    background: var(--white);
  }
`;

// Yes/No toggle buttons
const ToggleGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ToggleBtn = styled.button`
  padding: 1.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${p => p.selected ? 'var(--white)' : 'var(--black)'};
  background: ${p => p.selected ? 'var(--coral)' : 'var(--gray-100)'};
  border: 2px solid ${p => p.selected ? 'var(--coral)' : 'transparent'};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  span {
    display: block;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  &:hover {
    ${p => !p.selected && `background: var(--gray-200);`}
  }
`;

// Navigation buttons
const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
`;

const NavBtn = styled.button`
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.primary ? `
    background: var(--coral);
    color: var(--white);
    border: none;
    flex: 1;
    
    &:hover {
      background: var(--coral-dark);
      transform: translateY(-2px);
    }
  ` : `
    background: transparent;
    color: var(--gray-600);
    border: 2px solid var(--gray-200);
    
    &:hover {
      border-color: var(--gray-300);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Success view
const SuccessView = styled.div`
  text-align: center;
  padding: 2rem 0;
  
  .emoji {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    animation: ${pulse} 2s ease-in-out infinite;
  }
  
  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    color: var(--gray-600);
    line-height: 1.6;
  }
`;

function RSVP({
  deadline = '15. September 2025',
  menuOptions = ['Vegetarisch', 'Vegan', 'Fleisch', 'Fisch'],
  onSubmit = (data) => console.log('RSVP:', data),
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: null,
    guests: '1',
    menu: '',
    dietary: '',
    song: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.email && formData.attendance !== null;
    if (step === 2) return formData.attendance === 'no' || (formData.menu);
    return true;
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      onSubmit(formData);
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <Section id="rsvp">
        <BgCircle size={300} top="10%" left="-5%" />
        <BgCircle size={200} top="60%" right="-3%" />
        <Container>
          <Card>
            <SuccessView>
              <div className="emoji">{formData.attendance === 'yes' ? '🎉' : '💔'}</div>
              <h3>{formData.attendance === 'yes' ? 'Awesome!' : 'We\'ll miss you!'}</h3>
              <p>
                {formData.attendance === 'yes' 
                  ? `Thanks ${formData.name}! We can't wait to celebrate with you.`
                  : `Thanks for letting us know, ${formData.name}. We'll be thinking of you!`
                }
              </p>
            </SuccessView>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="rsvp">
      <BgCircle size={300} top="10%" left="-5%" />
      <BgCircle size={200} top="60%" right="-3%" />
      <BgCircle size={150} top="80%" left="20%" />
      
      <Container>
        <Card>
          <Header>
            <Title>RSVP</Title>
            <Subtitle>Let us know if you can make it!</Subtitle>
          </Header>
          
          <ProgressWrapper>
            <ProgressSteps>
              <ProgressLine progress={progress} />
              {['Info', 'Details', 'Finish'].map((label, i) => (
                <Step key={i}>
                  <StepCircle active={step === i + 1} completed={step > i + 1}>
                    {step > i + 1 ? '✓' : i + 1}
                  </StepCircle>
                  <StepLabel active={step === i + 1}>{label}</StepLabel>
                </Step>
              ))}
            </ProgressSteps>
          </ProgressWrapper>
          
          <FormContent key={step}>
            {step === 1 && (
              <>
                <FormGroup>
                  <Label>Your Name</Label>
                  <Input 
                    type="text" 
                    placeholder="Sophie & Max"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Will you be joining us?</Label>
                  <ToggleGroup>
                    <ToggleBtn 
                      type="button"
                      selected={formData.attendance === 'yes'}
                      onClick={() => updateField('attendance', 'yes')}
                    >
                      <span>🎉</span>
                      Hell Yes!
                    </ToggleBtn>
                    <ToggleBtn 
                      type="button"
                      selected={formData.attendance === 'no'}
                      onClick={() => updateField('attendance', 'no')}
                    >
                      <span>😢</span>
                      Can't make it
                    </ToggleBtn>
                  </ToggleGroup>
                </FormGroup>
              </>
            )}
            
            {step === 2 && formData.attendance === 'yes' && (
              <>
                <FormGroup>
                  <Label>How many guests?</Label>
                  <Select 
                    value={formData.guests}
                    onChange={(e) => updateField('guests', e.target.value)}
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Menu Choice</Label>
                  <Select 
                    value={formData.menu}
                    onChange={(e) => updateField('menu', e.target.value)}
                  >
                    <option value="">Select your preference</option>
                    {menuOptions.map((opt, i) => (
                      <option key={i} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Dietary requirements (optional)</Label>
                  <Input 
                    type="text" 
                    placeholder="Allergies, intolerances..."
                    value={formData.dietary}
                    onChange={(e) => updateField('dietary', e.target.value)}
                  />
                </FormGroup>
              </>
            )}
            
            {step === 2 && formData.attendance === 'no' && (
              <FormGroup>
                <Label>Send us a message (optional)</Label>
                <Textarea 
                  placeholder="We'll miss you! Any words for the happy couple?"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                />
              </FormGroup>
            )}
            
            {step === 3 && (
              <>
                <FormGroup>
                  <Label>Song Request 🎵</Label>
                  <Input 
                    type="text" 
                    placeholder="What song gets you on the dance floor?"
                    value={formData.song}
                    onChange={(e) => updateField('song', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Any message for us? (optional)</Label>
                  <Textarea 
                    placeholder="We'd love to hear from you!"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </FormGroup>
              </>
            )}
          </FormContent>
          
          <NavButtons>
            <NavBtn onClick={handleBack} disabled={step === 1}>
              ← Back
            </NavBtn>
            <NavBtn primary onClick={handleNext} disabled={!canProceed()}>
              {step === totalSteps ? 'Submit RSVP' : 'Next →'}
            </NavBtn>
          </NavButtons>
        </Card>
      </Container>
    </Section>
  );
}

export default RSVP;
