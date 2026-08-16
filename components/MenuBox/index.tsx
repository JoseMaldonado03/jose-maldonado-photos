import Link from "next/link";
import classes from "./styles.module.css";

type MenuBoxProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function MenuBox({
  title,
  href,
  className,
  ...props
}: MenuBoxProps) {
  return (
    <Link
      href={href as string}
      className={`${classes.box} ${className ?? ""}`}
      {...props}
    >
      <span>{title}</span>
    </Link>
  );
}
