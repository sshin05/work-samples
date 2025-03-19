'use client';

import { css } from '@cerberus/styled-system/css';
import { useEffect, useRef } from 'react';
import { useRouteBasedTheming } from '@/hooks/useRouteBasedTheming/useRouteBasedTheming';

/**
 * This is the main background that is rendered for the admin portal
 */
export const SVGToCanvas = () => {
  const { theme } = useRouteBasedTheming();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1440;
    canvas.height = 1024;

    // Create linear gradients
    const gradient1 = ctx.createLinearGradient(
      2140.39,
      341.157,
      674.127,
      977.916
    );
    gradient1.addColorStop(0, '#DFCCF020');
    gradient1.addColorStop(1, '#9F66D320');

    const gradient2 = ctx.createLinearGradient(
      -471.073,
      1014.82,
      804.393,
      1101.71
    );
    gradient2.addColorStop(0, '#DFCCF020');
    gradient2.addColorStop(1, '#9F66D320');

    // Helper function to draw a path
    const drawPath = (d: string, fill: CanvasGradient) => {
      const path = new Path2D(d);
      ctx.fillStyle = fill;
      ctx.fill(path);
    };

    // Draw the first path
    drawPath(
      'M1729.86 442.588C1818.24 366.528 2002.2 327.56 1925.87 177.468C1849.65 27.5655 1610.46 -56.0748 1431.77 -143.598C1304.94 -205.718 1192.72 -219.258 1072.01 -240.749C919.827 -267.843 729.64 -349.258 648.58 -283.032C559.8 -210.499 552.03 -53.7457 665.257 91.5658C772.618 229.349 1023.62 168.035 1187.41 259.902C1309.18 328.201 1372.29 534.824 1488.9 553.53C1612.66 573.383 1665.14 498.284 1729.86 442.588Z',
      gradient1
    );

    // Draw the second path
    drawPath(
      'M-132.93 919.314C-225.849 984.496 -375.171 1022.17 -374.638 1143.06C-374.106 1263.81 -229.578 1325.11 -130.849 1391.47C-60.7754 1438.57 16.527 1446.23 97.1261 1460.16C198.734 1477.71 308.149 1538.7 392.067 1481.82C483.978 1419.52 547.585 1290.56 518.22 1174.73C490.377 1064.9 350.741 1049.18 264.547 978.795C200.465 926.466 163.399 832.548 84.7823 820.783C1.34453 808.297 -64.8882 871.583 -132.93 919.314Z',
      gradient2
    );

    // Apply global opacity
    ctx.globalAlpha = 0.2;

    // Apply drop shadow (approximation, as canvas doesn't support SVG filters directly)
    ctx.shadowColor = 'rgba(58, 0, 110, 0.2)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = -5;
    ctx.shadowOffsetY = 10;

    // Redraw paths with shadow
    drawPath(
      'M1729.86 442.588C1818.24 366.528 2002.2 327.56 1925.87 177.468C1849.65 27.5655 1610.46 -56.0748 1431.77 -143.598C1304.94 -205.718 1192.72 -219.258 1072.01 -240.749C919.827 -267.843 729.64 -349.258 648.58 -283.032C559.8 -210.499 552.03 -53.7457 665.257 91.5658C772.618 229.349 1023.62 168.035 1187.41 259.902C1309.18 328.201 1372.29 534.824 1488.9 553.53C1612.66 573.383 1665.14 498.284 1729.86 442.588Z',
      gradient1
    );
    drawPath(
      'M-132.93 919.314C-225.849 984.496 -375.171 1022.17 -374.638 1143.06C-374.106 1263.81 -229.578 1325.11 -130.849 1391.47C-60.7754 1438.57 16.527 1446.23 97.1261 1460.16C198.734 1477.71 308.149 1538.7 392.067 1481.82C483.978 1419.52 547.585 1290.56 518.22 1174.73C490.377 1064.9 350.741 1049.18 264.547 978.795C200.465 926.466 163.399 832.548 84.7823 820.783C1.34453 808.297 -64.8882 871.583 -132.93 919.314Z',
      gradient2
    );
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={css({
        h: 'full',
        left: 0,
        position: 'fixed',
        pointerEvents: 'none',
        top: 0,
        w: 'full',
        zIndex: 'hide',
        visibility: theme === 'acheron' ? 'hidden' : 'visible'
      })}
    />
  );
};
