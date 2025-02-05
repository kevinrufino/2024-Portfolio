import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
} from "matter-js";

// @TODO: FIX shape of bodies
// @TODO: Initial placement of bodies in hero section
// @TODO: FIX MOUSE DRAG ...
// @TODO: Fix mouse events ...

// @TODO: (nice to have) Wiggle lines?

export function HeroCanvas() {
  const elementRef = useRef(null);
  // const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const world = engine.current.world;
  const runner = useRef(Runner.create());

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;
    // const iw = window.innerWidth;
    const ih = window.innerHeight;

    const render = Render.create({
      engine: engine.current,
      element: elementRef.current,
      options: {
        width: cw,
        height: ch,
        wireframes: true,
        background: "#000000",
      },
    });

    //optional
    Runner.run(runner.current, engine.current);

    // add mouse control
    const mouse = Mouse.create(render.element),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: true,
          },
        },
      });
    render.mouse = mouse;

    Composite.add(world, mouseConstraint);

    console.log("render", render);

    Composite.add(world, [
      // Bodies.rectangle(cw / 2, ih, cw, 1, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 1, cw, 1, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(200, ih, 700, 20, {
        isStatic: true,
        angle: Math.PI * 0.06,
        render: { fillStyle: "white" },
      }),
      Bodies.rectangle(500, ih * 2, 700, 20, {
        isStatic: true,
        angle: -Math.PI * 0.06,
        render: { fillStyle: "white" },
      }),
      Bodies.rectangle(340, ih * 3, 700, 20, {
        isStatic: true,
        angle: Math.PI * 0.04,
        render: { fillStyle: "white" },
      }),
    ]);

    Render.run(render);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  // const handleDown = () => {
  //   isPressed.current = true;
  // };

  // const handleUp = () => {
  //   isPressed.current = false;
  // };

  const handleAddCircle = (e) => {
    // if (isPressed.current) {
    const ball = Bodies.circle(e.clientX, e.clientY, 30, {
      mass: 0.01,
      restitution: 0.6,
      friction: 0.00001,
      render: {
        fillStyle: "white",
        sprite: {
          texture: "./rufino.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    // const geomtery = Bodies.fromVertices();
    Composite.add(world, [ball]);
    // }
  };

  return (
    <div
      ref={elementRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "auto",
        mixBlendMode: "difference",
      }}
      onClick={handleAddCircle}
    />
  );
}

// export const MatterStepOne = () => {
//   const boxRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let Engine = Matter.Engine;
//     let Render = Matter.Render;
//     let World = Matter.World;
//     let Bodies = Matter.Bodies;

//     let engine = Engine.create({});

//     let render = Render.create({
//       element: boxRef.current,
//       engine: engine,
//       canvas: canvasRef.current,
//       options: {
//         width: 300,
//         height: 300,
//         background: "rgba(255, 0, 0, 0.5)",
//         wireframes: false,
//       },
//     });

//     const floor = Bodies.rectangle(150, 300, 300, 20, {
//       isStatic: true,
//       render: {
//         fillStyle: "blue",
//       },
//     });

//     const ball = Bodies.circle(150, 0, 10, {
//       restitution: 0.9,
//       render: {
//         fillStyle: "yellow",
//       },
//     });

//     World.add(engine.world, [floor, ball]);

//     Engine.run(engine);
//     Render.run(render);
//     console.log("render", render);
//     console.log("engine", engine);
//     console.log;

//     // return () => {
//     //   Render.stop(render);
//     //   World.clear(engine.current.world, false);
//     //   Engine.clear(engine.current);
//     //   render.canvas.remove();
//     //   // render.canvas = null;
//     //   // render.context = null;
//     //   render.textures = {};
//     // };
//   }, []);

//   return (
//     <div
//       ref={boxRef}
//       style={{
//         width: 300,
//         height: 300,
//       }}
//     >
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };
