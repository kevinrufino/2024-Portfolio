import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

/**
 * Full-page physics playground for the clickable hero name sprites.
 *
 * Performance: the engine, renderer and runner stay completely idle until the
 * first sprite is spawned (a name is clicked). Most visitors never click, so
 * the per-frame clear/redraw of the large full-document canvas — and the
 * canvas backing-store allocation itself — are deferred until they're actually
 * needed. The simulation is also paused whenever the tab is hidden.
 */
const MatterJSCanvas = () => {
  const canvasRef = useRef(null);
  const spriteMapRef = useRef(new Map()); // bodyId → { img, width, height }
  const obstacleMapRef = useRef(new Map()); // obstacleId → body

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;

    const canvas = canvasRef.current;
    const staticOpts = {
      isStatic: true,
      restitution: 0,
      render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
    };

    const sizeCanvasToDocument = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      // Keep CSS dimensions in sync with pixel dimensions so there is no
      // accidental scaling that would misplace drawn sprites on screen.
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
    };

    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });
    const runner = Matter.Runner.create();

    // ── Lazy start: nothing runs until the first sprite is spawned ──────────
    let started = false;
    const ensureStarted = () => {
      if (started) return;
      started = true;

      // Allocate the full-document canvas only now that we actually render.
      sizeCanvasToDocument();
      render.options.width = canvas.width;
      render.options.height = canvas.height;

      // Narrow platform just below the hero fold for interesting stacking.
      const heroPlatform = Matter.Bodies.rectangle(
        canvas.width * 0.44,
        window.innerHeight + 30,
        canvas.width * 0.05,
        20,
        staticOpts,
      );
      Matter.World.add(world, [heroPlatform]);

      Matter.Render.run(render);
      Matter.Runner.run(runner, engine);
    };

    const spawnWithImage = (img, x, y, w, h) => {
      ensureStarted();
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

    // Registers an invisible static obstacle (e.g. footer section). Safe to do
    // before the simulation starts — it simply sits in the world until then.
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
      if (!started) return;
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

    // Draw the SVG sprites on top of their physics bodies each frame.
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      for (const [bodyId, { img, width, height }] of spriteMapRef.current) {
        const body = Matter.Composite.get(world, bodyId, 'body');
        if (!body) continue;
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();
      }
    });

    const handleResize = () => {
      if (!started) return;
      sizeCanvasToDocument();
      render.options.width = canvas.width;
      render.options.height = canvas.height;
    };
    window.addEventListener('resize', handleResize);

    // Pause the simulation while the tab is hidden, resume when visible.
    const handleVisibility = () => {
      if (!started) return;
      if (document.hidden) {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      } else {
        Matter.Render.run(render);
        Matter.Runner.run(runner, engine);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('spawnBox', handleSpawn);
      window.removeEventListener('registerObstacle', handleRegisterObstacle);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('visibilitychange', handleVisibility);
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
