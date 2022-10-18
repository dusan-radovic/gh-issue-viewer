export interface IButtonProps {
  classes: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: any;
  size?: "xs" | "small" | "normal" | "medium";
  color?: "primary" | "secondary" | "error";
  style?: "solid" | "outline";
}
