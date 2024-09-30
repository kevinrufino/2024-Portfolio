// import { ReactP5Wrapper } from "@p5-wrapper/react";
// import { Engine, Composite, Bodies, World } from "matter-js";
// import React from "react";

// export const HeroCanvas = (props) => {
//   const width = window.innerWidth;
//   const height = document.documentElement.scrollHeight;

//   let engine;
//   let world;
//   let names = [];
//   let ground;

//   const sketch = (p5) => {
//     p5.setup = () => {
//       p5.createCanvas(width, height);
//       // create an engine
//       engine = Engine.create();
//       world = engine.world;
//       // ground = new Boundary(200, height, width, 100);
//       // Composite.add(world, ground);
//     };

//     p5.draw = () => {
//       p5.background("transparent");
//       p5.text("Hello World", width / 2, height / 2);
//     };
//   };

//   return <ReactP5Wrapper sketch={sketch} />;
// };

import React, { useEffect, useRef } from "react";
import Matter, { Engine, Render, Runner, Bodies, World } from "matter-js";

export const MatterStepOne = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;

    let engine = Engine.create({});

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: 300,
        height: 300,
        background: "rgba(255, 0, 0, 0.5)",
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(150, 300, 300, 20, {
      isStatic: true,
      render: {
        fillStyle: "blue",
      },
    });

    const ball = Bodies.circle(150, 0, 10, {
      restitution: 0.9,
      render: {
        fillStyle: "yellow",
      },
    });

    World.add(engine.world, [floor, ball]);

    Engine.run(engine);
    Render.run(render);
    console.log("render", render);
    console.log("engine", engine);
    console.log;

    // return () => {
    //   Render.stop(render);
    //   World.clear(engine.current.world, false);
    //   Engine.clear(engine.current);
    //   render.canvas.remove();
    //   // render.canvas = null;
    //   // render.context = null;
    //   render.textures = {};
    // };
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: 300,
        height: 300,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export function TestingComp(props) {
  const scene = useRef();
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    Matter.Runner.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {};
    };
  }, []);

  const handleDown = () => {
    isPressed.current = true;
  };

  const handleUp = () => {
    isPressed.current = false;
  };

  const handleAddCircle = (e) => {
    // if (isPressed.current) {
    const ball = Bodies.circle(e.clientX, e.clientY, 10 + Math.random() * 30, {
      mass: 1,
      restitution: 0.6,
      friction: 0.1,
      render: {
        fillStyle: "white",
        sprite: {
          texture: "./kevin-fill.png",
        },
      },
    });
    World.add(engine.current.world, [ball]);
    // }
  };

  return (
    <div
      // onMouseDown={handleDown}
      onMouseDown={handleAddCircle}
      onMouseUp={handleUp}
      // onMouseMove={handleAddCircle}
    >
      <div
        ref={scene}
        style={{
          width: "0vw",
          height: "0vh",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
