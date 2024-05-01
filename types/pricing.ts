export type PricingTierFrequency = {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
};

export type PricingTier = {
  name: string;
  id: string;
  href: string;
  discountPrice: Record<string, string>;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  cta: string;
  soldOut?: boolean;
};
