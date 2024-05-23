export type NewsletterOption = {
  apiKey: string;
  formId: string;
};

export type SubscribeInput = {
  api_key: string;
  email: string;
  tags: string[];
};

export type SubscribeData = {
  subscription: {
    created_at: string;
    id: number;
    referrer: string | null;
    source: string | null;
    state: string;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
    };
  };
};
