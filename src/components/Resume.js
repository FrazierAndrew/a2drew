import React, { useState } from 'react';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  
  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const PDFEmbed = styled.object`
  width: 100%;
  max-width: 800px;
  height: 90vh;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  
  @media (max-width: 767px) {
    height: 85vh;
    max-width: 100%;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 10px;
  
  @media (min-width: 768px) {
    padding: 40px;
    margin: 0;
  }
  
  h3 {
    color: #333;
    margin-bottom: 10px;
    font-size: 1.25rem;
    
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    color: #666;
    margin: 5px 0;
    font-size: 0.9rem;
    
    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
  
  a {
    color: #4a90e2;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Resume() {
  const [pdfError, setPdfError] = useState(false);
  
  return (
    <ResumeContainer>
      {pdfError ? (
        <ErrorMessage>
          <h3>Resume</h3>
          <p>PDF viewer not supported in this browser.</p>
          <p><a href="/Andrew_Resume.pdf" target="_blank" rel="noopener noreferrer">
            Click here to view resume in new tab
          </a></p>
        </ErrorMessage>
      ) : (
        <PDFEmbed 
          data="/Andrew_Resume.pdf"
          type="application/pdf"
          onError={() => setPdfError(true)}
        >
          <ErrorMessage>
            <h3>Resume</h3>
            <p>PDF viewer not supported in this browser.</p>
            <p><a href="/Andrew_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Click here to view resume in new tab
            </a></p>
          </ErrorMessage>
        </PDFEmbed>
      )}
    </ResumeContainer>
  );
}

export default Resume;
