'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@snipcode/front/components/alert';
import { Button } from '@snipcode/front/components/ui/button';
import { TextInput } from '@snipcode/front/forms/text-input';
import { GithubIcon, GoogleIcon, LoaderIcon } from '@snipcode/front/icons';
import { useLoginUser } from '@snipcode/front/services';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAuth } from '@/hooks/authentication/use-auth';
import { FORM_ERRORS } from '@/lib/constants';

const formSchema = yup.object().shape({
  email: yup.string().required(FORM_ERRORS.fieldRequired).email(FORM_ERRORS.emailInvalid),
  password: yup.string().required(FORM_ERRORS.fieldRequired),
});

type FormValues = yup.InferType<typeof formSchema>;

export const SignInContainer = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { redirectToDashboard, saveToken } = useAuth();
  const { authenticateUser, isLoading } = useLoginUser();

  const formMethods = useForm<FormValues>({
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });

  const handleLogin = async (values: FormValues) => {
    await authenticateUser({
      input: {
        email: values.email,
        password: values.password,
      },
      onError: (errorMessage) => {
        setLoginError(errorMessage);
      },
      onSuccess: async (token) => {
        saveToken(token);

        await redirectToDashboard();
      },
    });
  };

  return (
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
                <h1 className="text-2xl font-bold text-gray-900">Sign in to Snipcode</h1>

                <div className="grid grid-cols-2 mt-8 gap-4">
                  <Button variant="secondary">
                    <GithubIcon />
                    <span className="ml-4">GitHub</span>
                  </Button>

                  <Button variant="secondary">
                    <GoogleIcon />
                    <span className="ml-4">Google</span>
                  </Button>
                </div>

                <p className="mt-8 text-sm font-normal text-center text-gray-600">or sign in with email</p>
              </div>

              <FormProvider {...formMethods}>
                <form className="mt-8" onSubmit={formMethods.handleSubmit(handleLogin)}>
                  {loginError && <Alert message={loginError} type="destructive" />}

                  <TextInput label="Email" name="email" placeholder="teco@email.com" type="email" />

                  <TextInput label="Password" name="password" type="password" />

                  <Button className="mt-10 py-3 w-full" type="submit">
                    {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in
                  </Button>
                </form>
              </FormProvider>

              <p className="mt-5 text-base font-normal text-center text-gray-900">
                Don&apos;t have an account?{' '}
                <Link className="font-bold rounded hover:underline" href="/signup" title="Sign in">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
