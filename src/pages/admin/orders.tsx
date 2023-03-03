import { NextPage } from "next";
import { Card, CardHeader, CardSection, Table } from "@/components";
import { Fragment } from "react";

const orders: NextPage = () => {
  const products = [
    {
      _id: "1",
      title: "Producto 1",
      variantName: "35g",
      image:
        "https://langavi-product-pictures.s3.amazonaws.com/chocolate_amargo_73-cacao_35g_1663628932464.png",
      price: 100,
      quantity: 1,
    },
    {
      _id: "2",
      title: "Producto 2",
      variantName: "18g",
      image:
        "https://langavi-product-pictures.s3.amazonaws.com/chocolate_amargo_73-cacao_18g_1663629227098.png",
      price: 100,
      quantity: 1,
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
          headers={["Nombre", "Precio", "Inventario"]}
          proportion={["30%", "30%", "40%"]}
        >
          <>
            {products.map((product) => (
              <Fragment key={product._id}>
                <Table.Cell>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ marginRight: "1rem" }}
                  />
                  <p>
                    {product.title} - {product.variantName}
                  </p>
                </Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
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
