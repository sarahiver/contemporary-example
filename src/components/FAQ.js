import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #fafafa;
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
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuestionItem = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  border: 2px solid ${p => p.$open ? '#8B5CF6' : 'transparent'};
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.5s ease;
  transition-delay: ${p => 0.1 + p.$index * 0.05}s;
`;

const QuestionHeader = styled.button`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const QuestionText = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a2e;
  padding-right: 1rem;
`;

const ToggleIcon = styled.div`
  width: 36px;
  height: 36px;
  background: ${p => p.$open ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : '#f3f4f6'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  svg {
    width: 16px;
    height: 16px;
    stroke: ${p => p.$open ? '#fff' : '#6b7280'};
    transition: transform 0.3s ease;
    transform: rotate(${p => p.$open ? '180deg' : '0'});
  }
`;

const AnswerWrapper = styled.div`
  max-height: ${p => p.$open ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

const Answer = styled.div`
  padding: 0 1.5rem 1.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.7;
`;

const ContactBox = styled.div`
  margin-top: 3rem;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border-radius: 24px;
  padding: 2.5rem;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.5s;
`;

const ContactTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const ContactText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 1.5rem;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #8B5CF6;
  background: #fff;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
`;

function FAQ({ title = "We've got answers", faqs = [], contactEmail = 'hochzeit@email.de' }) {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const defaultFaqs = [
    { question: 'Gibt es einen Dresscode?', answer: 'Elegante Abendgarderobe! Die Herren gerne im Anzug, die Damen im Cocktail- oder Abendkleid. Bitte vermeidet Weiß – das ist der Braut vorbehalten. 👗' },
    { question: 'Kann ich jemanden mitbringen?', answer: 'Bitte habt Verständnis, dass wir nur die auf der Einladung genannten Personen empfangen können. Bei Fragen meldet euch gerne bei uns!' },
    { question: 'Sind Kinder willkommen?', answer: 'Wir haben uns für eine Feier nur für Erwachsene entschieden, damit alle entspannt feiern können. Wir hoffen auf euer Verständnis. 💕' },
    { question: 'Gibt es Parkplätze vor Ort?', answer: 'Ja! Kostenlose Parkplätze sind direkt an der Location vorhanden. Folgt einfach der Beschilderung. 🚗' },
    { question: 'Bis wann muss ich zusagen?', answer: 'Bitte gebt uns bis zum 15. Juni Bescheid, ob ihr dabei seid. Das hilft uns sehr bei der Planung! ⏰' },
    { question: 'Darf ich fotografieren?', answer: 'Während der Zeremonie bitten wir euch, keine Fotos zu machen – unser Fotograf hält alles fest. Bei der Feier dürft ihr natürlich knipsen! 📸' },
  ];

  const items = faqs.length > 0 ? faqs : defaultFaqs;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="faq">
      <Container>
        <Header>
          <Title $visible={visible}>{title}</Title>
        </Header>
        
        <QuestionList>
          {items.map((item, i) => (
            <QuestionItem 
              key={i} 
              $index={i} 
              $visible={visible}
              $open={openIndex === i}
            >
              <QuestionHeader onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <QuestionText>{item.question}</QuestionText>
                <ToggleIcon $open={openIndex === i}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </ToggleIcon>
              </QuestionHeader>
              <AnswerWrapper $open={openIndex === i}>
                <Answer>{item.answer}</Answer>
              </AnswerWrapper>
            </QuestionItem>
          ))}
        </QuestionList>
        
        <ContactBox $visible={visible}>
          <ContactTitle>Noch Fragen? 🤔</ContactTitle>
          <ContactText>Wir helfen euch gerne weiter!</ContactText>
          <ContactButton href={`mailto:${contactEmail}`}>
            E-Mail schreiben →
          </ContactButton>
        </ContactBox>
      </Container>
    </Section>
  );
}

export default FAQ;
