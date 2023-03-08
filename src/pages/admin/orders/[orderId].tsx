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
  Button,
  Modal,
  Menu,
} from "@/components";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface IOrderProps {}

const OrderDetail = (props: IOrderProps) => {
  // Get id from url
  const router = useRouter();
  const { orderId } = router.query;

  const options = ["Enviado", "Entregado", "Preparando"];

  const shippingAddress = {
    firstName: "juan alejandro",
    lastName: "flores perez",
    address: "avenida cuauhtemoc 830, narvarte poniente",
    address2: "departamento 603",
    city: "benito juarez",
    estate: "ciudad de méxico",
    country: "méxico",
    zip: "3020", 
    phone: "4621651299",
  };

  const shippingAddressInformationTransformed = useMemo(
    () => [
      {
        label: "Nombre",
        value: shippingAddress.firstName + " " + shippingAddress.lastName,
      },
      {
        label: "Dirección",
        value: shippingAddress.address,
      },
      {
        label: "Dirección 2",
        value: shippingAddress.address2,
      },
      {
        label: "Ciudad",
        value: shippingAddress.city,
      },
      {
        label: "Estado",
        value: shippingAddress.estate,
      },
      {
        label: "País",
        value: shippingAddress.country,
      },
      {
        label: "Código postal",
        value: shippingAddress.zip,
      },
      {
        label: "Teléfono",
        value: shippingAddress.phone,
      },
    ],
    [shippingAddress]
  );

  return (
    <div>
      <BackArrow backTo="ordenes" />
      <Card>
        <CardSection line={false}>
          <CardHeader
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Title>Orden #{orderId}</Title>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <Status status={0} clickeable options={options} />
              <Menu />
            </div>
          </CardHeader>
        </CardSection>

        <CardSection line={false}>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolor
            ut quos, magnam accusamus repellendus!
          </Description>

          <List
            listTitle="Detalles"
            styles={{ marginTop: "1.5rem" }}
            data={shippingAddressInformationTransformed}
          />
        </CardSection>
      </Card>

      <Card>
        <CardSection line={false}>
          <CardHeader>
            <Title>Productos</Title>
          </CardHeader>
        </CardSection>

        <CardSection line={false}></CardSection>
      </Card>
    </div>
  );
};

// justify-content: space-between;
export default OrderDetail;
