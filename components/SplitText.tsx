"use client";
import { useRef } from "react";
import { motion, useInView, type UseInViewOptions } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
}

export default function SplitText({
  children,
  className,
  style,
  delay = 0,
  stagger = 0.055,
  once = true,
  margin = "-60px" as UseInViewOptions["margin"],
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin });
  const words = children.split(" ");

  return (
    <div ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.72,
              delay: delay + i * stagger,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
