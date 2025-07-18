'use client';

import { useEffect, useState } from 'react';

const RotatingTextWrapper = (props: any) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const RotatingText = (await import('./RotatingText')).default;
        setComponent(() => RotatingText);
      } catch (error) {
        console.error('Failed to load RotatingText component:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComponent();
  }, []);

  if (isLoading) {
    return <span className="inline-block h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>;
  }

  if (!Component) {
    return null;
  }

  return <Component {...props} />;
};

export default RotatingTextWrapper;
