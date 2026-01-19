import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, var(--yellow) 0%, var(--coral) 100%);
  position: relative;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--black);
  opacity: 0.6;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: 700;
  color: var(--black);
`;

const UploadCard = styled.div`
  background: var(--white);
  border-radius: 30px;
  padding: 2.5rem;
  box-shadow: 0 30px 80px rgba(0,0,0,0.15);
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
`;

const DropZone = styled.div`
  padding: 4rem 2rem;
  border: 3px dashed ${p => p.isDragging ? 'var(--coral)' : 'var(--gray-200)'};
  border-radius: 20px;
  background: ${p => p.isDragging ? 'rgba(255,107,107,0.05)' : 'var(--gray-100)'};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--coral);
    background: rgba(255,107,107,0.05);
  }
`;

const DropIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const DropText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 0.5rem;
`;

const DropSubtext = styled.p`
  font-size: 0.85rem;
  color: var(--gray-600);
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 28px;
  height: 28px;
  background: var(--coral);
  color: var(--white);
  border: none;
  border-radius: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${PreviewItem}:hover & { opacity: 1; }
`;

const SubmitSection = styled.div`
  margin-top: 2rem;
`;

const GuestInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  font-size: 1rem;
  color: var(--black);
  background: var(--gray-100);
  border: 2px solid transparent;
  border-radius: 15px;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--coral);
  }
  
  &::placeholder { color: var(--gray-400); }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1.2rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  background: var(--coral);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: var(--coral-dark);
    transform: translateY(-2px);
  }
  
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const SuccessView = styled.div`
  text-align: center;
  padding: 3rem 0;
  
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
    font-size: 1rem;
    color: var(--gray-600);
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.4s;
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--black);
  }
  
  .label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--black);
    opacity: 0.5;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 0.25rem;
  }
`;

function PhotoUpload({
  maxFiles = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/heic'],
  totalPhotos = 156,
  totalGuests = 42,
  onUpload = (files, guestName) => console.log('Upload:', files, guestName),
}) {
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files).filter(f => acceptedTypes.includes(f.type));
    addFiles(newFiles);
  };

  const addFiles = (newFiles) => {
    const combined = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(combined.map(file => file.preview ? file : { file, preview: URL.createObjectURL(file) }));
  };

  const removeFile = (i) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[i].preview);
    newFiles.splice(i, 1);
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    if (files.length === 0 || !guestName.trim()) return;
    onUpload(files.map(f => f.file), guestName);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section ref={sectionRef} id="photos">
        <Container>
          <UploadCard visible={true}>
            <SuccessView>
              <div className="emoji">🎉</div>
              <h3>Awesome, {guestName}!</h3>
              <p>{files.length} photos uploaded successfully.</p>
            </SuccessView>
          </UploadCard>
        </Container>
      </Section>
    );
  }

  return (
    <Section ref={sectionRef} id="photos">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Share your moments</Eyebrow>
          <Title>Upload your pics 📸</Title>
        </Header>
        
        <UploadCard visible={visible}>
          <DropZone 
            isDragging={isDragging}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <DropIcon>📷</DropIcon>
            <DropText>Drop photos here or click to browse</DropText>
            <DropSubtext>Up to {maxFiles} images (JPG, PNG, HEIC)</DropSubtext>
          </DropZone>
          
          <HiddenInput 
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={(e) => addFiles(Array.from(e.target.files))}
          />
          
          {files.length > 0 && (
            <>
              <PreviewGrid>
                {files.map((item, i) => (
                  <PreviewItem key={i}>
                    <img src={item.preview} alt="" />
                    <RemoveBtn onClick={() => removeFile(i)}>✕</RemoveBtn>
                  </PreviewItem>
                ))}
              </PreviewGrid>
              
              <SubmitSection>
                <GuestInput 
                  type="text"
                  placeholder="Your name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
                <SubmitBtn onClick={handleSubmit} disabled={!guestName.trim()}>
                  Upload {files.length} photo{files.length !== 1 ? 's' : ''} 🚀
                </SubmitBtn>
              </SubmitSection>
            </>
          )}
        </UploadCard>
        
        <Stats visible={visible}>
          <StatItem>
            <div className="number">{totalPhotos}</div>
            <div className="label">Photos</div>
          </StatItem>
          <StatItem>
            <div className="number">{totalGuests}</div>
            <div className="label">Contributors</div>
          </StatItem>
        </Stats>
      </Container>
    </Section>
  );
}

export default PhotoUpload;
