import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #ffd1dc;
  background-image: linear-gradient(45deg, #ffd1dc 0%, #ff9ecd 100%);
  font-family: Arial, sans-serif;
`;

const Message = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #ff69b4;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

function App() {
  return (
    <PageContainer>
      <Message>
        <Title>Welcome to da webbbb🎉</Title>
      </Message>
    </PageContainer>
  );
}

export default App;
