import { useEffect, useRef, ReactNode, CSSProperties } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  stagger = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          // Add revealed class with slight delay for smoother effect
          setTimeout(() => {
            if (ref.current) {
              ref.current.classList.add('revealed');
              ref.current.style.opacity = '1';
              ref.current.style.transform = 'translateY(0) translateX(0)';
            }
          }, delay + stagger);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, stagger, threshold]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'left':
        return 'translateX(40px)';
      case 'right':
        return 'translateX(-40px)';
      default:
        return 'translateY(40px)';
    }
  };

  const style: CSSProperties = {
    opacity: 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    willChange: 'opacity, transform',
  };

  return (
    <div
      ref={ref}
      className="scroll-reveal"
      style={style}
    >
      {children}
    </div>
  );
}
