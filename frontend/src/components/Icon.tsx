import * as icons from "react-bootstrap-icons";

interface IconProps {
  iconName: keyof typeof icons;
  color?: string
}

const Icon = ({ iconName, color, ...props }: IconProps) => {
  const BSIcon = icons[iconName];
  return <BSIcon color={color} {...props} />;
};

export default Icon;
