import Image from "next/image";
import classes from "./styles.module.css";

export default function about() {
  return (
    <div>
      <h1 className={classes.title}>
        Sobre <span className={classes.me2}> mí.</span>
      </h1>
      <Image
        className={classes.me}
        src="/me.jpg"
        alt=""
        width={360}
        height={300}
      />
    </div>
  );
}
