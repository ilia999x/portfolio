import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import SplineLoader from '@splinetool/loader';

const useSpline = (filePath) => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new SplineLoader();

    const onLoad = (splineScene) => {
      scene.add(splineScene);
    };

    const onError = (error) => {
      console.error('An error occurred while loading the spline:', error);
    };

    // Check if the file path is a URL or a local file path
    if (filePath.startsWith('http') || filePath.startsWith('https')) {
      loader.load(filePath, onLoad, null, onError);
    } else {
      // Assume it's a local file path
      loader.load(
        `file://${filePath}`, // Prepend 'file://' to indicate a local file path
        onLoad,
        null,
        onError
      );
    }

    // Clean up on component unmount
    return () => {
      // Optionally, remove the loaded spline from the scene on unmount
      // scene.remove(splineScene);
    };
  }, [filePath, scene]);

  // You can return additional data or functions if needed
  return {
    // Add any desired properties or functions here
  };
};

export default useSpline;