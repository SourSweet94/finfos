import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: {};
}

const Text = ({
  children,
  className,
  as: Component = "span",
  style,
}: TextProps) => {
  return (
    <Component className={className} style={{ ...style }}>
      {children}
    </Component>
  );
};

export default Text;
