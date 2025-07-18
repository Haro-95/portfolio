declare module 'react-text-rotator' {
  import { ComponentType } from 'react';

  export interface RotatingTextProps {
    text: string;
    className?: string;
    animation?: 'fade' | 'zoom' | 'bounce' | 'flip' | 'rotate';
    duration?: number;
    delay?: number;
    random?: boolean;
    repeat?: number;
    children?: React.ReactNode;
  }

  const RotatingText: ComponentType<RotatingTextProps>;
  export default RotatingText;
}
