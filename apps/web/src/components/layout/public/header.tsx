import { Icon } from '@sharingan/front';
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
            <a href="/" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
              <Icon.Logo />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900" onClick={() => setIsExpanded(!isExpanded)} aria-expanded>
              {!isExpanded && (
                <span aria-hidden="true">
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </span>
              )}

              {isExpanded && (
                <span aria-hidden="true">
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              )}
            </button>
          </div>

          <nav className="hidden lg:items-center lg:ml-16 lg:mr-auto lg:space-x-10 lg:flex">
            <Link href="/snippets">
              <a
                title="Browse code snippets"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
              >
                Snippets
              </a>
            </Link>

            <Link href="/resources">
              <a
                title="Resources"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
              >
                Resources
              </a>
            </Link>

            <Link href="/blog">
              <a
                title="Blog"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
              >
                Blog
              </a>
            </Link>
          </nav>

          <nav className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-10">
            <Link href="/signin">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                title="Sign in"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded font-pj hover:text-opacity-50"
                onClick={redirectToSignInIfAuthenticated}
              >
                Sign in
              </a>
            </Link>

            <Link href="/signup">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                title="Get started"
                className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj"
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
                  href="/snippets"
                  title="Browse code snippets"
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                >
                  Snippets
                </a>

                <a
                  href="/resources"
                  title="Resources"
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                >
                  Resources
                </a>

                <a
                  href="/blog"
                  title="Blog"
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                >
                  Blog
                </a>

                <Link href="/signin">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    title="Sign in"
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50"
                    onClick={redirectToSignInIfAuthenticated}
                  >
                    Sign in
                  </a>
                </Link>

                <Link href="/signup">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    title="Get started"
                    className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600"
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

export default PublicHeader;
