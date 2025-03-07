import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    overflow-x: hidden;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }

  p {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.textLight};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${props => props.theme.transitions.default};
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.fonts.body};
    transition: ${props => props.theme.transitions.default};
    border: none;
    outline: none;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, textarea, select {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.darkGrey};
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
    padding: 10px 12px;
    border-radius: ${props => props.theme.sizes.radius};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(255, 72, 0, 0.2);
    }
    
    &::placeholder {
      color: ${props => props.theme.colors.textLight};
      opacity: 0.7;
    }
  }

  .container {
    width: 90%;
    max-width: ${props => props.theme.sizes.container};
    margin: 0 auto;
  }

  section {
    padding: 5rem 0;
  }

  .accent-text {
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
  }

  .card {
    background-color: ${props => props.theme.colors.card};
    border-radius: ${props => props.theme.sizes.radius};
    padding: 20px;
    box-shadow: ${props => props.theme.shadows.medium};
    border: 1px solid ${props => props.theme.colors.border};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes ripple {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 72, 0, 0.4);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(255, 72, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 72, 0, 0);
    }
  }

  /* Kaydırma çubuğu stilleri */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.accent};
  }
  
  ::selection {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.light};
  }
`;

export default GlobalStyles; 