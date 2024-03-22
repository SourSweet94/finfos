import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  className?: string;
  style?: {};
}

const Text = ({ children, className, style }: TextProps) => {
  return (
    <span className={className} style={{...style}}>
      {children}
    </span>
  );
};

export default Text;
