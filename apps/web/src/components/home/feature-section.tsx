const FeatureSection = () => {
  return (
    <div className="relative from-gray-50 to-gray-100">
      <div className="px-4 py-16 mx-auto sm:pt-48 sm:pb-24 lg:max-w-7xl lg:pt-48">
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl lg:text-center dark:text-white">
          What features to expect
        </h2>
        <p className="mx-auto mt-4 text-lg font-medium text-gray-400 lg:max-w-3xl lg:text-xl lg:text-center xs:text-center">
          We want to offer the best experience for managing your code snippets, discover the some features that will
          bring your experience into a new level.
        </p>
        <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-8 w-8 dark:text-white rounded-full p-1.5 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Organize Snippets</h3>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                Organize your similar code snippets into folder the same way you manage your file on the computer.
              </p>
            </div>
          </div>
          <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-8 w-8 dark:text-white rounded-full p-1.5 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Find your snippets</h3>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                Quickly find a code snippet in your whole directory and access it.
              </p>
            </div>
          </div>
          <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-8 w-8 dark:text-white rounded-full p-1.5 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Import from GitHub Gist</h3>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                You can easily import all your code snippets from GitHub Gist to keep them all in one place.
              </p>
            </div>
          </div>
          <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-8 w-8 dark:text-white rounded-full p-1.5 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-5 text-black"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Share your snippets</h3>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                Share your code snippets with others developers. Give them ability to interact and improve.
              </p>
            </div>
          </div>
          <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-8 w-8 dark:text-white rounded-full p-1.5 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Embed your snippets</h3>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                For content creators, you can embed your snippet on a blog post or a post on social network.
              </p>
            </div>
          </div>
          <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-8 w-8 dark:text-white rounded-full p-1.5 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Browser extensions</h3>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                Easily capture and save code snippets while you are browsing on the web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FeatureSection };
