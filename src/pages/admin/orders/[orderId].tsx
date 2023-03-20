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
  Table,
  Input,
  Form,
  CopyOnClick,
} from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SubmitButton } from "../../../components/button/SubmitButton";
import * as Yup from "yup";
import { Formik } from "formik";
import { OrderStatusType, orderStatusTypeArray } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  addShippingInfo,
  fetchOrder,
  setStatus,
} from "@/store/slices/orders/ordersThunks";
import toast from "react-hot-toast";

interface IOrderProps {}

const OrderDetail = (props: IOrderProps) => {
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state.orders.activeOrder);
  const loading = useAppSelector((state) => state.orders.loading);
  const formLoading = useAppSelector((state) => state.orders.formLoading);
  const error = useAppSelector((state) => state.orders.error);

  // Get id from url
  const router = useRouter();
  const { orderId } = router.query as { orderId: string };

  useEffect(() => {
    if (orderId) dispatch(fetchOrder(orderId));
  }, [dispatch, orderId]);

  //const options = orderStatusType; // ["preparando pedido para ser enviado", "enviado", "entregado", "cancelado"];

  useEffect(() => {
    if (loading) toast.loading("Cargando orden");
    else toast.dismiss();
  }, [loading]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChangeStatus = (status: string) => {
    console.log(status);

    if (status === "enviado" && !order?.guideNumber) {
      setIsEditing(true);
      return;
    }

    dispatch(
      setStatus({
        orderId,
        status: status as OrderStatusType,
      })
    );
  };

  const handleEditSubmit = (data: {
    guideNumber: string;
    shippingProvider: string;
  }) => {
    console.log(formLoading, error);

    dispatch(
      addShippingInfo({
        orderId: orderId,
        shippingInfo: {
          guideNumber: data.guideNumber,
          shippingProvider: data.shippingProvider,
        },
        closeModal: () => setIsEditing(false),
      })
    );
  };

  if (!order || loading) return <div>Loading...</div>;

  const shippingAddress = order.shippingAddress;

  console.log(order);

  return (
    <>
      <BackArrow backTo="ordenes" />
      <div className={styles.orderPage}>
        <div className={styles.firstSection}>
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
                  <Status
                    status={order.orderStatus}
                    clickeable
                    onClick={handleChangeStatus}
                    options={orderStatusTypeArray}
                  />
                  <Menu>
                    <Button
                      onClick={handleEdit}
                      withIcon={true}
                      iconName="edit"
                    >
                      Datos de envio
                    </Button>
                  </Menu>
                </div>
              </CardHeader>
            </CardSection>

            <CardSection line={false}>
              <Description>
                {order.guideNumber ? (
                  <>
                    Guía de rastreo{" "}
                    <CopyOnClick>{order.guideNumber}</CopyOnClick> paqueteria{" "}
                    <span>{order.shippingProvider}</span> pagado el{" "}
                    <span>{order.paidAt}</span>
                  </>
                ) : (
                  <>
                    Orden sin datos de envio, por favor actualiza los datos,
                    pagada el <span>{order.paidAt}</span>
                  </>
                )}
              </Description>
              <List
                listTitle="Detalles"
                styles={{ marginTop: "1.5rem" }}
                data={[
                  {
                    label: "Nombre",
                    value:
                      shippingAddress.firstName +
                      " " +
                      shippingAddress.lastName,
                  },
                  {
                    label: "Dirección",
                    value: shippingAddress.address,
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
                ]}
              />
            </CardSection>
          </Card>
          <Card
            style={{
              marginTop: "1rem",
            }}
          >
            <CardSection line={false}>
              <CardHeader>
                <Title>Productos</Title>
              </CardHeader>
            </CardSection>
            <CardSection line={false}>
              <Table
                headers={["Producto", "Cantidad", "Precio", "Total"]}
                centerRows={[false, true, true, true]}
                clickeable={false}
                proportion={["40%", "20%", "20%", "20%"]}
              >
                <>
                  {order.products.map((product) => (
                    <Table.Row key={product._id}>
                      <Table.Cell>
                        <Image
                          src={product.image}
                          alt={product.title}
                          width="50"
                          height="50"
                          style={{ marginRight: "1rem" }}
                        />
                        {product.title}{" "}
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        {product.quantity}{" "}
                        {product.quantity > 1 ? "unidades" : "unidad"}{" "}
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        ${product.price} {product.price > 1 ? "pesos" : "peso"}{" "}
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        ${product.price * product.quantity}{" "}
                        {product.price * product.quantity > 1
                          ? "pesos"
                          : "peso"}{" "}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </>
              </Table>
            </CardSection>
          </Card>
        </div>

        <div className={styles.section}>
          <Card>
            <CardSection line={false}>
              <CardHeader>
                <Title>Resumen</Title>
              </CardHeader>
            </CardSection>
            <CardSection line={false}>
              <List
                listTitle="Pedido"
                styles={{ marginTop: "1.5rem" }}
                data={[
                  {
                    label: "Subtotal",
                    value: `$${order.subtotal} pesos`,
                  },
                  {
                    label: "Envío",
                    value: `$${order.shippingPrice} pesos`,
                  },
                  {
                    label: "Descuentos",
                    value:
                      order.discounts.length > 0
                        ? `${[
                            ...order.discounts.map((discount) => discount.code),
                          ]} `
                        : "No se aplicaron descuentos",
                  },
                  {
                    label: "Impuestos",
                    value: `$${order.tax.amount} pesos`,
                  },
                  {
                    label: "Total",
                    value: `$${order.total} pesos`,
                  },
                ]}
              />
            </CardSection>
          </Card>

          <Card
            style={{
              marginTop: "1rem",
            }}
          >
            <CardSection line={false}>
              <CardHeader>
                <Title>Información de pago</Title>
              </CardHeader>
            </CardSection>

            <CardSection line={false}>
              <List
                listTitle="Pago"
                styles={{ marginTop: "1.5rem" }}
                data={[
                  {
                    label: "ID",
                    value: order.transactionId,
                  },
                  {
                    label: "Método de pago",
                    value: order.provider,
                  },
                  {
                    label: "Fecha de pago",

                    value: order.paidAt,
                  },
                ]}
              />
            </CardSection>
          </Card>
        </div>
      </div>

      {isEditing && (
        <Modal isOpen={isEditing}>
          <Card>
            <CardSection line={false}>
              <CardHeader>
                <Title>Añadir datos de entrega</Title>
              </CardHeader>
            </CardSection>

            <CardSection line={false}>
              <Formik
                onSubmit={handleEditSubmit}
                validationSchema={Yup.object({
                  guideNumber: Yup.string().required(
                    "El número de guía es requerido"
                  ),
                  shippingProvider: Yup.string().required(
                    "La paquetería es requerida"
                  ),
                  // shippingPrice: Yup.number().required(
                  //   "El precio de envío es requerido"
                  // ),
                })}
                initialValues={{
                  guideNumber: order.guideNumber || "",
                  shippingProvider: order.shippingProvider || "",
                  // shippingPrice: order.shippingPrice || "",
                }}
                validateOnMount
                enableReinitialize
              >
                {({ handleSubmit, isValid }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Inputs>
                      <Input
                        name="guideNumber"
                        label="Número de guía"
                        type="text"
                        placeholder="Número de guía"
                      />
                      <Input
                        name="shippingProvider"
                        label="Paquetería"
                        type="select"
                        placeholder="Selecciona una paquetería"
                        options={[
                          { value: "dhl", label: "DHL" },
                          { value: "fedex", label: "Fedex" },
                          { value: "estafeta", label: "Estafeta" },
                          { value: "ups", label: "UPS" },
                          { value: "redpack", label: "Redpack" },
                          { value: "correos", label: "Correos" },
                        ]}
                      />
                      {/* <Input
                        name="shippingPrice"
                        label="Precio de envío"
                        type="number"
                        placeholder="Precio de envío"
                      /> */}
                    </Form.Inputs>

                    <Form.Buttons>
                      <SubmitButton
                        onClick={handleEditCancel}
                        position="right"
                        type="button"
                        variant="cancel"
                      >
                        <span>Cancelar</span>
                      </SubmitButton>
                      <SubmitButton
                        position="right"
                        type="submit"
                        loading={formLoading}
                      >
                        <span>Guardar</span>
                      </SubmitButton>
                    </Form.Buttons>
                  </Form>
                )}
              </Formik>
            </CardSection>
          </Card>
        </Modal>
      )}
    </>
  );
};

// justify-content: space-between;
export default OrderDetail;
