import { NextPage } from "next";
import {
  Card,
  CardHeader,
  CardSection,
  Table,
  Status,
  PaymentProcessor,
} from "@/components";
import { Fragment } from "react";
import { IOrders } from "@/interfaces/Orders.interface";
import { useRouter } from "next/router";

const orders: NextPage = () => {
  const router = useRouter();

  const orders: IOrders[] = [
    {
      _id: {
        $oid: "63bf35734eda33b77a72ef70",
      },
      orderNumber: "T53710248",
      clientId: {
        $oid: "63bf35734eda33b77a72ef6d",
      },
      shippingAddress: {
        firstName: "juan alejandro",
        lastName: "flores perez",
        address: "avenida cuauhtemoc 830, narvarte poniente",
        address2: "departamento 603",
        city: "benito juarez",
        estate: "ciudad de méxico",
        country: "méxico",
        zip: "3020",
        phone: "4621651299",
        _id: {
          $oid: "63bf35734eda33b77a72ef71",
        },
      },
      billingAddress: {
        firstName: "juan alejandro",
        lastName: "flores perez",
        address: "avenida cuauhtemoc 830, narvarte poniente",
        address2: "departamento 603",
        city: "benito juarez",
        estate: "ciudad de méxico",
        country: "méxico",
        zip: "3020",
        phone: "4621651299",
        _id: {
          $oid: "63bf35734eda33b77a72ef72",
        },
      },
      products: [
        {
          title: "chocolate blanco artesanal",
          variantName: "18g",
          slug: "chocolate_blanco_artesanal",
          image:
            "https://langavi-product-pictures.s3.amazonaws.com/chocolate_blanco_artesanal_18g_1663629800710.png",
          price: 270,
          quantity: 1,
          description: "Caja con 18 barras",
          _id: {
            $oid: "63bf35734eda33b77a72ef73",
          },
        },
        {
          title: "chocolate amargo 73% cacao",
          variantName: "18g",
          slug: "chocolate_amargo_73-cacao",
          image:
            "https://langavi-product-pictures.s3.amazonaws.com/chocolate_amargo_73-cacao_18g_1663629227098.png",
          price: 270,
          quantity: 1,
          description: "Caja con 18 barras",
          _id: {
            $oid: "63bf35734eda33b77a72ef74",
          },
        },
        {
          title: "chocolate de leche premium",
          variantName: "18g",
          slug: "chocolate_de-leche_premium",
          image:
            "https://langavi-product-pictures.s3.amazonaws.com/chocolate_de-leche_premium_18g_1663628487047.png",
          price: 270,
          quantity: 1,
          description: "Caja con 18 barras",
          _id: {
            $oid: "63bf35734eda33b77a72ef75",
          },
        },
        {
          title: "chocolate amargo premium",
          variantName: "18g",
          slug: "chocolate_amargo_premium",
          image:
            "https://langavi-product-pictures.s3.amazonaws.com/chocolate_amargo_premium_18g_1663627587138.png",
          price: 270,
          quantity: 1,
          description: "Caja con 18 barras",
          _id: {
            $oid: "63bf35734eda33b77a72ef76",
          },
        },
      ],
      numberOfItems: 4,
      subtotal: 1080,
      tax: {
        percent: "0.16",
        amount: "949.2",
        _id: {
          $oid: "63bf35734eda33b77a72ef77",
        },
      },
      total: 1080,
      paidAt: "11 de enero de 2023",
      transactionId: "1D903767N30929927",
      orderStatus: "preparando pedido para ser enviado",
      provider: "paypal",
      discounts: [],
      shippingPrice: 50,
    },
  ];

  const handleClickRow = (data: IOrders) => {
    const { $oid } = data._id;
    router.push({
      pathname: "/admin/orders/[orderId]",
      query: { orderId: $oid },
    });
  };

  return (
    <Card>
      <CardSection line={false}>
        <CardHeader>
          <h4>Ordenes</h4>
        </CardHeader>
      </CardSection>

      <CardSection line={false}>
        <Table
          headers={[
            "Orden",
            "Estado",
            "Artículos",
            "Dirección",
            "Total",
            "Proveedor",
          ]}
          proportion={["20%", "15%", "15%", "25%", "10%", "15%"]}
          centerRows={[false, true, false, false, true, true]}
        >
          <>
            {orders.map((order) => (
              <Table.Row
                key={order._id.$oid}
                onClick={() => handleClickRow(order)}
              >
                <Table.Cell>{order.orderNumber}</Table.Cell>
                <Table.Cell>
                  <Status
                    options={["Pendiente", "Enviado"]}
                    status={order.orderStatus === "Pendiente" ? 0 : 1}
                  />
                </Table.Cell>
                <Table.Cell>
                  {order.numberOfItems}{" "}
                  {order.numberOfItems > 1 ? "piezas" : "pieza"}
                </Table.Cell>
                <Table.Cell>{order.shippingAddress.address}</Table.Cell>
                <Table.Cell>{order.total}</Table.Cell>
                <Table.Cell>
                  <PaymentProcessor pickImage={"Stripe"} />
                </Table.Cell>
              </Table.Row>
            ))}
          </>
        </Table>
      </CardSection>
    </Card>
  );
};

export default orders;
