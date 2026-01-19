import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const MusicIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${bounce} 2s ease-in-out infinite;
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
  color: rgba(255,255,255,0.7);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const Form = styled.form`
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 2.5rem;
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
  color: rgba(255,255,255,0.6);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #fff;
  background: rgba(255,255,255,0.08);
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &::placeholder { color: rgba(255,255,255,0.4); }
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    background: rgba(255,255,255,0.1);
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #fff;
  background: rgba(255,255,255,0.08);
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &::placeholder { color: rgba(255,255,255,0.4); }
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    background: rgba(255,255,255,0.1);
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
  }
`;

const SongList = styled.div`
  margin-top: 3rem;
`;

const SongListTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SongItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-20px'});
  transition: all 0.5s ease;
  transition-delay: ${p => 0.4 + p.$index * 0.1}s;
`;

const SongNumber = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

const SongInfo = styled.div`
  flex: 1;
`;

const SongTitle = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
`;

const SongArtist = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
`;

const SongBy = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.75rem;
  color: #EC4899;
`;

const Success = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  margin-top: 1rem;
`;

const SuccessText = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: #10b981;
`;

function MusicWishes({ title = 'Musikwünsche 🎵', subtitle = 'Welcher Song bringt euch garantiert auf die Tanzfläche?', songs = [], onSubmit }) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', song: '', artist: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  const defaultSongs = [
    { title: "Don't Stop Me Now", artist: 'Queen', by: 'Anna' },
    { title: 'September', artist: 'Earth, Wind & Fire', by: 'Thomas' },
    { title: 'Uptown Funk', artist: 'Bruno Mars', by: 'Lisa' },
  ];

  const items = songs.length > 0 ? songs : defaultSongs;

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
    setFormData({ name: '', song: '', artist: '', comment: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Section ref={sectionRef} id="music">
      <Container>
        <Header>
          <MusicIcon>🎶</MusicIcon>
          <Title $visible={visible}>{title}</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <Form $visible={visible} onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Dein Name</Label>
            <Input 
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="Wie heißt du?"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Songtitel *</Label>
            <Input 
              type="text"
              value={formData.song}
              onChange={e => setFormData({...formData, song: e.target.value})}
              placeholder="Dein Lieblingssong"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Künstler</Label>
            <Input 
              type="text"
              value={formData.artist}
              onChange={e => setFormData({...formData, artist: e.target.value})}
              placeholder="Band oder Interpret"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Kommentar (optional)</Label>
            <TextArea 
              value={formData.comment}
              onChange={e => setFormData({...formData, comment: e.target.value})}
              placeholder="Warum dieser Song?"
            />
          </FormGroup>
          
          <SubmitButton type="submit">Song einreichen 🎵</SubmitButton>
          
          {submitted && (
            <Success>
              <SuccessText>🎉 Danke! Dein Musikwunsch wurde gespeichert.</SuccessText>
            </Success>
          )}
        </Form>
        
        {items.length > 0 && (
          <SongList>
            <SongListTitle>Bisherige Wünsche</SongListTitle>
            {items.map((song, i) => (
              <SongItem key={i} $index={i} $visible={visible}>
                <SongNumber>{i + 1}</SongNumber>
                <SongInfo>
                  <SongTitle>{song.title}</SongTitle>
                  <SongArtist>{song.artist}</SongArtist>
                </SongInfo>
                <SongBy>von {song.by}</SongBy>
              </SongItem>
            ))}
          </SongList>
        )}
      </Container>
    </Section>
  );
}

export default MusicWishes;
