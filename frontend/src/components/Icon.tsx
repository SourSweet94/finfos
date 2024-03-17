import * as icons from "react-bootstrap-icons";

interface IconProps {
  iconName: keyof typeof icons;
  color?: string
  size?: string
}

const Icon = ({ iconName, ...props }: IconProps) => {
  const BSIcon = icons[iconName];
  return <BSIcon  {...props} />;
};

export default Icon;
