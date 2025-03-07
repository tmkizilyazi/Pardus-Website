import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 3D Model Bileşeni
function SneakerModel() {
  const sneaker = useRef();

  // Animasyon için her karede çalışır
  useFrame((state) => {
    sneaker.current.rotation.y += 0.003;
    sneaker.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  // Basit bir 3D kutu ile demo amaçlı
  return (
    <mesh ref={sneaker} position={[0, 0, 0]} castShadow>
      <boxGeometry args={[1, 0.3, 2]} />
      <meshStandardMaterial color="#d4af37" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

const Hero3D = () => {
  return (
    <HeroContainer>
      <CanvasContainer>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Stars depth={50} count={1000} factor={4} />
          <SneakerModel />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="sunset" />
        </Canvas>
      </CanvasContainer>

      <ContentContainer>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Gelecek Ayaklarınızda
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Yenilikçi tasarımlarımız ve üstün kalitemizle spor giyimde Türkiye'nin öncü markası.
          En yeni koleksiyonumuzu keşfedin.
        </motion.p>

        <ButtonContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PrimaryButton to="/koleksiyon-kesfet">
              Koleksiyonu Keşfet
            </PrimaryButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SecondaryButton to="/urunler">
              Tüm Ürünler
            </SecondaryButton>
          </motion.div>
        </ButtonContainer>
      </ContentContainer>
    </HeroContainer>
  );
};

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 600px;
  display: flex;
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background-dark) 100%);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    height: auto;
    min-height: 750px;
  }
`;

const CanvasContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    flex: none;
    height: 50%;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  z-index: 10;
  
  h1 {
    color: #fff;
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 500px;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    flex: none;
    text-align: center;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border: none;
  
  &:hover {
    background-color: var(--color-accent);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #fff;
  border: 2px solid var(--color-primary);
  
  &:hover {
    background-color: rgba(212, 175, 55, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

export default Hero3D; 