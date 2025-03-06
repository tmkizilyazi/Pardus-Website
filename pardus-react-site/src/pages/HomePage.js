import React from 'react';
import styled from 'styled-components';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProductSlider from '../components/home/ProductSlider';
import { motion } from 'framer-motion';
import { FaShippingFast, FaAward, FaUndo, FaHeadset, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <ProductSlider />
      <BenefitsSection />
      <TestimonialSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
};

// Avantajlar Bölümü
const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: <FaShippingFast />,
      title: "Ücretsiz Kargo",
      description: "500₺ üzeri tüm siparişlerde ücretsiz kargo",
    },
    {
      id: 2,
      icon: <FaAward />,
      title: "Kalite Garantisi",
      description: "Tüm ürünlerimiz 2 yıl garantilidir",
    },
    {
      id: 3,
      icon: <FaUndo />,
      title: "30 Gün İade",
      description: "30 gün içinde ücretsiz iade imkanı",
    },
    {
      id: 4,
      icon: <FaHeadset />,
      title: "7/24 Destek",
      description: "Uzman ekibimizle 7/24 destek",
    },
  ];

  return (
    <BenefitsSectionWrapper>
      <Container>
        <BenefitsGrid>
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.id}>
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </BenefitsSectionWrapper>
  );
};

// Referanslar Bölümü
const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mehmet Yılmaz",
      position: "Profesyonel Futbolcu",
      quote: "Krampo kramponları kariyerimde kullandığım en rahat ve performanslı ayakkabılar. Krampo X9 Pro ile sahadaki konforum ve hakimiyetim arttı.",
      image: "https://i.imgur.com/DEw3Rvr.jpg",
    },
    {
      id: 2,
      name: "Ayşe Demir",
      position: "Milli Takım Oyuncusu",
      quote: "Bir pardus kadar hızlı ve çevik! Krampo PrecisionX kramponları ile top kontrolüm ve şut isabetim inanılmaz arttı.",
      image: "https://i.imgur.com/ypzXDZu.jpg",
    },
  ];

  return (
    <TestimonialSectionWrapper>
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            OYUNCULARIMIZ NE DİYOR?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Profesyonel futbolcuların Krampo deneyimleri
          </motion.p>
        </SectionHeader>

        <TestimonialsGrid>
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TestimonialCard>
                <QuoteSymbol>"</QuoteSymbol>
                <TestimonialQuote>{testimonial.quote}</TestimonialQuote>
                <TestimonialAuthor>
                  <TestimonialImage>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </TestimonialImage>
                  <TestimonialInfo>
                    <TestimonialName>{testimonial.name}</TestimonialName>
                    <TestimonialPosition>{testimonial.position}</TestimonialPosition>
                  </TestimonialInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialSectionWrapper>
  );
};

// Instagram Bölümü
const InstagramSection = () => {
  const instagramPosts = [
    { id: 1, image: "https://i.imgur.com/vf7rfzg.jpg" },
    { id: 2, image: "https://i.imgur.com/kP2VWkL.jpg" },
    { id: 3, image: "https://i.imgur.com/0uQOBdi.jpg" },
    { id: 4, image: "https://i.imgur.com/n22aCaK.jpg" },
    { id: 5, image: "https://i.imgur.com/ow1LFPF.jpg" },
    { id: 6, image: "https://i.imgur.com/yWnFWfk.jpg" },
  ];

  return (
    <InstagramSectionWrapper>
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            INSTAGRAM'DA KRAMPO
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InstagramHandle>@krampo_turkiye</InstagramHandle> ile bizi takip edin
          </motion.p>
        </SectionHeader>

        <InstagramGrid>
          {instagramPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <InstagramPost>
                <img src={post.image} alt={`Instagram post ${post.id}`} />
                <InstagramOverlay>
                  <InstagramIcon>
                    <FaInstagram />
                  </InstagramIcon>
                </InstagramOverlay>
              </InstagramPost>
            </motion.div>
          ))}
        </InstagramGrid>

        <InstagramFollowButton href="https://instagram.com" target="_blank">
          Takip Et
        </InstagramFollowButton>
      </Container>
    </InstagramSectionWrapper>
  );
};

// Bülten Bölümü
const NewsletterSection = () => {
  return (
    <NewsletterSectionWrapper>
      <Container>
        <NewsletterContent>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            KRAMPO BÜLTEN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En yeni ürünler, özel teklifler ve indirimlerden ilk siz haberdar olun
          </motion.p>

          <NewsletterForm
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NewsletterInput type="email" placeholder="E-posta adresiniz" required />
            <NewsletterButton type="submit">Abone Ol</NewsletterButton>
          </NewsletterForm>

          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank">
              <FaFacebookF />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank">
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </NewsletterContent>
      </Container>
    </NewsletterSectionWrapper>
  );
};

// Genel Styled Components

const Container = styled.div`
  width: 90%;
  max-width: ${props => props.theme.sizes.container};
  margin: 0 auto;
  position: relative;
  z-index: 1;
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

// Avantajlar Bölümü Styled Components

const BenefitsSectionWrapper = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme.colors.light};
  border-top: 1px solid ${props => props.theme.colors.grey};
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: 20px;
`;

const BenefitIcon = styled.div`
  font-size: 36px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
`;

const BenefitTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.secondary};
`;

const BenefitDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.darkGrey};
`;

// Referanslar Bölümü Styled Components

const TestimonialSectionWrapper = styled.section`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.background};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: 8px;
  padding: 40px 30px 30px;
  box-shadow: ${props => props.theme.shadows.medium};
  position: relative;
`;

const QuoteSymbol = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 80px;
  line-height: 1;
  font-family: Georgia, serif;
  color: ${props => props.theme.colors.primary};
  opacity: 0.1;
`;

const TestimonialQuote = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${props => props.theme.colors.text};
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const TestimonialImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  border: 3px solid ${props => props.theme.colors.primary};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TestimonialInfo = styled.div``;

const TestimonialName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.colors.secondary};
`;

const TestimonialPosition = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.primary};
`;

// Instagram Bölümü Styled Components

const InstagramSectionWrapper = styled.section`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.light};
`;

const InstagramHandle = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
`;

const InstagramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InstagramPost = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  &:hover div {
    opacity: 1;
  }
`;

const InstagramOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
`;

const InstagramIcon = styled.div`
  color: white;
  font-size: 24px;
`;

const InstagramFollowButton = styled.a`
  display: block;
  margin: 40px auto 0;
  padding: 12px 30px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  max-width: 150px;
  text-decoration: none;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

// Bülten Bölümü Styled Components

const NewsletterSectionWrapper = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.secondary} 0%, #000000 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b00' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const NewsletterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  color: ${props => props.theme.colors.light};
  position: relative;
  z-index: 1;
  
  h2 {
    color: ${props => props.theme.colors.light};
    margin-bottom: 16px;
  }
  
  p {
    color: ${props => props.theme.colors.light};
    opacity: 0.9;
    margin-bottom: 30px;
  }
`;

const NewsletterForm = styled(motion.form)`
  display: flex;
  margin-bottom: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-direction: column;
    gap: 10px;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    border-radius: 4px;
  }
`;

const NewsletterButton = styled.button`
  padding: 15px 30px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    border-radius: 4px;
    width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.light};
  font-size: 18px;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
  }
`;

export default HomePage; 