import type { JSX } from 'react';
import { Link } from '@remix-run/react';
import classes from '@/styles/not-found-page.module.scss';
import pageNotFoundImg from '@/assets/images/page-not-found.png';

export function NotFoundPage(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Page not found</h1>
      <img src={pageNotFoundImg} alt="Page not found" />
      <Link to="/main" className={classes.homeLink}>
        Go home
      </Link>
    </div>
  );
}

export default NotFoundPage;
