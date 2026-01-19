import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fff;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const Subtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #6b7280;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Form = styled.form`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05));
  border: 1px solid rgba(139, 92, 246, 0.1);
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 3rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const FormGroup = styled.div`
  margin-bottom: ${p => p.$full ? '1rem' : '0'};
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #1a1a2e;
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #1a1a2e;
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
`;

const SubmitButton = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
  }
`;

const EntriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Entry = styled.div`
  background: #f9fafb;
  border-radius: 20px;
  padding: 1.5rem 2rem;
  border-left: 4px solid;
  border-image: linear-gradient(180deg, #8B5CF6, #EC4899) 1;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.5s ease;
  transition-delay: ${p => 0.3 + p.$index * 0.1}s;
`;

const EntryText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1rem;
  font-style: italic;
`;

const EntryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const EntryAuthor = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a2e;
`;

const EntryDate = styled.span`
  font-family: 'Sora', sans-serif;
  font-size: 0.8rem;
  color: #9ca3af;
`;

function Guestbook({ title = 'Gästebuch 💝', subtitle = 'Hinterlasst uns einen lieben Gruß!', entries = [], onSubmit }) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  const defaultEntries = [
    { name: 'Julia & Peter', message: 'Wir freuen uns so sehr für euch! Möge eure Liebe für immer strahlen. Alles Gute für eure gemeinsame Zukunft!', date: '10. Mai 2025' },
    { name: 'Familie Schneider', message: 'Was für ein wundervolles Paar ihr seid. Wir können es kaum erwarten, mit euch zu feiern!', date: '8. Mai 2025' },
  ];

  const items = entries.length > 0 ? entries : defaultEntries;

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
    if (onSubmit) await onSubmit(formData);
    setFormData({ name: '', message: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Section ref={sectionRef} id="guestbook">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Form $visible={visible} onSubmit={handleSubmit}>
          <FormRow>
            <Input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Euer Name" required />
          </FormRow>
          <FormGroup $full>
            <TextArea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Eure Nachricht..." required />
          </FormGroup>
          <SubmitButton type="submit">{submitted ? '✓ Gesendet!' : 'Eintragen ✨'}</SubmitButton>
        </Form>
        
        <EntriesList>
          {items.map((entry, i) => (
            <Entry key={i} $index={i} $visible={visible}>
              <EntryText>"{entry.message}"</EntryText>
              <EntryMeta>
                <EntryAuthor>— {entry.name}</EntryAuthor>
                <EntryDate>{entry.date}</EntryDate>
              </EntryMeta>
            </Entry>
          ))}
        </EntriesList>
      </Container>
    </Section>
  );
}

export default Guestbook;
