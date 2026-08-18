import {
  FaGithub,
  FaLinkedin,
  FaSquareInstagram,
  FaSquareWhatsapp,
} from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

import classes from "./styles.module.css";

interface FooterProps {
  color?: string;
}

export default function Footer(props: FooterProps) {
  const color = props.color || "white";

  return (
    <div className={classes.footer} style={{ color }}>
      © {new Date().getFullYear()} josemaldonado.me
      <div className={classes.link}>
        <a
          href="https://github.com/JoseMaldonado03"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} color="white" />
        </a>
        <a
          href="https://www.linkedin.com/in/josemaldonado03/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={20} color="white" />
        </a>
        <a
          href="https://www.instagram.com/muso0397/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSquareInstagram size={20} color="white" />
        </a>
        <a
          href="https://wa.me/5491168835423"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSquareWhatsapp size={20} color="white" />
        </a>
        <a href="mailto:muso030397@gmail.com">
          {" "}
          <BiLogoGmail size={19} color="white" />{" "}
        </a>
      </div>
    </div>
  );
}
