import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight, FaTrophy, FaRunning } from 'react-icons/fa';

const Hero = () => {
  return (
    <HeroSection>
      <Overlay />
      <Container>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroTag>YENİ KOLEKSİYON</HeroTag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SAHALARDA <PawPrintAccent>PARDUS</PawPrintAccent> <br />İZİNİ BIRAK
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pardus Sportswear'in yeni sezon krampon ve spor ayakkabıları ile sahada bir adım önde ol.
            Gelişmiş tutuş, üstün konfor ve pençe gibi güçlü.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ButtonGroup>
              <PrimaryButton to="/collection">
                <span>Koleksiyonu Keşfet</span>
                <FaArrowRight />
              </PrimaryButton>
              <SecondaryButton to="/teknoloji">
                <FaTrophy /> <span>Mücadele Ruhu</span>
              </SecondaryButton>
            </ButtonGroup>
          </motion.div>
        </HeroContent>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-image-container"
        >
          <HeroImage>
            <img src="https://i.imgur.com/8QcTe0i.png" alt="Pardus Pro krampon" />
            <PawPrints>
              <PawPrint delay={0.2} left="10%" top="20%" />
              <PawPrint delay={0.4} left="30%" top="50%" />
              <PawPrint delay={0.6} left="50%" top="70%" />
              <PawPrint delay={0.8} left="70%" top="40%" />
            </PawPrints>
          </HeroImage>
        </motion.div>

        <FeatureBadge>
          <FaRunning />
          <span>Mücadele Et, Kazanmak İçin</span>
        </FeatureBadge>
      </Container>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: url("https://i.imgur.com/rYYAUnD.jpg");
  background-size: cover;
  background-position: center;
  color: ${props => props.theme.colors.light};
  padding-top: 80px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(26, 26, 26, 0.95),
    rgba(26, 26, 26, 0.8),
    rgba(26, 26, 26, 0.4)
  );
  z-index: 1;
`;

const Container = styled.div`
  width: 90%;
  max-width: ${props => props.theme.sizes.container};
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    margin-bottom: 50px;
  }
`;

const HeroTag = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  display: inline-block;
  margin-bottom: 20px;
`;

const AccentSpan = styled.span`
  color: ${props => props.theme.colors.primary};
  position: relative;
  font-style: italic;
  font-weight: 800;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: ${props => props.theme.colors.accent};
    bottom: -5px;
    left: 0;
    z-index: -1;
    opacity: 0.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const PrimaryButton = styled(motion.a)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  padding: 15px 32px;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: ${props => props.theme.transitions.default};
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.button};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
  }
`;

const SecondaryButton = styled(motion.a)`
  background-color: transparent;
  color: ${props => props.theme.colors.light};
  border: 2px solid ${props => props.theme.colors.light};
  padding: 15px 32px;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.secondary};
  }
`;

const HeroImage = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
    transform: rotate(-15deg);
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4));
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% {
      transform: rotate(-15deg) translateY(0px);
    }
    50% {
      transform: rotate(-15deg) translateY(-20px);
    }
    100% {
      transform: rotate(-15deg) translateY(0px);
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    height: auto;
    
    img {
      max-width: 80%;
    }
  }
`;

const PawPrintAccent = styled(AccentSpan)`
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FF6B00' d='M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.5,20.75C16.57,21.06 15.43,21.06 14.5,20.75C13.09,20.24 12.38,18.61 12.33,17.67C12.28,16.73 13,15.69 14.15,15.29C15.3,14.9 16.61,15.28 17.5,15.91C18.39,16.55 19.3,17.43 19.33,18.38M14.35,14.83C14.12,13.76 13.37,12.8 12.33,12.28C11.3,11.76 10.05,11.86 9.35,12.33C8.66,12.8 8.41,13.68 8.57,14.83C8.72,15.83 9.47,16.77 10.5,17.28C11.77,17.9 13.25,17.7 14,16.92C14.59,16.31 14.58,15.89 14.35,14.83Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
  }
  
  &::before {
    left: -30px;
    top: -5px;
  }
  
  &::after {
    right: -30px;
    top: -5px;
  }
`;

const PawPrints = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
`;

const PawPrint = styled(motion.div).attrs(props => ({
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, delay: props.delay }
}))`
  position: absolute;
  width: 30px;
  height: 30px;
  left: ${props => props.left};
  top: ${props => props.top};
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FF6B00' d='M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.5,20.75C16.57,21.06 15.43,21.06 14.5,20.75C13.09,20.24 12.38,18.61 12.33,17.67C12.28,16.73 13,15.69 14.15,15.29C15.3,14.9 16.61,15.28 17.5,15.91C18.39,16.55 19.3,17.43 19.33,18.38M14.35,14.83C14.12,13.76 13.37,12.8 12.33,12.28C11.3,11.76 10.05,11.86 9.35,12.33C8.66,12.8 8.41,13.68 8.57,14.83C8.72,15.83 9.47,16.77 10.5,17.28C11.77,17.9 13.25,17.7 14,16.92C14.59,16.31 14.58,15.89 14.35,14.83Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  opacity: 0.7;
`;

const FeatureBadge = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: ${props => props.theme.shadows.medium};
  z-index: 5;
  border-left: 4px solid ${props => props.theme.colors.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    bottom: 20px;
    right: 20px;
    padding: 8px 16px;
    font-size: 12px;
  }
`;

export default Hero; 