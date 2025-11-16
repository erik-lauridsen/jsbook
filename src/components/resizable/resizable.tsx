import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [width, setWidth] = useState(Math.floor(window.innerWidth));
  const [height, setHeight] = useState(Math.floor(window.innerHeight));

  const [widthProp, setWidthProp] = useState(Math.floor(window.innerWidth * 0.8));

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWidth(Math.floor(window.innerWidth));
        setHeight(Math.floor(window.innerHeight));
        if (Math.floor(window.innerWidth * 0.8) < widthProp) {
          setWidthProp(Math.floor(window.innerWidth * 0.8));
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [widthProp]);

  if (direction === 'vertical') {
    resizableProps = {
      minConstraints: [Infinity, 42],
      maxConstraints: [Infinity, height],
      resizeHandles: ['s'],
      height: 300,
      width: Infinity,
    };
  } else {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [Math.floor(width * 0.2), Infinity],
      maxConstraints: [Math.floor(width * 0.8), Infinity],
      resizeHandles: ['e'],
      height: Infinity,
      width: widthProp,
      onResizeStop: (event, data) => {
        setWidthProp(Math.floor(data.size.width));
      },
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
