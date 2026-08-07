import { memo } from 'react';
import Box from '@mui/material/Box';
import { motion, useScroll, useSpring } from 'framer-motion';

const MotionBox = motion.create(Box);

/** Hairline reading-progress indicator pinned beneath the navigation bar. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <MotionBox
      aria-hidden
      style={{ scaleX }}
      sx={(theme) => ({
        position: 'fixed',
        top: 'var(--ef-nav-h)',
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: '0% 50%',
        background: theme.ef.gradients.goldFill,
        boxShadow: '0 0 18px rgba(212,175,55,0.55)',
        zIndex: theme.ef.zIndex.nav - 1,
        pointerEvents: 'none',
      })}
    />
  );
}

export default memo(ScrollProgress);
