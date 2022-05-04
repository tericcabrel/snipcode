import type { NextPage } from 'next';
import { useState } from 'react';
import LogoIcon from '@/components/icons/logo';

const HomePage: NextPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="overflow-x-hidden bg-gray-50">
      <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0">
              <a
                href="/"
                title=""
                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
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

            <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
              <a
                href="/"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Experts{' '}
              </a>

              <a
                href="/"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Community Groups{' '}
              </a>

              <a
                href="/"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Support{' '}
              </a>
            </div>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <a
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Login{' '}
              </a>

              <a
                href="/"
                title=""
                className="
                            inline-flex
                            items-center
                            justify-center
                            px-5
                            py-2
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                            transition-all
                            duration-200
                            bg-transparent
                            border border-gray-900
                            rounded-xl
                            font-pj
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-gray-900 hover:text-white
                            focus:bg-gray-900 focus:text-white
                        "
                role="button"
              >
                Join community
              </a>
            </div>
          </div>
          {isExpanded && (
            <nav>
              <div className="px-1 py-8">
                <div className="grid gap-y-7">
                  <a
                    href="/"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    {' '}
                    Experts{' '}
                  </a>

                  <a
                    href="/"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    {' '}
                    Community Groups{' '}
                  </a>

                  <a
                    href="/"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    {' '}
                    Support{' '}
                  </a>

                  <a
                    href="/"
                    title=""
                    className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    {' '}
                    Login{' '}
                  </a>

                  <a
                    href="/"
                    title=""
                    className="
                                  inline-flex
                                  items-center
                                  justify-center
                                  px-5
                                  py-2
                                  text-base
                                  font-semibold
                                  leading-7
                                  text-gray-900
                                  transition-all
                                  duration-200
                                  bg-transparent
                                  border border-gray-900
                                  rounded-xl
                                  font-pj
                                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                  hover:bg-gray-900 hover:text-white
                                  focus:bg-gray-900 focus:text-white
                              "
                    role="button"
                  >
                    Join community
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <p className="inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj">
              Made by Developers, for Developers
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
              Quality
              <span className="relative">
                <svg
                  className="absolute inset-x-0 bottom-0 w-full h-auto mx-auto"
                  viewBox="0 0 259 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.14689 13.6626C46.6856 6.89549 88.3011 4.11963 133.218 3.29473C166.412 2.68514 203.253 1.30776 236.126 5.12509C242.71 5.4987 248.725 6.75385 256.089 8.20337"
                    stroke="url(#paint0_linear_116_3568)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_116_3568"
                      x1="22.5697"
                      y1="5.28618"
                      x2="54.2445"
                      y2="82.5027"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#D9B227" />
                      <stop offset="1" stopColor="#FD4141" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="relative"> resources </span>
              </span>
              shared by the community
            </h1>
            <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
            </p>

            <div className="relative inline-flex mt-10 group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>

              <a
                href="/"
                title=""
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Get access to 4,958 resources
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="relative from-gray-50 to-gray-100">
        <div className="px-4 py-16 mx-auto sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl lg:text-center dark:text-white">
            Build like the best
          </h2>
          <p className="mx-auto mt-4 text-lg font-medium text-gray-400 lg:max-w-3xl lg:text-xl lg:text-center">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit jactum velissis
            meldo...
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
                  ></path>
                </svg>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Excronamtal belsom</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s.
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
                  ></path>
                </svg>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Contenus-eweru tapinum</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
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
                  ></path>
                </svg>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Ramuso Creston</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Parasums elegatuom</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
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
                  ></path>
                </svg>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Zaru restamu ovaristom</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
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
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  ></path>
                </svg>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Prunum salsomus</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard tool
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 font-pj">Join ⚡️ Sharingan community</h2>
            <p className="max-w-md mx-auto mt-5 text-base font-normal text-gray-600 font-pj">
              With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
            </p>
          </div>

          <div className="relative max-w-lg mx-auto mt-14">
            <div className="absolute -inset-x-2 -inset-y-5">
              <div
                className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
                style={{
                  background:
                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                }}
              ></div>
            </div>

            <form action="#" method="POST" className="relative">
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter your email address"
                className="block w-full px-5 py-6 text-base font-normal text-black placeholder-gray-600 bg-white border border-gray-300 rounded-xl focus:border-black focus:ring-1 focus:ring-black font-pj focus:outline-none"
                required
              />

              <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-3">
                <button
                  type="submit"
                  className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    w-full
                                    px-8
                                    py-4
                                    text-base
                                    font-bold
                                    text-white
                                    transition-all
                                    duration-200
                                    bg-gray-900
                                    border border-transparent
                                    sm:w-auto sm:py-3
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                    font-pj
                                    hover:bg-opacity-90
                                    rounded-xl
                                "
                >
                  Get started now
                </button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-sm font-normal text-center text-gray-500 font-pj">
            No ads. No trails. No commitments
          </p>
        </div>
      </section>

      <footer className="py-12 bg-gray-50 sm:pt-16 lg:pt-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between mt-14 lg:mt-24">
            <div>
              <LogoIcon />
            </div>

            <ul className="flex items-center justify-center mt-8 space-x-3 sm:mt-12 lg:justify-end lg:mt-0">
              <li>
                <a
                  href="/"
                  target="_blank"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="/"
                  target="_blank"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="/"
                  target="_blank"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="/"
                  target="_blank"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener"
                >
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <hr className="mt-10 border-gray-300" />

          <div className="mt-10 md:flex md:items-center md:justify-between">
            <ul className="flex items-center justify-center space-x-6 md:order-2 md:justify-end">
              <li>
                <a
                  href="/"
                  title=""
                  className="text-base font-normal text-gray-600 transition-all duration-200 font-pj hover:text-gray-900"
                >
                  {' '}
                  Privacy Policy{' '}
                </a>
              </li>

              <li>
                <a
                  href="/"
                  title=""
                  className="text-base font-normal text-gray-600 transition-all duration-200 font-pj hover:text-gray-900"
                >
                  {' '}
                  Terms & Conditions{' '}
                </a>
              </li>
            </ul>

            <p className="mt-8 text-base font-normal text-center text-gray-600 md:text-left md:mt-0 md:order-1 font-pj">
              © Copyright 2021, All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
