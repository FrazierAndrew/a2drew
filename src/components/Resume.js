import React, { useState } from 'react';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 10px;
  background-color: #f5f5f5;
  
  @media (min-width: 768px) {
    min-height: calc(100vh - 100px);
    padding: 20px;
  }
`;

const PDFViewer = styled.iframe`
  width: 90%;
  height: 85vh;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  
  h3 {
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    margin: 5px 0;
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
        <PDFViewer 
          src="/Andrew_Resume.pdf"
          title="Andrew's Resume"
          onError={() => setPdfError(true)}
        />
      )}
    </ResumeContainer>
  );
}

export default Resume;
