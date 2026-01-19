import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50% { box-shadow: 0 0 0 20px rgba(139, 92, 246, 0); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  position: relative;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
`;

const Subtitle = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: rgba(26, 26, 46, 0.7);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.1s;
`;

const DropZone = styled.div`
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border: 3px dashed ${p => p.$dragOver ? '#8B5CF6' : 'rgba(0,0,0,0.1)'};
  border-radius: 24px;
  padding: 4rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition-delay: 0.2s;
  
  &:hover {
    border-color: #8B5CF6;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  }
`;

const DropIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${bounce} 2s ease-in-out infinite;
`;

const DropText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const DropSubtext = styled.p`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  background: rgba(0,0,0,0.7);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover { background: #ef4444; }
`;

const SubmitButton = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  padding: 1.25rem 3rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    animation: none;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
  margin: 1.5rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  border-radius: 3px;
  width: ${p => p.$progress}%;
  transition: width 0.3s ease;
`;

const Success = styled.div`
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
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
  margin-bottom: 1.5rem;
`;

const ResetButton = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #8B5CF6;
  background: none;
  border: 2px solid #8B5CF6;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #8B5CF6;
    color: #fff;
  }
`;

function PhotoUpload({ title = 'Upload your pics', subtitle = 'Teilt eure schönsten Schnappschüsse mit uns!', maxFiles = 20, onUpload }) {
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const sectionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')));
  };

  const handleFileSelect = (e) => addFiles(Array.from(e.target.files));

  const addFiles = (newFiles) => {
    const remaining = maxFiles - files.length;
    const toAdd = newFiles.slice(0, remaining);
    setFiles(prev => [...prev, ...toAdd]);
    
    toAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => setPreviews(prev => [...prev, { file, preview: e.target.result }]);
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 150));
      setProgress(i);
    }
    if (onUpload) await onUpload(files);
    setUploading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFiles([]);
    setPreviews([]);
    setProgress(0);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Section ref={sectionRef} id="photos">
        <Container>
          <Success>
            <SuccessIcon>🎉</SuccessIcon>
            <SuccessTitle>Awesome!</SuccessTitle>
            <SuccessText>{files.length} {files.length === 1 ? 'Foto wurde' : 'Fotos wurden'} hochgeladen.</SuccessText>
            <ResetButton onClick={handleReset}>Weitere hochladen</ResetButton>
          </Success>
        </Container>
      </Section>
    );
  }

  return (
    <Section ref={sectionRef} id="photos">
      <Container>
        <Header>
          <Title $visible={visible}>{title} 📸</Title>
          <Subtitle $visible={visible}>{subtitle}</Subtitle>
        </Header>
        
        <DropZone
          $visible={visible}
          $dragOver={dragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <DropIcon>📷</DropIcon>
          <DropText>Fotos hier ablegen</DropText>
          <DropSubtext>oder klicken zum Auswählen · Max. {maxFiles} Fotos</DropSubtext>
          <HiddenInput ref={inputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} />
        </DropZone>
        
        {previews.length > 0 && (
          <>
            <PreviewGrid>
              {previews.map((item, i) => (
                <PreviewItem key={i}>
                  <PreviewImage src={item.preview} alt={`Preview ${i + 1}`} />
                  {!uploading && <RemoveButton onClick={() => removeFile(i)}>×</RemoveButton>}
                </PreviewItem>
              ))}
            </PreviewGrid>
            
            {uploading && (
              <ProgressBar>
                <ProgressFill $progress={progress} />
              </ProgressBar>
            )}
            
            <SubmitButton onClick={handleSubmit} disabled={uploading}>
              {uploading ? `Uploading... ${progress}%` : `${files.length} Fotos hochladen ✨`}
            </SubmitButton>
          </>
        )}
      </Container>
    </Section>
  );
}

export default PhotoUpload;
