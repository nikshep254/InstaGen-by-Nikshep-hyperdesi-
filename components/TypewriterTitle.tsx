
import React, { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  phrases: string[];
}

const TypewriterTitle: React.FC<TypewriterTitleProps> = ({ phrases }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(30);

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const handleTyping = () => {
      setText(current => isDeleting 
        ? fullText.substring(0, current.length - 1) 
        : fullText.substring(0, current.length + 1)
      );

      setTypingSpeed(isDeleting ? 15 : 35);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000); 
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(l => l + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  return (
    <span className="inline-flex items-center min-h-[1.2em] tracking-tight font-display">
      {text}
      <span className="animate-pulse ml-0.5 text-brand font-light opacity-80">|</span>
    </span>
  );
};

export default TypewriterTitle;
