import { useInView } from 'react-intersection-observer';
import { useEffect, useState, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  threshold?: number;
}

export default function FadeIn({ children, threshold = 0.1 }: FadeInProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(150px)',
        transition: 'opacity 1s ease-out, transform 0.6s ease-out',
      }}
    >
      {children}
    </div>
  );
}
