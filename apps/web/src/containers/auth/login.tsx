import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Icon, TextInput, useLoginUser } from '@sharingan/front';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import PublicLayout from '@/components/layout/public/public-layout';
import { useAuth } from '@/hooks/authentication/use-auth';
import { FORM_ERRORS } from '@/utils/constants';

const formSchema = yup.object().shape({
  email: yup.string().required(FORM_ERRORS.fieldRequired).email(FORM_ERRORS.emailInvalid),
  password: yup.string().required(FORM_ERRORS.fieldRequired),
});

type FormValues = yup.InferType<typeof formSchema>;

const Login = () => {
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
                  <h1 className="text-2xl font-bold text-gray-900">Sign in for Sharingan</h1>

                  <div className="flex justify-between">
                    <Button color="white-gray" className="w-[45%]">
                      <Icon.Github />
                      <span className="ml-4">GitHub</span>
                    </Button>

                    <Button color="white-gray" className="w-[45%]">
                      <Icon.Google />
                      <span className="ml-4">Google</span>
                    </Button>
                  </div>

                  <p className="mt-8 text-sm font-normal text-center text-gray-600">or sign in with email</p>
                </div>

                <FormProvider {...formMethods}>
                  <form onSubmit={formMethods.handleSubmit(handleLogin)} className="mt-8">
                    {loginError && <Alert message={loginError} type="error" />}

                    <TextInput label="Email" type="email" name="email" placeholder="teco@email.com" />

                    <TextInput label="Password" type="password" name="password" />

                    <Button className="mt-10 py-3" type="submit" isLoading={isLoading}>
                      Sign in
                    </Button>
                  </form>
                </FormProvider>

                <p className="mt-5 text-base font-normal text-center text-gray-900">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup">
                    <a title="Sign in" className="font-bold rounded hover:underline">
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

export default Login;
