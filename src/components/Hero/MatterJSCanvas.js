import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const MatterJSCanvas = () => {
  const canvasRef = useRef(null);
  const spriteMapRef = useRef(new Map()); // bodyId → { img, width, height }
  const obstacleMapRef = useRef(new Map()); // obstacleId → body

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;

    const canvas = canvasRef.current;
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      // Keep CSS dimensions in sync with pixel dimensions so there is no
      // accidental scaling that would misplace drawn sprites on screen.
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
    };
    updateCanvasSize();

    const W = canvas.width;
    const H = canvas.height;
    const T = 30; // wall thickness
    const staticOpts = {
      isStatic: true,
      restitution: 0,
      render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
    };
    // Narrow platform just below the hero fold to create interesting stacking
    const heroPlatform = Matter.Bodies.rectangle(
      W * 0.44,
      window.innerHeight + 30,
      W * 0.05,
      20,
      staticOpts,
    );
    Matter.World.add(world, [heroPlatform]);

    const spawnWithImage = (img, x, y, w, h) => {
      const body = Matter.Bodies.rectangle(x, y, w, h, {
        restitution: 0,
        friction: 0.5,
        frictionAir: 0.01,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
          lineWidth: 0,
        },
      });
      Matter.World.add(world, body);
      Matter.Body.setVelocity(body, {
        x: (Math.random() < 0.5 ? -1 : 1) * (1 + Math.random() * 2),
        y: 0,
      });
      spriteMapRef.current.set(body.id, { img, width: w, height: h });
      console.log(
        `[MatterJSCanvas] sprite ready (body ${body.id}, ${Math.round(w)}×${Math.round(h)}px)`,
      );
    };

    const handleSpawn = e => {
      const { svgMarkup, rect, prewarmedImg } = e.detail;
      if (!rect) return;

      const w = rect.width;
      const h = rect.height;
      const x = rect.left + w / 2;
      const y = rect.top + window.scrollY + h / 2;

      if (prewarmedImg) {
        // Fast path — but guard against the race where another instance read
        // the Image from the cache *before* img.src was set (complete=true
        // vacuously, no pixel data yet), then img.src was set and complete
        // flipped to false while loading.
        if (prewarmedImg.complete && prewarmedImg.naturalWidth > 0) {
          spawnWithImage(prewarmedImg, x, y, w, h);
        } else {
          prewarmedImg.addEventListener(
            'load',
            () => spawnWithImage(prewarmedImg, x, y, w, h),
            { once: true },
          );
        }
        return;
      }

      // Fallback: load from markup (used if clicked before pre-warm completed)
      if (!svgMarkup) return;
      const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        spawnWithImage(img, x, y, w, h);
      };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    };
    window.addEventListener('spawnBox', handleSpawn);

    // Registers an invisible static obstacle (e.g. footer section)
    const handleRegisterObstacle = e => {
      const { id, x, y, width, height } = e.detail;
      const existing = obstacleMapRef.current.get(id);
      if (existing) Matter.World.remove(world, existing);
      const body = Matter.Bodies.rectangle(x, y, width, height, staticOpts);
      Matter.World.add(world, body);
      obstacleMapRef.current.set(id, body);
    };
    window.addEventListener('registerObstacle', handleRegisterObstacle);

    // Click anywhere below the hero to shake all sprites upward
    const handleDocumentClick = e => {
      if (e.clientY + window.scrollY < window.innerHeight) return;
      for (const bodyId of spriteMapRef.current.keys()) {
        const body = Matter.Composite.get(world, bodyId, 'body');
        if (!body) continue;
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 6,
          y: -(4 + Math.random() * 8),
        });
      }
    };
    document.addEventListener('click', handleDocumentClick);

    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: canvas.width,
        height: canvas.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    console.log(
      '[MatterJSCanvas] ready — engine, renderer, and runner are running',
    );

    const drawnOnce = new Set();

    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      for (const [bodyId, { img, width, height }] of spriteMapRef.current) {
        const body = Matter.Composite.get(world, bodyId, 'body');
        if (!body) continue;
        if (!drawnOnce.has(bodyId)) {
          drawnOnce.add(bodyId);
          console.log(
            `[MatterJSCanvas] first draw for body ${bodyId} at (${Math.round(body.position.x)}, ${Math.round(body.position.y)})`,
          );
        }
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();
      }
    });

    const handleResize = () => {
      updateCanvasSize();
      render.options.width = canvas.width;
      render.options.height = canvas.height;
      render.canvas.width = canvas.width;
      render.canvas.height = canvas.height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('spawnBox', handleSpawn);
      window.removeEventListener('registerObstacle', handleRegisterObstacle);
      document.removeEventListener('click', handleDocumentClick);
      spriteMapRef.current.clear();
      obstacleMapRef.current.clear();
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default MatterJSCanvas;
