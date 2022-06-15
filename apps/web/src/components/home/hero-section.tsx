const HeroSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj">
            Made by developers, for developers
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
            Your code
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
              <span className="relative"> snippets </span>
            </span>
            all in one place
          </h1>
          <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
            Easily create and organize your code snippets. Share them with others developers around the world.
          </p>

          <div className="relative inline-flex mt-10 group">
            <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200" />
            <a
              href="#early-access"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button"
            >
              Request Early Access
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
