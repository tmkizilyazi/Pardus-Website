import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaSearch, FaUser, FaCog } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <NavContainer>
        <LogoContainer to="/">
          <PawIcon>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12,8.5C13.9,8.5 15.5,10.1 15.5,12C15.5,13.9 13.9,15.5 12,15.5C10.1,15.5 8.5,13.9 8.5,12C8.5,10.1 10.1,8.5 12,8.5M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2M12,4C9.8,4 7.9,4.8 6.4,6.4C4.8,7.9 4,9.8 4,12C4,14.2 4.8,16.1 6.4,17.6C7.9,19.2 9.8,20 12,20C14.2,20 16.1,19.2 17.6,17.6C19.2,16.1 20,14.2 20,12C20,9.8 19.2,7.9 17.6,6.4C16.1,4.8 14.2,4 12,4Z" />
            </svg>
          </PawIcon>
          <LogoText>
            PARDUS <LogoAccent>SPORTSWEAR</LogoAccent>
          </LogoText>
        </LogoContainer>

        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavLinks isOpen={isOpen}>
          <NavLink to="/">Ana Sayfa</NavLink>
          <NavLink to="/erkek">Erkek</NavLink>
          <NavLink to="/kadin">Kadın</NavLink>
          <NavLink to="/cocuk">Çocuk</NavLink>
          <NavLink to="/kramponlar">Kramponlar</NavLink>
          <NavLink to="/sneakers">Sneakers</NavLink>
          <NavLink to="/indirim">İndirimler</NavLink>
        </NavLinks>

        <RightSection>
          <SearchButton>
            <FaSearch />
          </SearchButton>
          <CartButton to="/sepet">
            <FaShoppingCart />
            <CartCount>3</CartCount>
          </CartButton>
          <AccountButton to="/hesabim">
            <FaUser />
          </AccountButton>
          <AdminButton to="/admin-panel">
            <FaCog />
          </AdminButton>
        </RightSection>
      </NavContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: ${props => props.scrolled ? props.theme.colors.secondary : 'transparent'};
  color: ${props => props.theme.colors.light};
  padding: ${props => props.scrolled ? '10px 0' : '20px 0'};
  position: fixed;
  width: 100%;
  z-index: 1000;
  transition: ${props => props.theme.transitions.default};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.medium : 'none'};
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: ${props => props.theme.sizes.container};
  margin: 0 auto;
  position: relative;
`;

const LogoContainer = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.colors.light};
  z-index: 1001;
`;

const LogoText = styled.h1`
  font-weight: 800;
  font-size: 28px;
  color: ${props => props.theme.colors.light};
  margin: 0;
  letter-spacing: 1px;
`;

const LogoAccent = styled.span`
  color: ${props => props.theme.colors.primary};
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100vh;
    background: ${props => props.theme.colors.secondary};
    padding: 80px 40px 30px;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    z-index: 1000;
    gap: 20px;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.light};
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  position: relative;
  padding: 5px 0;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.light};
  font-size: 18px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SearchButton = styled(IconButton)``;

const CartButton = styled(Link)`
  position: relative;
  color: ${props => props.theme.colors.light};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${props => props.theme.colors.primary};
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccountButton = styled(Link)`
  color: ${props => props.theme.colors.light};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const PawIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  margin-right: 10px;
  transform: rotate(-20deg);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: rotate(-20deg) scale(1);
    }
    50% {
      transform: rotate(-20deg) scale(1.1);
    }
    100% {
      transform: rotate(-20deg) scale(1);
    }
  }
`;

const AdminButton = styled(Link)`
  color: ${props => props.theme.colors.light};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export default Header; 