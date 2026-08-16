import { PropsWithChildren } from 'react'
import classes from './styles.module.css'

export default function Container({ children }: PropsWithChildren) {
  return <div className={classes.container}>{children}</div>
}
