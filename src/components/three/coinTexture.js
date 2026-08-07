import * as THREE from 'three';

/**
 * Paints the ELIM COIN face to an offscreen canvas and returns it as a texture.
 *
 * Generated at runtime rather than shipped as an image: it stays crisp at any
 * resolution, costs zero bytes of payload, and needs no network round-trip on
 * a cold VPS cache.
 */
export function createCoinFaceTexture(size = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const c = size / 2;
  const R = size * 0.5;

  // Base
  const face = ctx.createRadialGradient(c * 0.72, c * 0.6, R * 0.08, c, c, R);
  face.addColorStop(0, '#F9EDC2');
  face.addColorStop(0.34, '#E0BC55');
  face.addColorStop(0.68, '#B08526');
  face.addColorStop(1, '#77530E');
  ctx.fillStyle = face;
  ctx.beginPath();
  ctx.arc(c, c, R, 0, Math.PI * 2);
  ctx.fill();

  const dark = 'rgba(72, 48, 6, 0.62)';
  const light = 'rgba(255, 246, 214, 0.5)';

  // Concentric relief
  ctx.lineWidth = size * 0.006;
  ctx.strokeStyle = dark;
  ctx.beginPath();
  ctx.arc(c, c, R * 0.9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = light;
  ctx.lineWidth = size * 0.003;
  ctx.beginPath();
  ctx.arc(c, c, R * 0.875, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = dark;
  ctx.lineWidth = size * 0.005;
  ctx.beginPath();
  ctx.arc(c, c, R * 0.71, 0, Math.PI * 2);
  ctx.stroke();

  /**
   * Ring legend.
   *
   * Characters are placed one at a time around an arc. `position === 'bottom'`
   * walks the angle backwards and flips each glyph, so the lower legend reads
   * left-to-right and upright instead of mirrored over the upper one.
   */
  const arcText = (str, radius, fontSize, sweep, position = 'top') => {
    ctx.save();
    ctx.translate(c, c);
    ctx.font = `700 ${fontSize}px "Sora Variable", "Sora", system-ui, sans-serif`;
    ctx.fillStyle = dark;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const chars = [...str];
    const step = sweep / Math.max(chars.length - 1, 1);
    const bottom = position === 'bottom';

    chars.forEach((ch, i) => {
      const a = bottom ? Math.PI + sweep / 2 - step * i : -sweep / 2 + step * i;
      ctx.save();
      ctx.rotate(a);
      ctx.translate(0, -radius);
      if (bottom) ctx.rotate(Math.PI);
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
    ctx.restore();
  };

  arcText('ELIM COIN · BINANCE NETWORK', R * 0.8, size * 0.042, Math.PI * 0.86, 'top');
  arcText('DECENTRALISED · PEER-TO-PEER', R * 0.8, size * 0.038, Math.PI * 0.82, 'bottom');

  // Circuit engraving
  ctx.save();
  ctx.strokeStyle = 'rgba(72, 48, 6, 0.4)';
  ctx.lineWidth = size * 0.007;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const traces = [
    [[-0.5, -0.26], [-0.32, -0.26], [-0.24, -0.34], [-0.06, -0.34]],
    [[-0.5, 0.26], [-0.32, 0.26], [-0.24, 0.34], [-0.06, 0.34]],
    [[0.5, -0.26], [0.32, -0.26], [0.24, -0.34], [0.06, -0.34]],
    [[0.5, 0.26], [0.32, 0.26], [0.24, 0.34], [0.06, 0.34]],
    [[-0.62, 0], [-0.44, 0]],
    [[0.62, 0], [0.44, 0]],
  ];
  traces.forEach((pts) => {
    ctx.beginPath();
    pts.forEach(([x, y], i) => {
      const px = c + x * R;
      const py = c + y * R;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  });
  ctx.fillStyle = 'rgba(72, 48, 6, 0.45)';
  [[-0.62, 0], [0.62, 0], [-0.06, -0.34], [0.06, -0.34], [-0.06, 0.34], [0.06, 0.34]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(c + x * R, c + y * R, size * 0.013, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // Currency glyph
  ctx.save();
  ctx.strokeStyle = '#8A6210';
  ctx.lineWidth = size * 0.055;
  ctx.lineCap = 'round';
  const gr = R * 0.33;
  ctx.beginPath();
  ctx.arc(c, c, gr, -Math.PI * 0.28, Math.PI * 0.28, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - gr * 1.05, c - gr * 0.26);
  ctx.lineTo(c + gr * 0.42, c - gr * 0.26);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - gr * 1.05, c + gr * 0.26);
  ctx.lineTo(c + gr * 0.42, c + gr * 0.26);
  ctx.stroke();

  ctx.strokeStyle = '#FBF0CE';
  ctx.lineWidth = size * 0.042;
  ctx.beginPath();
  ctx.arc(c, c, gr, -Math.PI * 0.28, Math.PI * 0.28, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - gr * 1.05, c - gr * 0.26);
  ctx.lineTo(c + gr * 0.42, c - gr * 0.26);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - gr * 1.05, c + gr * 0.26);
  ctx.lineTo(c + gr * 0.42, c + gr * 0.26);
  ctx.stroke();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export default createCoinFaceTexture;
