import { NextPage } from "next";
import { Card, CardHeader, CardSection, Table, Status } from "@/components";
import { Fragment } from "react";
import Image from "next/image";
const orders: NextPage = () => {
  const products = [
    {
      _id: "1",
      title: "Chocolate amargo 73% cacao",
      variantName: "35g",
      status: "Publicado",
      image:
        "https://langavi-product-pictures.s3.amazonaws.com/chocolate_amargo_73-cacao_35g_1663628932464.png",
      price: 100,
      quantity: 1,
    },
    {
      _id: "2",
      title: "Caja Chocolate amargo 73% cacao",
      variantName: "18g",
      status: "Oculto",
      image:
        "https://langavi-product-pictures.s3.amazonaws.com/chocolate_amargo_73-cacao_18g_1663629227098.png",
      price: 100,
      quantity: 123,
    },
  ];

  return (
    <Card>
      <CardSection line={false}>
        <CardHeader>
          <h4>Productos</h4>
        </CardHeader>
      </CardSection>

      <CardSection line={false}>
        <Table
          headers={["Nombre", "Precio", "Estatus", "Inventario"]}
          proportion={["40%", "10%", "20%", "30%"]}
          centerRows={[false, false, true, false]}
        >
          <>
            {products.map((product) => (
              <Fragment key={product._id}>
                <Table.Cell>
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      position: "relative",
                      marginRight: "1rem",
                    }}
                  >
                    <Image
                      fill
                      src={product.image}
                      alt={product.title}
                      style={{ marginRight: "1rem" }}
                    />
                  </div>
                  <p>
                    {product.title} - {product.variantName}
                  </p>
                </Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>
                  <Status status={1} />
                </Table.Cell>
                <Table.Cell>{product.quantity} en inventario</Table.Cell>
              </Fragment>
            ))}
          </>
        </Table>
      </CardSection>
    </Card>
  );
};

export default orders;
