import classes from './ErrorBlock.module.css'

type ErrorBlockProps = {
  title: string;
  message: string;
}

export default function ErrorBlock({ title, message }: ErrorBlockProps) {
  return (
    <div className={classes['error-block']}>
      <div className={classes['error-block-icon']}>!</div>
      <div className={classes['error-block-text']}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
