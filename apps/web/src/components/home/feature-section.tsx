import {
  CloudDownloadIcon,
  FileSearch2Icon,
  GalleryVerticalEndIcon,
  InboxIcon,
  Share2Icon,
  SlidersVerticalIcon,
} from '@snipcode/front/icons';

const features = [
  {
    description: 'Organize related code snippets into folders the same way you manage your file on the computer.',
    icon: <GalleryVerticalEndIcon size={20} />,
    id: 'organize-snippets',
    title: 'Organize your snippets',
  },
  {
    description: 'Quickly find a code snippet in your whole directory and access it.',
    icon: <FileSearch2Icon size={20} />,
    id: 'find-snippets',
    title: 'Find your snippets',
  },
  {
    description: 'You can easily import all your code snippets from GitHub Gist to keep them all in one place.',
    icon: <CloudDownloadIcon size={20} />,
    id: 'import-snippets',
    title: 'Import from GitHub Gist',
  },
  {
    description: 'Share your code snippets with other developers. Give them the ability to interact and improve.',
    icon: <Share2Icon size={20} />,
    id: 'share-snippets',
    title: 'Share your snippets',
  },
  {
    description: 'For content creators, you can embed your snippet on a blog post or a post on social networks.',
    icon: <InboxIcon size={20} />,
    id: 'embed-snippets',
    title: 'Embed your snippets',
  },
  {
    description: 'Easily capture and save code snippets while you are browsing on the web.',
    icon: <SlidersVerticalIcon size={20} />,
    id: 'browser-extensions',
    title: 'Browser extensions',
  },
];

export const FeatureSection = () => {
  return (
    <div className="relative from-gray-50 to-gray-100">
      <div className="px-4 py-16 mx-auto sm:pt-48 sm:pb-24 lg:max-w-7xl lg:pt-48">
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl lg:text-center dark:text-white">
          What features to expect
        </h2>
        <p className="mx-auto mt-4 text-lg font-medium text-gray-400 lg:max-w-3xl lg:text-xl lg:text-center xs:text-center">
          We want to offer the best experience for managing your code snippets and discover some features that will
          bring your experience to a new level.
        </p>
        <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {features.map((feature) => (
            <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5" key={feature.id}>
              <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">{feature.icon}</div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
