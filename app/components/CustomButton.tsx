import Link from "next/link";
import ButtonSvg from "../assets/svg/ButtonSvg";
import { Loader2 } from "lucide-react";
// import ButtonSvg from "../../public/assets/svg/ButtonSvg";

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  px?: string;
  white?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
  disabled,
  loading = false,
  type = "button",
}) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 disabled:opacity-70 disabled:pointer-events-none disabled:cursor-not-allowed ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";
  const renderButton = () => (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
      {loading && (
        <Loader2 className="animate-spin absolute right-[10px] top-[10px]" />
      )}
    </button>
  );

  const renderLink = () => (
    <Link href={href || `/`} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </Link>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
