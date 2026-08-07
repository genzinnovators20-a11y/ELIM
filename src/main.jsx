import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Self-hosted typefaces — no third-party font CDN, no render-blocking request.
import '@fontsource-variable/sora';
import '@fontsource-variable/manrope';
import '@fontsource-variable/jetbrains-mono/wght.css';
import '@fontsource/instrument-serif/latin-400.css';

import theme from './theme';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

// Retire the first-paint shell once React has committed.
const boot = document.getElementById('boot');
if (boot) {
  requestAnimationFrame(() => {
    boot.dataset.hidden = 'true';
    window.setTimeout(() => boot.remove(), 640);
  });
}
