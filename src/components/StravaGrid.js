import React, { useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 50px;
`;

const FeaturedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1400px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
`;

const FeaturedSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-width: 600px;
  width: 100%;
  flex: 1;
  min-height: 600px;
  
  @media (min-width: 768px) {
    height: 100%;
  }
`;

const FeaturedTitle = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FeaturedSubtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 0;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StravaContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const StravaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

const StravaEmbed = styled.iframe`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
`;

function StravaGrid() {
  useEffect(() => {
    // Load Strava embed script
    const script = document.createElement('script');
    script.src = 'https://strava-embeds.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://strava-embeds.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <PageContainer>
      <FeaturedContainer>
        <FeaturedSection>
          <FeaturedTitle>Patagonia Hike</FeaturedTitle>
          <FeaturedSubtitle>
            Fitz Roy Circuit - The iconic mountain range that inspired the Patagonia logo
          </FeaturedSubtitle>
          <div 
            className="strava-embed-placeholder" 
            data-embed-type="activity" 
            data-embed-id="13908228794" 
            data-style="standard" 
            data-from-embed="false"
          />
        </FeaturedSection>

        <FeaturedSection>
          <FeaturedTitle>Amazon Rainforest</FeaturedTitle>
          <FeaturedSubtitle>
            3 days backpacking through the Amazon rainforest - nearest hospital a day's travel away
          </FeaturedSubtitle>
          <div 
            className="strava-embed-placeholder" 
            data-embed-type="activity" 
            data-embed-id="14120651332" 
            data-style="standard" 
            data-from-embed="false"
          />
        </FeaturedSection>

        <FeaturedSection>
          <FeaturedTitle>Bolivian Andes Summit</FeaturedTitle>
          <FeaturedSubtitle>
            17,454 foot summit - higher than any point in the USA. Walking felt like sprinting.
          </FeaturedSubtitle>
          <div 
            className="strava-embed-placeholder" 
            data-embed-type="activity" 
            data-embed-id="14217508170" 
            data-style="standard" 
            data-from-embed="false"
          />
        </FeaturedSection>
      </FeaturedContainer>

      <StravaContainer>
        <StravaSection>
          <SectionTitle>Latest Runs</SectionTitle>
          <StravaEmbed 
            height="454" 
            width="300" 
            allowTransparency="true" 
            scrolling="no" 
            src="https://www.strava.com/athletes/55242448/latest-rides/f4732c4356df96ab5d4fe51a5c17c07a3d4acf09"
            title="Latest Strava Runs"
          />
        </StravaSection>
      </StravaContainer>
    </PageContainer>
  );
}

export default StravaGrid;