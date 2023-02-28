import { Card } from "@/components";
import { NextPage } from "next";
import { CardSection } from "../../components/card/CardSection";

const orders: NextPage = () => {
  return (
    <Card>
      <CardSection>
        <h1>Orders</h1>
      </CardSection>
    </Card>
  );
};

export default orders;
