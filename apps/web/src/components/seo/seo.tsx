import { DefaultSeo } from 'next-seo';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const GlobalSeo = () => {
  const description =
    'Easily create and organize your code snippets. Share them with others developers around the world.';
  const title = 'Sharingan';

  return (
    <DefaultSeo
      additionalMetaTags={[
        { content: 'Eric Cabrel TIOGO', property: 'author' },
        {
          content: 'code snippets, sharing code, open-source, coding utilities, snippet tools',
          property: 'keywords',
        },
      ]}
      canonical={baseUrl}
      description={description}
      openGraph={{
        description,
        images: [
          {
            alt: 'Homepage image alt',
            height: 720,
            url: `${baseUrl}/assets/og.png`,
            width: 1280,
          },
        ],
        locale: 'en-US',
        site_name: title,
        title,
        type: 'website',
        url: baseUrl,
      }}
      title={title}
      titleTemplate="Sharingan - %s"
      twitter={{
        cardType: 'summary_large_image',
        handle: '@sharinganapp',
        site: '@sharinganapp',
      }}
    />
  );
};

export { GlobalSeo };
