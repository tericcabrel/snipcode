import Link from 'next/link';
import React from 'react';

type Props = {
  ctaLabel: string;
  descriptionElement: React.ReactNode;
  redirectLink: string;
  title: string;
};

export const AuthAlert = ({ ctaLabel, descriptionElement, redirectLink, title }: Props) => {
  return (
    <div className="relative mx-auto max-w-7xl flex justify-center items-center auth-alert-container">
      <div className="text-center">
        <h1 className="mt-2 font-extrabold text-gray-900 tracking-tight sm:text-3xl">{title}</h1>
        <p className="my-8 text-base text-gray-600">{descriptionElement}</p>
        <div className="mt-6">
          <div className="relative inline-flex mt-10 group">
            <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200" />
            <Link
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              href={redirectLink}
              role="button"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
