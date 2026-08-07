import { memo } from 'react';
import Box from '@mui/material/Box';
import useAssetAvailability from '../../hooks/useAssetAvailability';
import EmblemFallback from './EmblemFallback';
import CoinFallback from './CoinFallback';

const BRAND_ASSETS = {
  emblem: {
    png: '/brand/elimforge-emblem.png',
    webp: '/brand/elimforge-emblem.webp',
    alt: 'ELIM FORGE — forged with blockchain',
    Fallback: EmblemFallback,
  },
  coin: {
    png: '/brand/elimcoin-gold.png',
    webp: '/brand/elimcoin-gold.webp',
    alt: 'ELIM Coin (ELM) — Binance Smart Chain BEP-20 token',
    Fallback: CoinFallback,
  },
};

/**
 * Renders a supplied brand image with `object-fit: contain` (never stretched,
 * never distorted) and degrades to the hand-authored vector mark when the file
 * has not been added to /public/brand yet.
 */
function BrandArt({ asset = 'coin', alt, priority = false, sx, imgSx, ...props }) {
  const config = BRAND_ASSETS[asset] ?? BRAND_ASSETS.coin;
  const status = useAssetAvailability(config.png);
  const { Fallback } = config;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        display: 'block',
        lineHeight: 0,
        ...sx,
      }}
      {...props}
    >
      {status === 'ready' ? (
        <Box
          component="img"
          src={config.png}
          alt={alt ?? config.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            userSelect: 'none',
            ...imgSx,
          }}
        />
      ) : (
        <Fallback />
      )}
    </Box>
  );
}

export default memo(BrandArt);
