import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
  from { transform: scale(0.8) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
`;

const typing = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--gray-100);
`;

const Container = styled.div`
  max-width: 800px;
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
  letter-spacing: -0.03em;
`;

// Chat interface container
const ChatContainer = styled.div`
  background: var(--white);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
`;

// Question selector (tabs)
const QuestionTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem;
  overflow-x: auto;
  background: var(--gray-100);
  border-bottom: 1px solid var(--gray-200);
  scrollbar-width: none;
  
  &::-webkit-scrollbar { display: none; }
`;

const QuestionTab = styled.button`
  flex-shrink: 0;
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${p => p.active ? 'var(--white)' : 'var(--gray-600)'};
  background: ${p => p.active ? 'var(--coral)' : 'var(--white)'};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    ${p => !p.active && 'background: var(--gray-200);'}
  }
`;

// Chat window
const ChatWindow = styled.div`
  padding: 2rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Chat bubbles
const ChatBubble = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  animation: ${popIn} 0.4s ease;
  
  ${p => p.isAnswer ? `
    flex-direction: row-reverse;
    text-align: right;
  ` : ''}
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${p => p.isAnswer ? 'var(--coral)' : 'var(--electric)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
`;

const BubbleContent = styled.div`
  max-width: 80%;
`;

const BubbleText = styled.div`
  padding: 1.25rem 1.5rem;
  background: ${p => p.isAnswer ? 'var(--coral)' : 'var(--gray-100)'};
  color: ${p => p.isAnswer ? 'var(--white)' : 'var(--black)'};
  border-radius: ${p => p.isAnswer ? '20px 20px 5px 20px' : '20px 20px 20px 5px'};
  font-size: 1rem;
  line-height: 1.6;
`;

const BubbleTime = styled.div`
  font-size: 0.7rem;
  color: var(--gray-600);
  margin-top: 0.5rem;
  padding: 0 0.5rem;
`;

// Typing indicator
const TypingIndicator = styled.div`
  display: flex;
  gap: 0.3rem;
  padding: 1rem 1.5rem;
  background: var(--gray-100);
  border-radius: 20px;
  width: fit-content;
  
  span {
    width: 8px;
    height: 8px;
    background: var(--gray-400);
    border-radius: 50%;
    animation: ${typing} 1.4s infinite ease-in-out;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

// Contact section at bottom
const ContactSection = styled.div`
  padding: 1.5rem 2rem;
  background: var(--black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ContactText = styled.p`
  font-size: 0.9rem;
  color: var(--gray-300);
  
  strong {
    color: var(--white);
  }
`;

const ContactBtn = styled.a`
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--black);
  background: var(--yellow);
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--white);
    transform: translateY(-2px);
  }
`;

function FAQ({
  faqs = [
    { question: 'Dresscode?', answer: 'Smart Casual mit einem Twist! Denkt an bunte Farben und bequeme Schuhe zum Tanzen. Kein Weiß bitte – das ist für die Braut reserviert! 👗', avatar: '👔' },
    { question: 'Begleitung?', answer: 'Schaut auf eure Einladung – dort steht, wer alles eingeladen ist. Bei Fragen meldet euch gerne direkt bei uns! 💌', avatar: '💑' },
    { question: 'Kinder?', answer: 'We love kids! Es gibt eine Kinderbetreuung und ein spezielles Kindermenü. Bringt eure Kleinen gerne mit! 👶', avatar: '👶' },
    { question: 'Geschenke?', answer: 'Eure Anwesenheit ist das größte Geschenk! Wer dennoch etwas beitragen möchte, freuen wir uns über einen Beitrag zu unserer Hochzeitsreise. 🎁', avatar: '🎁' },
    { question: 'Fotos?', answer: 'Unplugged Ceremony bitte! Bei der Feier dürft ihr dann alles knipsen und teilen. #SophieUndMax 📸', avatar: '📸' },
    { question: 'Parken?', answer: 'Kostenlose Parkplätze direkt an der Location. Für die Party-People: Taxi oder Uber empfohlen! 🚗', avatar: '🚗' },
  ],
  contactEmail = 'hello@sophieundmax.de',
}) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setShowAnswer(false);
    setIsTyping(true);
    
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setShowAnswer(true);
    }, 1000);
    
    return () => clearTimeout(typingTimer);
  }, [activeIndex]);

  const currentFaq = faqs[activeIndex];

  return (
    <Section ref={sectionRef} id="faq">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Got Questions?</Eyebrow>
          <Title>We've got answers</Title>
        </Header>
        
        <ChatContainer>
          <QuestionTabs>
            {faqs.map((faq, i) => (
              <QuestionTab 
                key={i}
                active={activeIndex === i}
                onClick={() => setActiveIndex(i)}
              >
                {faq.question}
              </QuestionTab>
            ))}
          </QuestionTabs>
          
          <ChatWindow>
            {/* Question bubble */}
            <ChatBubble>
              <Avatar>🙋</Avatar>
              <BubbleContent>
                <BubbleText>{currentFaq.question}</BubbleText>
                <BubbleTime>You, just now</BubbleTime>
              </BubbleContent>
            </ChatBubble>
            
            {/* Typing indicator or answer */}
            {isTyping ? (
              <ChatBubble isAnswer>
                <Avatar isAnswer>{currentFaq.avatar}</Avatar>
                <BubbleContent>
                  <TypingIndicator>
                    <span /><span /><span />
                  </TypingIndicator>
                </BubbleContent>
              </ChatBubble>
            ) : showAnswer && (
              <ChatBubble isAnswer>
                <Avatar isAnswer>{currentFaq.avatar}</Avatar>
                <BubbleContent>
                  <BubbleText isAnswer>{currentFaq.answer}</BubbleText>
                  <BubbleTime>Sophie & Max</BubbleTime>
                </BubbleContent>
              </ChatBubble>
            )}
          </ChatWindow>
          
          <ContactSection>
            <ContactText>
              <strong>Still have questions?</strong> We're happy to help!
            </ContactText>
            <ContactBtn href={`mailto:${contactEmail}`}>
              Message us ✉️
            </ContactBtn>
          </ContactSection>
        </ChatContainer>
      </Container>
    </Section>
  );
}

export default FAQ;
