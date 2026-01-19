import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: var(--gray-50);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
  animation: ${fadeIn} 0.6s ease;
`;

const TitleGroup = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--gray-500);
  }
`;

const LogoutBtn = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray-600);
  background: var(--white);
  border: 2px solid var(--gray-200);
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--coral);
    color: var(--coral);
  }
`;

// Stats grid with colorful cards
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
  background: ${p => p.gradient || 'linear-gradient(135deg, var(--coral), var(--pink))'};
  border-radius: 20px;
  padding: 2rem;
  color: var(--white);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease;
  animation-delay: ${p => p.index * 0.1}s;
  animation-fill-mode: both;
  
  &::before {
    content: '${p => p.icon}';
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 3rem;
    opacity: 0.3;
  }
  
  .number {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 0.9;
  }
`;

// Content area with tabs
const ContentArea = styled.div`
  background: var(--white);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  animation: ${fadeIn} 0.6s ease;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--gray-100);
`;

const Tab = styled.button`
  flex: 1;
  padding: 1.25rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${p => p.active ? 'var(--coral)' : 'var(--gray-500)'};
  background: ${p => p.active ? 'var(--white)' : 'var(--gray-50)'};
  border: none;
  border-bottom: 3px solid ${p => p.active ? 'var(--coral)' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${p => p.active ? 'var(--coral)' : 'var(--gray-700)'};
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

// Table
const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1.25rem 1rem;
    text-align: left;
  }
  
  th {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray-500);
    background: var(--gray-50);
    border-bottom: 1px solid var(--gray-100);
  }
  
  td {
    font-size: 0.9rem;
    color: var(--gray-700);
    border-bottom: 1px solid var(--gray-100);
  }
  
  tbody tr {
    transition: background 0.2s ease;
    
    &:hover {
      background: var(--gray-50);
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  
  ${p => p.status === 'yes' && `
    background: rgba(16, 185, 129, 0.1);
    color: #059669;
  `}
  ${p => p.status === 'no' && `
    background: rgba(239, 68, 68, 0.1);
    color: #DC2626;
  `}
  ${p => p.status === 'pending' && `
    background: rgba(245, 158, 11, 0.1);
    color: #D97706;
  `}
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const GuestInfo = styled.div`
  .name {
    font-weight: 600;
    color: var(--black);
    margin-bottom: 0.2rem;
  }
  
  .email {
    font-size: 0.8rem;
    color: var(--gray-500);
  }
`;

// Photo grid
const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: var(--gray-100);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    
    .overlay { opacity: 1; }
  }
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gray-100), var(--gray-200));
  
  span {
    font-size: 2.5rem;
    opacity: 0.3;
  }
`;

const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  .guest {
    font-size: 0.8rem;
    color: var(--white);
    font-weight: 500;
  }
`;

// Action bar
const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: var(--gray-50);
  border-top: 1px solid var(--gray-100);
  flex-wrap: wrap;
  gap: 1rem;
`;

const ActionInfo = styled.div`
  font-size: 0.85rem;
  color: var(--gray-600);
  
  strong { color: var(--black); }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionBtn = styled.button`
  padding: 0.7rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 25px;
  transition: all 0.3s ease;
  
  ${p => p.primary ? `
    background: var(--coral);
    color: var(--white);
    border: none;
    
    &:hover {
      background: var(--coral-dark);
      transform: translateY(-2px);
    }
  ` : `
    background: var(--white);
    color: var(--gray-700);
    border: 2px solid var(--gray-200);
    
    &:hover {
      border-color: var(--coral);
      color: var(--coral);
    }
  `}
