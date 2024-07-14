import Link from 'next/link';

type Props = {
  error: Error;
  onReset: () => void;
};

export const ErrorContent = ({ error, onReset }: Props) => {
  return (
    <div className="h-96 flex flex-col">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">An error occurred</p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">{error.message}</h1>
            <p className="mt-2 text-base text-gray-500">Please contact the support if the error persist</p>
            <div className="mt-6">
              <button className="text-base font-medium text-red-600 hover:text-red-500" onClick={onReset}>
                Try again<span aria-hidden="true"> &#9862;</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <Link className="text-sm font-medium text-gray-500 hover:text-gray-600" href="mailto:contact@snipcode.dev">
            Support
          </Link>
          <span aria-hidden="true" className="inline-block border-l border-gray-300" />
          <Link
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
            href="https://github.com/tericcabrel/snipcode"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          <span aria-hidden="true" className="inline-block border-l border-gray-300" />
          <Link
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
            href="https://twitter.com/snipcode_dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </Link>
        </nav>
      </footer>
    </div>
  );
};
