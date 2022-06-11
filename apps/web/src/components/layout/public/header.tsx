import { useState } from 'react';

import GithubIcon from '@/components/icons/github';
import LogoIcon from '@/components/icons/logo';

const PublicHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className="relative py-4 md:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
              <LogoIcon />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
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

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
              title=""
              className="text-base hidden font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              Login
            </a>
            <a
              href="https://github.com/tericcabrel/sharingan"
              className="inline-flex items-center justify-center px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
              rel="noopener noreferrer"
              role="button"
              target="_blank"
            >
              <GithubIcon /> <span className="ml-3">Star on GitHub</span>
            </a>
          </div>
        </div>
        {isExpanded && (
          <nav>
            <div className="px-1 py-8">
              <div className="grid gap-y-7">
                <a
                  href="https://github.com/tericcabrel/sharingan"
                  className="inline-flex items-center justify-center px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
                  rel="noopener noreferrer"
                  role="button"
                  target="_blank"
                >
                  Join community
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
