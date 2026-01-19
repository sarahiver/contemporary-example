import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
`;

const IncludedBadge = styled.div`
  position: fixed;
  top: 6rem;
  right: 2rem;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  &::before { content: '✓'; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #fff;
`;

const LogoutButton = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${p => p.$colors?.[0] || '#8B5CF6'}, ${p => p.$colors?.[1] || '#EC4899'});
  padding: 2rem;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const StatNumber = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.8);
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${p => p.$active ? '#fff' : 'rgba(255,255,255,0.5)'};
  background: ${p => p.$active ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : 'rgba(255,255,255,0.05)'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    background: ${p => p.$active ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : 'rgba(255,255,255,0.1)'};
  }
`;

const Table = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255,255,255,0.05);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.03);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const Td = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span`
  font-family: 'Sora', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  background: ${p => p.$status === 'confirmed' ? 'rgba(16, 185, 129, 0.2)' : p.$status === 'declined' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(251, 191, 36, 0.2)'};
  color: ${p => p.$status === 'confirmed' ? '#10b981' : p.$status === 'declined' ? '#ef4444' : '#fbbf24'};
`;

const ActionButton = styled.button`
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255,255,255,0.5);
  font-family: 'Sora', sans-serif;
`;

function AdminDashboard({ coupleNames = 'Sophie & Max', rsvpData = [], photos = [], onLogout, onDownloadRSVP, showBadge = false }) {
  const [activeTab, setActiveTab] = useState('rsvp');

  const defaultRsvpData = [
    { id: 1, name: 'Anna Schmidt', email: 'anna@email.de', guests: 2, menu: 'Fleisch', status: 'confirmed' },
    { id: 2, name: 'Thomas Müller', email: 'thomas@email.de', guests: 1, menu: 'Vegetarisch', status: 'confirmed' },
    { id: 3, name: 'Lisa Weber', email: 'lisa@email.de', guests: 2, menu: 'Fisch', status: 'pending' },
    { id: 4, name: 'Michael Koch', email: 'michael@email.de', guests: 1, menu: '-', status: 'declined' },
  ];

  const data = rsvpData.length > 0 ? rsvpData : defaultRsvpData;
  
  const stats = {
    confirmed: data.filter(r => r.status === 'confirmed').length,
    totalGuests: data.filter(r => r.status === 'confirmed').reduce((sum, r) => sum + r.guests, 0),
    pending: data.filter(r => r.status === 'pending').length,
    photos: photos.length,
  };

  return (
    <Section>
      {showBadge && <IncludedBadge>Inklusive</IncludedBadge>}
      
      <Container>
        <Header>
          <Title>Dashboard ✨</Title>
          <LogoutButton onClick={onLogout}>Abmelden</LogoutButton>
        </Header>
        
        <StatsGrid>
          <StatCard $colors={['#8B5CF6', '#7c3aed']}><StatNumber>{stats.confirmed}</StatNumber><StatLabel>Zusagen</StatLabel></StatCard>
          <StatCard $colors={['#EC4899', '#db2777']}><StatNumber>{stats.totalGuests}</StatNumber><StatLabel>Gäste gesamt</StatLabel></StatCard>
          <StatCard $colors={['#F97316', '#ea580c']}><StatNumber>{stats.pending}</StatNumber><StatLabel>Ausstehend</StatLabel></StatCard>
          <StatCard $colors={['#10b981', '#059669']}><StatNumber>{stats.photos}</StatNumber><StatLabel>Fotos</StatLabel></StatCard>
        </StatsGrid>
        
        <Tabs>
          <Tab $active={activeTab === 'rsvp'} onClick={() => setActiveTab('rsvp')}>RSVP</Tab>
          <Tab $active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>Fotos</Tab>
        </Tabs>
        
        {activeTab === 'rsvp' && (
          <>
            <ActionButton onClick={onDownloadRSVP}>📥 Als CSV exportieren</ActionButton>
            
            {data.length > 0 ? (
              <Table>
                <TableHeader>
                  <Th>Name</Th><Th>E-Mail</Th><Th>Gäste</Th><Th>Menü</Th><Th>Status</Th>
                </TableHeader>
                {data.map(row => (
                  <TableRow key={row.id}>
                    <Td>{row.name}</Td>
                    <Td>{row.email}</Td>
                    <Td>{row.guests}</Td>
                    <Td>{row.menu}</Td>
                    <Td>
                      <StatusBadge $status={row.status}>
                        {row.status === 'confirmed' ? '✓ Zugesagt' : row.status === 'declined' ? '✗ Abgesagt' : '⏳ Ausstehend'}
                      </StatusBadge>
                    </Td>
                  </TableRow>
                ))}
              </Table>
            ) : (
              <EmptyState>Noch keine Anmeldungen vorhanden.</EmptyState>
            )}
          </>
        )}
        
        {activeTab === 'photos' && (
          <EmptyState>📷 Noch keine Fotos hochgeladen.</EmptyState>
        )}
      </Container>
    </Section>
  );
}

export default AdminDashboard;
