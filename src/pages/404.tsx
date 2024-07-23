import type { JSX } from 'react';
import classes from '@/styles/not-found-page.module.scss';
import pageNotFoundImg from '@/assets/images/page-not-found.png';
import Link from 'next/link';
import Image from 'next/image';

export function NotFoundPage(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Page not found</h1>
      <Image src={pageNotFoundImg} alt="Page not found" />
      <Link href="/" className={classes.homeLink}>
        Go home
      </Link>
    </div>
  );
}

export default NotFoundPage;
