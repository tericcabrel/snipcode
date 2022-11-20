import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@sharingan/front/components/alert';
import { Link } from '@sharingan/front/components/link';
import { Button } from '@sharingan/front/forms/button';
import { TextInput } from '@sharingan/front/forms/text-input';
import { GithubIcon, GoogleIcon } from '@sharingan/front/icons';
import { useSignupUser } from '@sharingan/front/services';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { PublicLayout } from '@/components/layout/public/public-layout';
import { FORM_ERRORS } from '@/utils/constants';

const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 2;
const formSchema = yup.object().shape({
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], FORM_ERRORS.passwordNotMatch),
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

const Signup = () => {
  const router = useRouter();
  const [signupError, setSignupError] = useState<string | null>(null);
  const { isLoading, signupUser } = useSignupUser();

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const handleSignup = async (values: FormValues) => {
    console.log(values);

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
      onSuccess: async () => {
        await router.push('/auth/signup-success');
      },
    });
  };

  return (
    <PublicLayout>
      <NextSeo title="Sign up" />

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
                  <h1 className="text-2xl font-bold text-gray-900 font-pj">Sign up for Sharingan</h1>

                  <div className="flex justify-between">
                    <Button className="w-[47%]" color="white-gray">
                      <GithubIcon />
                      <span className="ml-4">GitHub</span>
                    </Button>

                    <Button className="w-[47%]" color="white-gray">
                      <GoogleIcon />
                      <span className="ml-4">Google</span>
                    </Button>
                  </div>

                  <p className="mt-8 text-sm font-normal text-center text-gray-600">or sign up with email</p>
                </div>

                <FormProvider {...formMethods}>
                  <form className="mt-8" onSubmit={formMethods.handleSubmit(handleSignup)}>
                    {signupError && <Alert message={signupError} type="error" />}

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

                    <Button className="mt-10 py-3" isLoading={isLoading} type="submit">
                      Sign up
                    </Button>
                  </form>
                </FormProvider>

                <p className="mt-5 text-base font-normal text-center text-gray-900">
                  Already have an account?{' '}
                  <Link href="/signin">
                    <a className="font-bold rounded hover:underline" title="Sign in">
                      Sign in now
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

export default Signup;
