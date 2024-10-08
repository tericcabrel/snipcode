'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Alert } from '@snipcode/front/components/alert';
import { Link } from '@snipcode/front/components/link';
import { Button } from '@snipcode/front/components/ui/button';
import { TextInput } from '@snipcode/front/forms/text-input';
import { GithubIcon, GoogleIcon, LoaderIcon } from '@snipcode/front/icons';
import { useSignupUser } from '@snipcode/front/services';

import { FORM_ERRORS } from '@/lib/constants';

const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 2;
const formSchema = yup.object().shape({
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], FORM_ERRORS.passwordNotMatch),
  email: yup.string().required(FORM_ERRORS.fieldRequired).email(FORM_ERRORS.emailInvalid),
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(MIN_NAME_LENGTH, FORM_ERRORS.minCharacters(MIN_NAME_LENGTH)),
  password: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(MIN_PASSWORD_LENGTH, FORM_ERRORS.minCharacters(MIN_PASSWORD_LENGTH)),
});

type FormValues = yup.InferType<typeof formSchema>;

export const SignupContainer = () => {
  const router = useRouter();
  const [signupError, setSignupError] = useState<string | null>(null);
  const { isLoading, signupUser } = useSignupUser();

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const handleSignup = async (values: FormValues) => {
    setSignupError(null);

    await signupUser({
      input: {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      onError: (errorMessage) => {
        setSignupError(errorMessage);
      },
      onSuccess: () => {
        router.push('/auth/signup-success');
      },
    });
  };

  return (
    <section className="relative py-6 sm:py-8 lg:py-12">
      <div className="relative px-4 mx-auto max-w-xl sm:px-6 lg:px-8">
        <div className="relative max-w-md mx-auto lg:max-w-xl">
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
                <h1 className="text-2xl font-bold text-gray-900 font-pj">Sign up to Snipcode</h1>

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

                <p className="mt-8 text-sm font-normal text-center text-gray-600">or sign up with email</p>
              </div>

              <FormProvider {...formMethods}>
                <form className="mt-8" onSubmit={formMethods.handleSubmit(handleSignup)}>
                  {signupError ? <Alert message={signupError} type="destructive" /> : null}

                  <TextInput label="Name" name="name" placeholder="John Doe" type="text" />

                  <TextInput label="Email" name="email" placeholder="teco@email.com" type="email" />

                  <TextInput
                    label="Password"
                    name="password"
                    placeholder={`Password (min. ${MIN_PASSWORD_LENGTH} characters)`}
                    type="password"
                  />

                  <TextInput
                    label="Confirm password"
                    name="confirmPassword"
                    placeholder={`Password (min. ${MIN_PASSWORD_LENGTH} characters)`}
                    type="password"
                  />

                  <Button className="mt-10 py-3 w-full" type="submit">
                    {isLoading ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Sign up
                  </Button>
                </form>
              </FormProvider>

              <p className="mt-5 text-base font-normal text-center text-gray-900">
                Already have an account?{' '}
                <Link className="font-bold rounded hover:underline" href="/signin" title="Sign in">
                  Sign in now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