`;

function AdminDashboard({
  coupleNames = 'Sophie & Max',
  rsvpData = [
    { name: 'Lisa & Thomas Meier', email: 'lisa@email.de', status: 'yes', guests: 2, menu: 'Vegetarisch', date: '2024-03-15' },
    { name: 'Anna Weber', email: 'anna@email.de', status: 'yes', guests: 1, menu: 'Vegan', date: '2024-03-14' },
    { name: 'Familie Müller', email: 'mueller@email.de', status: 'no', guests: 0, menu: '-', date: '2024-03-13' },
    { name: 'Max Hoffmann', email: 'max@email.de', status: 'pending', guests: 0, menu: '-', date: '-' },
    { name: 'Julia & Ben Koch', email: 'julia@email.de', status: 'yes', guests: 2, menu: 'Fleisch', date: '2024-03-12' },
  ],
  photos = [
    { url: null, guestName: 'Lisa Meier' },
    { url: null, guestName: 'Anna Weber' },
    { url: null, guestName: 'Familie Müller' },
    { url: null, guestName: 'Julia Koch' },
    { url: null, guestName: 'Lisa Meier' },
    { url: null, guestName: 'Ben Koch' },
  ],
  onLogout = () => console.log('Logout'),
}) {
  const [activeTab, setActiveTab] = useState('rsvp');

  const confirmedGuests = rsvpData.filter(r => r.status === 'yes').reduce((sum, r) => sum + r.guests, 0);
  const pendingCount = rsvpData.filter(r => r.status === 'pending').length;
  const declinedCount = rsvpData.filter(r => r.status === 'no').length;

  const downloadCSV = () => {
    const headers = ['Name', 'E-Mail', 'Status', 'Gäste', 'Menü', 'Datum'];
    const rows = rsvpData.map(r => [r.name, r.email, r.status, r.guests, r.menu, r.date]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-responses.csv';
    a.click();
  };

  const statCards = [
    { icon: '🎉', number: rsvpData.filter(r => r.status === 'yes').length, label: 'Confirmed RSVPs', gradient: 'linear-gradient(135deg, var(--coral), var(--pink))' },
    { icon: '👥', number: confirmedGuests, label: 'Total Guests', gradient: 'linear-gradient(135deg, var(--electric), var(--purple))' },
    { icon: '⏳', number: pendingCount, label: 'Pending', gradient: 'linear-gradient(135deg, var(--yellow), #F59E0B)' },
    { icon: '📸', number: photos.length, label: 'Photos Uploaded', gradient: 'linear-gradient(135deg, var(--purple), var(--pink))' },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <TitleGroup>
            <h1>Dashboard</h1>
            <p>Manage your wedding responses and photos</p>
          </TitleGroup>
          <LogoutBtn onClick={onLogout}>Sign Out</LogoutBtn>
        </Header>
        
        <StatsGrid>
          {statCards.map((stat, i) => (
            <StatCard key={i} index={i} gradient={stat.gradient} icon={stat.icon}>
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </StatCard>
          ))}
        </StatsGrid>
        
        <ContentArea>
          <Tabs>
            <Tab active={activeTab === 'rsvp'} onClick={() => setActiveTab('rsvp')}>
              📋 RSVP Responses
            </Tab>
            <Tab active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>
              📸 Photo Gallery
            </Tab>
          </Tabs>
          
          <TabContent>
            {activeTab === 'rsvp' && (
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Status</th>
                      <th>Party Size</th>
                      <th>Menu</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvpData.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <GuestInfo>
                            <div className="name">{r.name}</div>
                            <div className="email">{r.email}</div>
                          </GuestInfo>
                        </td>
                        <td>
                          <StatusBadge status={r.status}>
                            {r.status === 'yes' ? 'Confirmed' : r.status === 'no' ? 'Declined' : 'Pending'}
                          </StatusBadge>
                        </td>
                        <td>{r.guests > 0 ? `${r.guests} guests` : '-'}</td>
                        <td>{r.menu}</td>
                        <td>{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
            )}
            
            {activeTab === 'photos' && (
              <PhotoGrid>
                {photos.map((photo, i) => (
                  <PhotoCard key={i}>
                    {photo.url ? (
                      <img src={photo.url} alt="" />
                    ) : (
                      <PhotoPlaceholder><span>📷</span></PhotoPlaceholder>
                    )}
                    <PhotoOverlay className="overlay">
                      <span className="guest">by {photo.guestName}</span>
                    </PhotoOverlay>
                  </PhotoCard>
                ))}
              </PhotoGrid>
            )}
          </TabContent>
          
          <ActionBar>
            <ActionInfo>
              {activeTab === 'rsvp' ? (
                <>Showing <strong>{rsvpData.length}</strong> responses</>
              ) : (
                <>Showing <strong>{photos.length}</strong> photos</>
              )}
            </ActionInfo>
            <ActionButtons>
              {activeTab === 'rsvp' ? (
                <>
                  <ActionBtn onClick={downloadCSV}>Export CSV</ActionBtn>
                  <ActionBtn primary>Send Reminder</ActionBtn>
                </>
              ) : (
                <ActionBtn primary>Download All</ActionBtn>
              )}
            </ActionButtons>
          </ActionBar>
        </ContentArea>
      </Container>
    </Section>
  );
}

export default AdminDashboard;
