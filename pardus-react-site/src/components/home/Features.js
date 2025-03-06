import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBolt, FaShieldAlt, FaRunning, FaLeaf } from 'react-icons/fa';

// Resim importları yerine doğrudan URL'ler kullanılıyor
const speedImage = "https://i.imgur.com/lkKUDPg.jpg";
const protectionImage = "https://i.imgur.com/QfZlbTW.jpg";
const controlImage = "https://i.imgur.com/9GvLJCU.jpg";
const comfortImage = "https://i.imgur.com/X9aDkXY.jpg";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaBolt />,
      title: "Süper Hız",
      description: "Özel karbon fiber taban ve hafif malzemeler sayesinde sahada rakiplerinizden bir adım önde olun.",
      image: speedImage,
      color: "#FF6B00"
    },
    {
      id: 2,
      icon: <FaShieldAlt />,
      title: "Maksimum Koruma",
      description: "Güçlendirilmiş yapı ve ayak bileği desteği ile sakatlanma riskini minimize edin.",
      image: protectionImage,
      color: "#FFD700"
    },
    {
      id: 3,
      icon: <FaRunning />,
      title: "Kusursuz Kontrol",
      description: "Topa maksimum hakimiyet için tasarlanmış özel doku ve grip teknolojisi.",
      image: controlImage,
      color: "#28A745"
    },
    {
      id: 4,
      icon: <FaLeaf />,
      title: "Ultra Konfor",
      description: "Nefes alabilen malzemeler ve anatomik iç taban ile uzun maçlarda bile konfor.",
      image: comfortImage,
      color: "#0057FF"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  return (
    <FeaturesSection>
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            PARDUS KADAR GÜÇLÜ KRAMPONLAR
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Krampo futbol ayakkabıları, sahadaki üstünlüğünüzü garanti eden teknolojik özelliklere sahiptir
          </motion.p>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FeaturesGrid>
            {features.map((feature) => (
              <motion.div key={feature.id} variants={itemVariants}>
                <FeatureCard>
                  <FeatureImage>
                    <img src={feature.image} alt={feature.title} />
                    <IconBox color={feature.color}>
                      {feature.icon}
                    </IconBox>
                  </FeatureImage>
                  <FeatureContent>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </FeatureContent>
                </FeatureCard>
              </motion.div>
            ))}
          </FeaturesGrid>
        </motion.div>
      </Container>
    </FeaturesSection>
  );
};

const FeaturesSection = styled.section`
  background-color: ${props => props.theme.colors.background};
  padding: 100px 0;
`;

const Container = styled.div`
  width: 90%;
  max-width: ${props => props.theme.sizes.container};
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 36px;
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 16px;
    font-weight: 800;
  }
  
  p {
    font-size: 18px;
    color: ${props => props.theme.colors.darkGrey};
    max-width: 800px;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.default};
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const FeatureImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  ${FeatureCard}:hover & img {
    transform: scale(1.1);
  }
`;

const IconBox = styled.div`
  position: absolute;
  bottom: -20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: ${props => props.color || props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  box-shadow: ${props => props.theme.shadows.small};
`;

const FeatureContent = styled.div`
  padding: 30px 24px 24px;
  
  h3 {
    margin-bottom: 12px;
    font-size: 20px;
    color: ${props => props.theme.colors.secondary};
    font-weight: 700;
  }
  
  p {
    color: ${props => props.theme.colors.darkGrey};
    line-height: 1.6;
    margin-bottom: 0;
  }
`;

export default Features; 