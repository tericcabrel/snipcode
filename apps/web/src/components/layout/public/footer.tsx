import Link from 'next/link';

const PublicFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white shadow relative">
      <div className="w-full flex items-center justify-between m-auto text-gray-800 text-sm md:flex-row max-w-6xl h-16 xs:px-2 sm:px-6">
        <div className="xs:text-xs">© Copyright {year}. Sharingan.</div>
        <div className="flex items-center xs:justify-end xs:w-2/5">
          <Link href="https://github.com/tericcabrel/sharingan/">
            <a className="w-6 mx-1" target="_blank" rel="noreferrer nopener" aria-label="View GitHub organization">
              GitHub
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
