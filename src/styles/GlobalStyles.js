import { createGlobalStyle, keyframes } from 'styled-components';

export const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ContemporaryGlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  :root {
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --gradient-vibrant: linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F97316 100%);
    --gradient-sunset: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    --gradient-ocean: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-dark: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
    
    --color-primary: #8B5CF6;
    --color-secondary: #EC4899;
    --color-accent: #F97316;
    --color-dark: #1a1a2e;
    --color-darker: #0f0f1a;
    --color-light: #fafafa;
    --color-white: #ffffff;
    --color-gray: #6b7280;
    --color-gray-light: #e5e7eb;
    
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
    --radius-full: 9999px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #1a1a2e;
    background: #ffffff;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    line-height: 1.2;
  }

  p { margin-bottom: 1rem; }
  a { color: inherit; text-decoration: none; transition: all 0.3s ease; }
  img { max-width: 100%; height: auto; display: block; }
  button { font-family: inherit; cursor: pointer; }
  input, textarea, select { font-family: inherit; font-size: inherit; }
  ul, ol { list-style: none; }

  ::selection {
    background: var(--color-primary);
    color: white;
  }

  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  [id] { scroll-margin-top: 100px; }

  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: var(--color-dark); }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #8B5CF6, #EC4899);
    border-radius: var(--radius-full);
  }
`;

export default ContemporaryGlobalStyles;
