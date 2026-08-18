import Image from "next/image";
import classes from "./styles.module.css";

export default function about() {
  return (
    <div>
      <h1 className={classes.title}>
        Sobre <span className={classes.me2}> mí.</span>
      </h1>
      <div className={classes.photoContainer}>
        <Image
          className={classes.me}
          src="/me.jpg"
          alt=""
          width={360}
          height={300}
        />
      </div>
      <div className={classes.text}>
        <p>
          Soy José Maldonado, venezolano viviendo en Argentina, me considero una
          persona curiosa, creativa y en constante búsqueda de nuevas formas de
          expresarme. Desde hace años encuentro el arte como una manera de
          observar y comprender el mundo. Pinto, escribo, me interesa la música
          y, especialmente, la fotografía. <br /> <br /> Me atraen esos momentos
          que muchas veces pasan desapercibidos: una luz particular, una
          textura, un paisaje, una persona, una combinación de colores o
          simplemente una escena cotidiana que, por un instante, adquiere algo
          especial. <br />
          <br />
          También encontré en la tecnología otra forma de crear. Comencé mi
          camino en el desarrollo web y fui aprendiendo JavaScript, React,
          Next.js, TypeScript y otras herramientas que me permiten transformar
          ideas en experiencias digitales. Para mí, programar y crear arte no
          son mundos separados; ambos parten de la misma necesidad de construir,
          experimentar y encontrar una manera propia de expresar algo. <br />{" "}
          <br />
          Mi recorrido también ha estado marcado por los cambios. Nací y crecí
          en Venezuela y posteriormente emprendí un viaje conociendo diversos
          paises extraordinarios tales como: Colombia, Brasil, Uruguay, Chile y
          Argentina. Cada lugar, cada experiencia y cada persona que ha formado
          parte de mi camino ha dejado algo en mi manera de mirar. <br /> <br />
          Esta página nace precisamente de esa mirada. <br />
          <br /> Aquí reúno fotografías que despiertan algo en mí, ya sea por su
          composición, su historia, su atmósfera o simplemente por la sensación
          que producen. No busco solamente mostrar imágenes, sino compartir una
          pequeña parte de la forma en la que observo el mundo. <br /> <br />
          Porque, al final, crear también es aprender a mirar.
        </p>
      </div>
    </div>
  );
}
