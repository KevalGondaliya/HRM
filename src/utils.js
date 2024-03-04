import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';

export const useWindowDimensions = () => {
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({window, screen});
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  }, []);
  return dimensions.screen.width;
};

export const isWidth400 = () => {
  const windowWidth = useWindowDimensions(); 
  return windowWidth > 400;
};

export const isWidth500 = () => {
  const windowWidth = useWindowDimensions();
  return windowWidth > 500;
};

export const isWidthUnder400 = () => {
  const windowWidth = useWindowDimensions();
  return windowWidth < 400 || windowWidth < 500;
};

export const isWidth600 = () => {
  const windowWidth = useWindowDimensions();
  return windowWidth > 600;
};
