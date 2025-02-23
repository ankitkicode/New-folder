
import useSpotlightEffect from '../hooks/useSpotlightEffect';

const SpotlightCursor = ({ 
  config = {}, 
  className, 
  ...rest 
}) => {
  // Provide default configuration if not specified
  const spotlightConfig = {
    radius: 250,
    brightness: 0.01,
    color: '#ffffff',
    smoothing: 0.1,
    ...config
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
