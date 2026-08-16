import classes from "./styles.module.css";

interface FooterProps {
  color?: string;
}

export default function Footer(props: FooterProps) {
  const color = props.color || "white";

  return (
    <div className={classes.footer} style={{ color }}>
      <p>José Maldonado</p>
    </div>
  );
}
