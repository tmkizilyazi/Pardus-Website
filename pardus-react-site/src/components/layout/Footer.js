import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterWrapper>
            <div className="container">
                <FooterContainer>
                    <FooterColumn>
                        <h3>Pardus</h3>
                        <ul className="footer-links">
                            <li><FooterLink to="/hakkimizda">Hakkımızda</FooterLink></li>
                            <li><FooterLink to="/kariyer">Kariyer</FooterLink></li>
                            <li><FooterLink to="/blog">Blog</FooterLink></li>
                            <li><FooterLink to="/basin">Basın</FooterLink></li>
                        </ul>
                    </FooterColumn>

                    <FooterColumn>
                        <h3>Destek</h3>
                        <ul className="footer-links">
                            <li><FooterLink to="/sss">SSS</FooterLink></li>
                            <li><FooterLink to="/iletisim">İletişim</FooterLink></li>
                            <li><FooterLink to="/canli-destek">Canlı Destek</FooterLink></li>
                            <li><FooterLink to="/dokumantasyon">Dokümantasyon</FooterLink></li>
                        </ul>
                    </FooterColumn>

                    <FooterColumn>
                        <h3>Topluluk</h3>
                        <ul className="footer-links">
                            <li><FooterLink to="/forum">Forum</FooterLink></li>
                            <li><FooterLink to="/egitimler">Eğitimler</FooterLink></li>
                            <li><FooterLink to="/etkinlikler">Etkinlikler</FooterLink></li>
                            <li><FooterLink to="/katkida-bulunun">Katkıda Bulunun</FooterLink></li>
                        </ul>
                    </FooterColumn>

                    <FooterColumn>
                        <h3>Yasal</h3>
                        <ul className="footer-links">
                            <li><FooterLink to="/gizlilik-politikasi">Gizlilik Politikası</FooterLink></li>
                            <li><FooterLink to="/kullanim-sartlari">Kullanım Şartları</FooterLink></li>
                            <li><FooterLink to="/lisans">Lisans</FooterLink></li>
                            <li><FooterLink to="/kvkk">KVKK</FooterLink></li>
                        </ul>
                        <SocialIcons>
                            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF />
                            </SocialIcon>
                            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </SocialIcon>
                            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn />
                            </SocialIcon>
                            <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </SocialIcon>
                        </SocialIcons>
                    </FooterColumn>
                </FooterContainer>

                <FooterBottom>
                    <p>&copy; {new Date().getFullYear()} Pardus. Tüm hakları saklıdır. TÜBİTAK ULAKBİM tarafından geliştirilmektedir.</p>
                </FooterBottom>
            </div>
        </FooterWrapper>
    );
};

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 80px 0 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentLight}, ${props => props.theme.colors.accent});
  }
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  margin-bottom: 50px;
`;

const FooterColumn = styled.div`
  h3 {
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: 600;
    position: relative;
    padding-bottom: 12px;
    font-family: ${props => props.theme.fonts.secondary};
    
    &::after {
      content: '';
      position: absolute;
      width: 35px;
      height: 2px;
      background-color: ${props => props.theme.colors.accent};
      bottom: 0;
      left: 0;
    }
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  padding-left: 0;
  display: inline-block;
  margin-bottom: 12px;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    padding-left: 5px;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: ${props => props.theme.colors.accent};
    transition: all 0.3s;
  }
  
  &:hover::before {
    width: 100%;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

export default Footer; 