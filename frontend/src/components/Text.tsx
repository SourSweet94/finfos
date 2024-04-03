import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements | (keyof JSX.IntrinsicElements)[];
  style?: {};
}

const Text = ({
  children,
  className,
  as: Components = ["span"],
  style,
}: TextProps) => {
  const components = Array.isArray(Components) ? Components : [Components];
  return components.reduceRight((acc, Component) => {
    return (
      <Component className={className} style={style}>
        {acc}
      </Component>
    );
  }, children);
};

export default Text;
