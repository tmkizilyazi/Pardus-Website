import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaSearch, FaUser, FaCog } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Sepetteki toplam ürün sayısını hesapla
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

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

  const handleCartClick = () => {
    navigate('/sepet');
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <NavContainer>
        <LogoContainer to="/">
          <PawIcon>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M3.34,8.58C4.46,8.23 6.03,9.24 6.74,10.87C7.43,12.5 7.19,14.11 6.07,14.45C4.96,14.79 3.39,13.78 2.67,12.15C1.96,10.52 2.23,8.91 3.34,8.58M20.77,8.58C21.88,8.91 22.15,10.52 21.44,12.15C20.73,13.78 19.16,14.79 18.04,14.45C16.93,14.11 16.69,12.5 17.37,10.87C18.08,9.24 19.65,8.23 20.77,8.58M18.77,3.77C19.88,4.1 20.14,5.71 19.43,7.34C18.72,8.97 17.15,9.98 16.04,9.64C14.93,9.3 14.69,7.69 15.37,6.06C16.08,4.43 17.65,3.42 18.77,3.77M5.35,3.77C6.46,3.42 8.04,4.43 8.74,6.06C9.43,7.69 9.19,9.3 8.07,9.64C6.96,9.98 5.39,8.97 4.68,7.34C3.97,5.71 4.23,4.1 5.35,3.77M12.05,17.5C15.15,17.5 17.82,15.96 18.04,14.02C18.49,9.67 14.87,5.2 12.05,5.2C9.22,5.2 5.6,9.67 6.06,14.02C6.28,15.96 8.94,17.5 12.05,17.5Z"></path>
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
          <NavLink to="/kramponlar" className="category-link">Kramponlar</NavLink>
          <NavLink to="/sneakers" className="category-link">Sneakers</NavLink>
          <NavLink to="/indirim">İndirimler</NavLink>
        </NavLinks>

        <RightSection>
          <SearchButton>
            <FaSearch />
          </SearchButton>
          <CartButton onClick={handleCartClick}>
            <FaShoppingCart />
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartButton>
          <AccountButton to="/hesabim">
            <FaUser />
          </AccountButton>
          <AdminButton to="/admin">
            <FaCog />
          </AdminButton>
        </RightSection>
      </NavContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: ${props => props.scrolled ? props.theme.colors.backgroundDark : 'rgba(18, 18, 18, 0.8)'};
  color: ${props => props.theme.colors.textLight};
  padding: ${props => props.scrolled ? '10px 0' : '20px 0'};
  position: fixed;
  width: 100%;
  z-index: 1000;
  transition: ${props => props.theme.transitions.default};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.medium : 'none'};
  backdrop-filter: blur(8px);
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
`;

const PawIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  margin-right: 10px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
`;

const LogoAccent = styled.span`
  font-size: 12px;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.accent};
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: absolute;
    top: ${props => props.isOpen ? '100%' : '-500px'};
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.backgroundDark};
    flex-direction: column;
    padding: 20px;
    transition: top 0.3s ease-in-out;
    z-index: 20;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  padding: 8px 15px;
  transition: ${props => props.theme.transitions.default};
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: ${props => props.theme.transitions.default};
  }
  
  &:hover::after, &.active::after {
    width: 70%;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &.category-link {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
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
  color: ${props => props.theme.colors.textLight};
  font-size: 20px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SearchButton = styled(IconButton)``;

const CartButton = styled(IconButton)`
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const AccountButton = styled(Link)`
  color: ${props => props.theme.colors.textLight};
  font-size: 20px;
  text-decoration: none;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const AdminButton = styled(Link)`
  color: ${props => props.theme.colors.textLight};
  font-size: 20px;
  text-decoration: none;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export default Header;