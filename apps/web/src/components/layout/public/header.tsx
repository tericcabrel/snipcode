import Link from 'next/link';
import Image from 'next/image';
import GithubIcon from '@/components/icons/github';

const PublicHeader = () => {
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link href="/">
                <a className="flex-shrink-0">
                  <Image className="h-8 w-8" src="/images/logo.png" width={32} height={32} alt="Logo" />
                </a>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/">
                    <a className="navbar-link" data-testid="lnk-home">
                      Home
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6 xs:hidden sm:hidden md:block">
                <Link href="https://github.com/tericcabrel/sharingan">
                  <a className="p-1 rounded-full text-gray-200 hover:text-gray-200" target="_blank" rel="noreferrer">
                    <span className="sr-only">View github</span>
                    <GithubIcon />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PublicHeader;