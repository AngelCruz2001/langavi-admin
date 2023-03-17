import { NextPage } from "next";
import {
  Card,
  CardHeader,
  CardSection,
  Table,
  Status,
  PaymentProcessor,
} from "@/components";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { orderStatusTypeArray } from "@/interfaces";
import { fetchOrders } from "@/store/slices/orders/ordersThunks";

const Orders: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const orders = useAppSelector((state) => state.orders.ordersList);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleClickRow = (data: any) => {
    router.push({
      pathname: "/admin/orders/[orderId]",
      query: { orderId: data._id },
    });
  };

  return (
    <Card>
      <CardSection line={false}>
        <CardHeader>
          <h4>Ordenes</h4>
        </CardHeader>
      </CardSection>

      <CardSection fullHeight={true}>
        <Table
          headers={[
            "Orden",
            "Estado",
            "Artículos",
            "País, estado",
            "Total",
            "Proveedor",
          ]}
          proportion={["15%", "30%", "10%", "20%", "10%", "15%"]}
          centerRows={[false, true, false, false, true, true]}
          pagination={{
            currentItems: orders.length,
            itemsName: "Ordenes",
            onChange(page) {
              console.log(page);
            },
            pagesNumber: 1,
            perPage: 10,
            total: orders.length,
          }}
        >
          <>
            {orders.map((order) => (
              <Table.Row key={order._id} onClick={() => handleClickRow(order)}>
                <Table.Cell>{order.orderNumber}</Table.Cell>
                <Table.Cell>
                  <Status
                    options={orderStatusTypeArray}
                    status={order.orderStatus}
                  />
                </Table.Cell>
                <Table.Cell>
                  {order.numberOfItems}{" "}
                  {order.numberOfItems > 1 ? "piezas" : "pieza"}
                </Table.Cell>
                <Table.Cell>
                  <p>{order.shippingAddress}</p>
                </Table.Cell>
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

export default Orders;
