/* eslint-disable react/prop-types */
import  { useEffect, useRef } from 'react';
// import gsap from 'gsap';

const WaveAnimation = (props) => {
  const canvasRef = useRef(null);
  let phase = useRef(0);
  let rotation = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const ratio = window.devicePixelRatio || 1;
    const width = props.width || window.innerWidth || 1280;
    const height = props.height || window.innerHeight || 720;
    const width_2 = width / 2;
    const height_2 = height / 2;
    const MAX = height_2 - 4;
    const amplitude = props.amplitude || 0;
    const speed = props.speed || 0.02;
    const frequency = props.frequency || 2;
    const angle = 10;
    const circleProgress = 0;
    const radius = ratio * height * 0.4;
    const squareSide = Math.sqrt(Math.pow(2 * radius, 2) / 2);

    const animate = () => {
      phase.current += speed;
      rotation.current += 0.1;

      ctx.clearRect(0, 0, width, height);

      // Your drawing logic here

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Clean up if needed
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={props.width || window.innerWidth || 1280}
      height={props.height || window.innerHeight || 720}
    />
  );
};

export default WaveAnimation;
