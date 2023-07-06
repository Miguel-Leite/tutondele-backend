// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51NLEpoA6lOb1XidInurh2hxURxxdWpQHxUpTykEFOU8qtGgG1x1jzki1dzVFDv4zaFG2D4ww4DxXJGQE9Jr3Ucg400IU9SzunV',
);

interface Product {
  id: string;
  object: string;
  active: boolean;
  attributes: any[];
  created: number;
  default_price?: any;
  description?: any;
  images: any[];
  livemode: boolean;
  metadata: Metadata;
  name: string;
  package_dimensions?: any;
  shippable?: any;
  statement_descriptor?: any;
  tax_code?: any;
  type: string;
  unit_label?: any;
  updated: number;
  url?: any;
}

interface Metadata {
  organizationsId: string;
}

interface StripeRequest {
  name: string;
  usdAmount: number;
  organizationsId: string;
}

interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount?: any;
  livemode: boolean;
  lookup_key?: any;
  metadata: Metadata;
  nickname?: any;
  product: string;
  recurring?: any;
  tax_behavior: string;
  tiers_mode?: any;
  transform_quantity?: any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

interface StripeResponse {
  product: Product;
  price: Price;
  link: string;
}

export async function createProduct({
  name,
  organizationsId,
  usdAmount,
}: StripeRequest): Promise<StripeResponse> {
  const exchangeRate = 794.5;
  const value = usdAmount / exchangeRate;

  // Cria um plano de assinatura no Stripe
  const plan = await stripe.plans.create({
    nickname: name,
    amount: Math.round(value),
    currency: 'usd',
    interval: 'month', // Define o intervalo de cobrança para mensal
    interval_count: 12, // Define a quantidade de cobranças para 12 (1 ano)
    product: {
      name,
      type: 'service',
      metadata: {
        organizationsId,
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.id, // Utiliza o ID do plano de assinatura
        quantity: 1,
      },
    ],
    mode: 'subscription', // Altera o modo para 'subscription'
    success_url: 'http://localhost:5173/dashboard/pagamentos/sucesso',
    cancel_url: 'http://localhost:5173/dashboard/estudantes',
  });

  const paymentLink = session.url;

  return { product: plan.product, price: plan, link: paymentLink };
}
