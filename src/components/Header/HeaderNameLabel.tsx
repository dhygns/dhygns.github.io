import React, { useRef } from "react";
import * as THREE from "three";
import HeaderLabelFX from "./HeaderLabelFx";
import classes from "./Header.module.scss";

export const HeaderNameLabel = () => {
  const [renderer, setRenderer] = React.useState<THREE.WebGLRenderer | null>(
    null
  );
  const [fx, setFx] = React.useState<HeaderLabelFX | null>(null);
  const [size, setSize] = React.useState<number>();
  const divRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    const handleResize = () => {
      setSize(divRef?.current?.clientWidth ?? 0)
    }
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [divRef, canvasRef]);

  React.useEffect(() => {
    if (!fx && renderer) {
      setFx(new HeaderLabelFX(renderer));
    }
  }, [renderer, fx]);

  React.useEffect(() => {
    if (canvasRef?.current && !renderer) {
      setRenderer(
        new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
        })
      );

      setSize(divRef?.current?.clientWidth ?? 0)

    }
  }, [canvasRef, renderer]);

  React.useEffect(() => {
    if (fx) fx.setSize(size ?? 0);
  }, [fx, size]);

  return (
    <div className={classes.background} ref={divRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
