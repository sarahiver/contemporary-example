import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --black: #0D0D0D;
    --white: #FAFAFA;
    --coral: #FF6B6B;
    --coral-dark: #E85555;
    --electric: #4ECDC4;
    --electric-dark: #3DBDB5;
    --yellow: #FFE66D;
    --purple: #9B5DE5;
    --pink: #F15BB5;
    --gray-100: #F5F5F5;
    --gray-200: #E5E5E5;
    --gray-300: #D4D4D4;
    --gray-600: #525252;
    --gray-800: #262626;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Space Grotesk', -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: var(--black);
    background: var(--white);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    line-height: 1.1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ul, ol {
    list-style: none;
  }

  /* Bold Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--gray-100);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--coral);
    border-radius: 6px;
    border: 3px solid var(--gray-100);
    
    &:hover {
      background: var(--coral-dark);
    }
  }

  ::selection {
    background: var(--yellow);
    color: var(--black);
  }

  [id] {
    scroll-margin-top: 100px;
  }
`;

export default GlobalStyles;
