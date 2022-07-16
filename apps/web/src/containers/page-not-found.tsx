import { Icon } from '@sharingan/front';
import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div className="h-screen pt-16 pb-12 flex flex-col">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <a href="/" className="inline-flex">
            <Icon.Logo />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">404 Error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
            <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-6">
              <Link href="/">
                <a className="text-base font-medium text-blue-600 hover:text-blue-500">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <Link href="mailto:support@sharingan.dev">
            <a className="text-sm font-medium text-gray-500 hover:text-gray-600">Support</a>
          </Link>
          <span className="inline-block border-l border-gray-300" aria-hidden="true" />
          <Link href="https://github.com/tericcabrel/sharingan">
            <a
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Link>
          <span className="inline-block border-l border-gray-300" aria-hidden="true" />
          <Link href="https://twitter.com/sharingandev">
            <a
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default PageNotFound;
