import { useRouter } from "next/router";

interface IOrderProps {
  pickImage: string;
}

const OrderDetail = (props: IOrderProps) => {
  // Get id from url
  const router = useRouter();
  const { orderId } = router.query;

  return <h1>{orderId}</h1>;
};

export default OrderDetail;
