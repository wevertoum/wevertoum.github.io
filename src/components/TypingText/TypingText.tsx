import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TypingTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function TypingTextInner({ text, speed = 42, className }: TypingTextProps) {
  const reducedMotion = prefersReducedMotion();
  const [displayed, setDisplayed] = useState(() => (reducedMotion ? text : ""));
  const [isComplete, setIsComplete] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
        setIsComplete(true);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed, reducedMotion]);

  return (
    <span className={cn("inline", className)}>
      <span>{displayed}</span>
      <span
        className={cn(
          "typing-cursor ml-1 inline-block h-[0.92em] w-[3px] translate-y-[0.08em] bg-accent",
          isComplete && "typing-cursor-blink",
        )}
        aria-hidden="true"
      />
    </span>
  );
}

export function TypingText(props: TypingTextProps) {
  return <TypingTextInner key={props.text} {...props} />;
}
