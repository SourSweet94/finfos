import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  className?: string;
  style?: {};
}

const Text = ({ children, className, style }: TextProps) => {
  return (
    <span className={className} style={{color: 'red', ...style}}>
      {children}
    </span>
  );
};

export default Text;
