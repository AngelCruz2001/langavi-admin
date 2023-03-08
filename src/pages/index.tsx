import { IOrder } from '@/interfaces';
import { ShippingInfoEmail } from '../server/mails/templates/ShippingInfoEmail';



// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from 'next'
import { getOrder } from '@/server/helpers/orders';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const order = await getOrder('63bf35734eda33b77a72ef70');

  return {
    props: {
      order: JSON.parse(JSON.stringify(order))
    }
  }
}

export default function Home({ order }: { order: IOrder }) {
  return (
    <>
      <ShippingInfoEmail order={order} />
    </>
  );
}
