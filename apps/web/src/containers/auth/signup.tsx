import { yupResolver } from '@hookform/resolvers/yup';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/common/form/button';
import TextInput from '@/components/common/form/text-input';
import GithubIcon from '@/components/icons/github';
import GoogleIcon from '@/components/icons/google';
import PublicLayout from '@/components/layout/public/public-layout';
import { FORM_ERRORS } from '@/utils/constants';

const MIN_PASSWORD_LENGTH = 8;
const formSchema = yup.object().shape({
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], FORM_ERRORS.passwordNotMatch),
  email: yup.string().required(FORM_ERRORS.fieldRequired).email(FORM_ERRORS.emailInvalid),
  password: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(MIN_PASSWORD_LENGTH, FORM_ERRORS.minCharacters(MIN_PASSWORD_LENGTH)),
});

type FormValues = yup.InferType<typeof formSchema>;

const Signup = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });

  const handleSignup = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <PublicLayout>
      <NextSeo title="Sign up" />

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
                  <h1 className="text-3xl font-bold text-gray-900 font-pj">Sign up for Sharingan</h1>

                  <Button color="white-gray">
                    <GithubIcon />
                    <span className="ml-4">Sign up with GitHub</span>
                  </Button>

                  <Button color="white-gray">
                    <GoogleIcon />
                    <span className="ml-4">Sign up with Google</span>
                  </Button>

                  <p className="mt-8 text-sm font-normal text-center text-gray-600">or sign up with email</p>
                </div>

                <FormProvider {...formMethods}>
                  <form onSubmit={formMethods.handleSubmit(handleSignup)} className="mt-8">
                    <TextInput label="Email" type="email" name="email" placeholder="teco@email.com" />

                    <TextInput
                      label="Password"
                      type="password"
                      name="password"
                      placeholder={`Password (min. ${MIN_PASSWORD_LENGTH} characters)`}
                    />

                    <TextInput
                      label="Confirm password"
                      type="password"
                      name="confirmPassword"
                      placeholder={`Password (min. ${MIN_PASSWORD_LENGTH} characters)`}
                    />

                    <Button className="mt-10 py-3" type="submit">
                      Sign up
                    </Button>
                  </form>
                </FormProvider>

                <p className="mt-5 text-base font-normal text-center text-gray-900 font-pj">
                  Already have an account?{' '}
                  <Link href="/sign-in">
                    <a
                      title="Sign in"
                      className="font-bold rounded hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                    >
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
