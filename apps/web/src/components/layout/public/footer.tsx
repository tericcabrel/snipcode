import { Icon } from '@sharingan/ui';

const socialIcons = [
  {
    icon: <Icon.Github />,
    link: 'https://github.com/tericcabrel/sharingan',
    name: 'GitHub',
    target: '_blank',
  },
  {
    icon: <Icon.Twitter />,
    link: 'https://twitter.com/sharinganapp',
    name: 'Twitter',
    target: '_blank',
  },
  {
    icon: <Icon.ProductHunt />,
    link: '#',
    name: 'Product Hunt',
    target: '_self',
  },
];

const policies = [
  {
    id: 'privacy-policy',
    link: '/',
    text: 'Privacy Policy',
  },
  {
    id: 'terms',
    link: '/',
    text: 'Terms & Conditions',
  },
];

const PublicFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gray-50 sm:pt-16 lg:pt-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between mt-14 lg:mt-24">
          <div className="xs:flex xs:justify-center">
            <Icon.Logo />
          </div>

          <ul className="flex items-center justify-center mt-8 space-x-3 sm:mt-12 lg:justify-end lg:mt-0">
            {socialIcons.map((socialIcon) => (
              <li key={socialIcon.name}>
                <a
                  href={socialIcon.link}
                  target={socialIcon.target}
                  title={socialIcon.name}
                  className="inline-flex items-center justify-center w-6 h-6 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  rel="noopener noreferrer"
                >
                  {socialIcon.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className="mt-10 border-gray-300" />

        <div className="mt-10 md:flex md:items-center md:justify-between">
          <ul className="flex items-center justify-center space-x-6 md:order-2 md:justify-end">
            {policies.map((policy) => (
              <li key={policy.id}>
                <a
                  href={policy.link}
                  className="text-base font-normal text-gray-600 transition-all duration-200 font-pj hover:text-gray-900"
                >
                  {policy.text}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-base font-normal text-center text-gray-600 md:text-left md:mt-0 md:order-1">
            © Copyright {year}, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
