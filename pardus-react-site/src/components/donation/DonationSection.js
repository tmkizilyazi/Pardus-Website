import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DonationForm from './DonationForm';
import { FaHandHoldingHeart, FaUsers, FaFlag } from 'react-icons/fa';

const DonationSection = () => {
    const benefits = [
        {
            id: 1,
            icon: <FaHandHoldingHeart />,
            title: 'Geliştirme Desteği',
            description: 'Yeni özellikler ve sürekli iyileştirmeler için kaynak sağlar.',
        },
        {
            id: 2,
            icon: <FaUsers />,
            title: 'Topluluk Desteği',
            description: 'Etkinlikler, eğitimler ve destek hizmetlerini güçlendirir.',
        },
        {
            id: 3,
            icon: <FaFlag />,
            title: 'Yerli Yazılım Desteği',
            description: 'Milli teknoloji hamlesi içerisinde önemli bir adım atarsınız.',
        },
    ];

    return (
        <DonationSectionWrapper>
            <div className="container">
                <SectionTitle>Projeye Destek Olun</SectionTitle>

                <DonationContent>
                    <DonationText>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Pardus, açık kaynak felsefesi ile toplumun her kesimine ücretsiz olarak sunulmaktadır.
                            Projenin gelişimine katkıda bulunmak ve daha iyi bir deneyim sunabilmemiz için
                            bağışlarınız çok değerlidir.
                        </motion.p>

                        <DonationBenefits>
                            {benefits.map((benefit) => (
                                <motion.div
                                    key={benefit.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: benefit.id * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Benefit>
                                        <BenefitIcon>{benefit.icon}</BenefitIcon>
                                        <h4>{benefit.title}</h4>
                                        <p>{benefit.description}</p>
                                    </Benefit>
                                </motion.div>
                            ))}
                        </DonationBenefits>
                    </DonationText>

                    <DonationFormContainer>
                        <DonationForm />
                    </DonationFormContainer>
                </DonationContent>
            </div>
        </DonationSectionWrapper>
    );
};

const DonationSectionWrapper = styled.section`
  padding: 90px 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    z-index: 0;
    opacity: 0.6;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 38px;
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  position: relative;
  padding-bottom: 15px;
  font-family: ${props => props.theme.fonts.secondary};
  
  &::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const DonationContent = styled.div`
  display: flex;
  gap: 50px;
  align-items: flex-start;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const DonationText = styled.div`
  flex: 1;
  
  p {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 30px;
    color: ${props => props.theme.colors.text};
  }
`;

const DonationBenefits = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const Benefit = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: ${props => props.theme.borderRadius.small};
  box-shadow: ${props => props.theme.shadows.small};
  transition: ${props => props.theme.transitions.default};
  border-left: 3px solid ${props => props.theme.colors.accent};
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  h4 {
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 18px;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    font-size: 15px !important;
    line-height: 1.5 !important;
    margin-bottom: 0 !important;
    color: ${props => props.theme.colors.textLight} !important;
  }
`;

const BenefitIcon = styled.div`
  font-size: 24px;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 15px;
`;

const DonationFormContainer = styled.div`
  flex: 1;
  background: white;
  padding: 35px;
  border-radius: ${props => props.theme.borderRadius.small};
  box-shadow: ${props => props.theme.shadows.large};
  position: relative;
  border-top: 3px solid ${props => props.theme.colors.accent};
  
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentLight}, ${props => props.theme.colors.accent});
  }
`;

export default DonationSection; 