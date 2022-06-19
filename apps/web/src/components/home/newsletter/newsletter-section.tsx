import NewsletterForm from '@/components/home/newsletter/newsletter-form';

const NewsletterSection = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20" id="early-access">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900">Join the early access program ⚡</h2>
          <p className="max-w-md mx-auto mt-5 text-base font-normal text-gray-600 font-pj">
            Join the newsletter to get notified when the application will be live and further updates.
          </p>
        </div>

        <div className="relative max-w-lg mx-auto mt-14">
          <div className="absolute -inset-x-2 -inset-y-5">
            <div
              className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
              style={{
                background:
                  'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
              }}
            />
          </div>
          <NewsletterForm />
        </div>

        <p className="mt-6 text-sm font-normal text-center text-gray-500 font-pj">
          No ads, No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
