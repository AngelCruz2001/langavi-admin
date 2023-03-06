import styles from "@/styles/pages/admin.module.scss";

import {
  Card,
  CardHeader,
  Status,
  BackArrow,
  CardSection,
  Title,
  Description,
  List,
} from "@/components";
import { useRouter } from "next/router";

interface IOrderProps {
  pickImage: string;
}

const OrderDetail = (props: IOrderProps) => {
  // Get id from url
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div>
      <BackArrow backTo="ordenes" />
      <Card>
        <CardSection line={false}>
          <CardHeader style={{ display: "flex" }}>
            <Title>Orden #{orderId}</Title>
            <Status class={styles.right} status={0} />
          </CardHeader>
        </CardSection>

        <CardSection line={false}>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolor
            ut quos, magnam accusamus repellendus!
          </Description>
        </CardSection>
      </Card>
    </div>
  );
};

// justify-content: space-between;
export default OrderDetail;
