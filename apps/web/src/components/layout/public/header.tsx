import { LogoIcon } from '@sharingan/front/icons';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

import { useAuth } from '@/hooks/authentication/use-auth';

const PublicHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { redirectToDashboard, redirectToSignin, redirectToSignup, user } = useAuth();

  const redirectToSignInIfAuthenticated = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (user?.email) {
      await redirectToDashboard();

      return;
    }

    return redirectToSignin();
  };

  const redirectToSignupIfAuthenticated = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (user?.email) {
      await redirectToDashboard();

      return;
    }

    return redirectToSignup();
  };

  return (
    <header className="relative py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2" href="/">
              <LogoIcon />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button className="text-gray-900" type="button" aria-expanded onClick={() => setIsExpanded(!isExpanded)}>
              {!isExpanded && (
                <span aria-hidden="true">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </span>
              )}

              {isExpanded && (
                <span aria-hidden="true">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </span>
              )}
            </button>
          </div>

          <nav className="hidden lg:items-center lg:ml-16 lg:mr-auto lg:space-x-10 lg:flex">
            <Link href="/snippets">
              <a
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
                title="Browse code snippets"
              >
                Snippets
              </a>
            </Link>

            <Link href="/resources">
              <a
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
                title="Resources"
              >
                Resources
              </a>
            </Link>

            <Link href="/blog">
              <a
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
                title="Blog"
              >
                Blog
              </a>
            </Link>
          </nav>

          <nav className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-10">
            <Link href="/signin">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
                title="Sign in"
                onClick={redirectToSignInIfAuthenticated}
              >
                Sign in
              </a>
            </Link>

            <Link href="/signup">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj"
                title="Get started"
                onClick={redirectToSignupIfAuthenticated}
              >
                Get started
              </a>
            </Link>
          </nav>
        </div>

        {isExpanded && (
          <nav>
            <div className="px-1 py-8">
              <div className="grid gap-y-7">
                <a
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                  href="/snippets"
                  title="Browse code snippets"
                >
                  Snippets
                </a>

                <a
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                  href="/resources"
                  title="Resources"
                >
                  Resources
                </a>

                <a
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                  href="/blog"
                  title="Blog"
                >
                  Blog
                </a>

                <Link href="/signin">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                    title="Sign in"
                    onClick={redirectToSignInIfAuthenticated}
                  >
                    Sign in
                  </a>
                </Link>

                <Link href="/signup">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600"
                    title="Get started"
                    onClick={redirectToSignupIfAuthenticated}
                  >
                    Get started
                  </a>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export { PublicHeader };
