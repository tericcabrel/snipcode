import { NextSeo } from 'next-seo';
import Link from 'next/link';

import GithubIcon from '@/components/icons/github';
import GoogleIcon from '@/components/icons/google';
import PublicLayout from '@/components/layout/public/public-layout';

const Signin = () => {
  return (
    <PublicLayout>
      <NextSeo title="Sign in" />
      <section className="relative py-6 sm:py-8 lg:py-12">
        <div className="relative px-4 mx-auto max-w-xl sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto mt-10 lg:max-w-xl">
            <div className="absolute inset-x-1.5 top-8 -inset-y-4">
              <div
                className="w-full h-full mx-auto rotate-180 rounded-3xl opacity-90 blur-xl filter"
                style={{
                  background:
                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                }}
              />
            </div>

            <div className="relative overflow-hidden bg-white rounded-2xl lg:rounded-3xl">
              <div className="px-8 py-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 font-pj">Sign in for Sharingan</h1>

                  <button className="flex items-center justify-center w-full px-8 py-2 mt-6 text-base font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200">
                    <GithubIcon />
                    <span className="ml-4">Sign in with GitHub</span>
                  </button>

                  <button className="flex items-center justify-center w-full px-8 py-2 mt-6 text-base font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200">
                    <GoogleIcon />
                    <span className="ml-4">Sign in with Google</span>
                  </button>

                  <p className="mt-8 text-sm font-normal text-center text-gray-600">or sign in with email</p>
                </div>

                <form action="#" method="POST" className="mt-8">
                  <div>
                    <div className="mb-4">
                      <label htmlFor="email" className="text-base font-medium text-gray-900">
                        Email
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="teco@email.com"
                          className="block w-full px-4 py-2 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-lg caret-gray-900"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="text-base font-medium text-gray-900 font-pj">
                        Password
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password (min. 8 characters)"
                          className="block w-full px-4 py-2 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-lg caret-gray-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-8 mt-10 py-3 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-base font-normal text-center text-gray-900 font-pj">
                  Don&apos;t have an account?{' '}
                  <Link href="/sign-up">
                    <a
                      title="Sign in"
                      className="font-bold rounded hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Create an account now
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Signin;
