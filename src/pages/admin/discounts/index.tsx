// import styles from "./Discounts.module.scss";

import {
  Card,
  CardHeader,
  CardSection,
  Table,
  Button,
  Modal,
  Form,
  Input,
  SubmitButton,
  CopyOnClick,
  Switch,
} from "@/components";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  fetchDiscounts,
  editDiscount,
  deleteDiscount,
  createDiscount,
} from "@/store/slices/discounts/discountsThunks";
import { IDiscount } from "../../../interfaces/discount";
import {
  clearActiveDiscount,
  setActiveDiscount,
} from "@/store/slices/discounts/discountsSlice";
import { TypePicker } from "../../../components/input/TypePicker";
import * as Yup from "yup";

interface IDiscountsProps {}

const Discounts = (props: IDiscountsProps) => {
  const dispatch = useAppDispatch();
  const discounts = useAppSelector((state) => state.discounts.discountsList);
  const formLoading = useAppSelector((state) => state.discounts.formLoading);
  const activeDiscount = useAppSelector(
    (state) => state.discounts.activeDiscount
  );

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);

  const handleAddCupon = () => {
    setShowModal(true);
  };

  const handleClickEdit = (discount: IDiscount) => {
    setShowModal(true);

    dispatch(setActiveDiscount(discount));
  };

  const handleDeleteDiscount = (id: string) => {
    dispatch(deleteDiscount(id));
  };

  const handleSubmit = (discount: {
    code: string;
    discount: number;
    active: boolean;
    type: string;
  }) => {
    // Create a new discount, working the data to resolve: "quantity" or "percentaje"

    if (activeDiscount) {
      const newDiscount = {
        [discount.type]: discount.discount,
        code: discount.code,
        active: discount.active,
      };
      dispatch(
        editDiscount({
          id: activeDiscount._id,
          discount: newDiscount,
          closeModal: () => setShowModal(false),
        })
      );
    } else {
      dispatch(
        createDiscount({
          discount: {
            [discount.type]: discount.discount,
            code: discount.code,
            active: discount.active,
          },
          closeModal: () => setShowModal(false),
        })
      );
    }
  };

  return (
    <div>
      <Card>
        <CardHeader
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h4>Cupones</h4>

          <Button onClick={handleAddCupon} withIcon iconName="plus">
            <span>Agregar cupón</span>
          </Button>
        </CardHeader>

        <CardSection>
          <Table
            headers={["Cupon", "Descuento", "Estado", "Usado", "", ""]}
            proportion={["25%", "20%", "25%", "20%", "5%", "5%"]}
            centerRows={[true, true, true]}
            clickeable={false}
          >
            <>
              {discounts.map((discount) => (
                <Table.Row key={discount._id}>
                  <Table.Cell>
                    {" "}
                    <CopyOnClick> {discount.code}</CopyOnClick>
                  </Table.Cell>
                  <Table.Cell>
                    {discount.percentaje ? (
                      <>{discount.percentaje}%</>
                    ) : (
                      <>{discount.quantity} pesos</>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {discount.active ? "Activo" : "Inactivo"}
                  </Table.Cell>
                  <Table.Cell>
                    {discount.timesUsed}{" "}
                    {discount.timesUsed! > 1 || discount.timesUsed === 0
                      ? "veces"
                      : "vez"}
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      withIcon
                      variant="primary"
                      iconName="edit"
                      onClick={() => handleClickEdit(discount)}
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      variant="danger"
                      withIcon
                      iconName="trash"
                      onClick={() => handleDeleteDiscount(discount._id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </>
          </Table>
        </CardSection>
      </Card>

      <Modal isOpen={showModal}>
        <Card
          style={{
            position: "relative",
          }}
        >
          <CardHeader>
            <h4>Agregar cupón</h4>
          </CardHeader>

          <CardSection>
            <Formik
              initialValues={{
                code: activeDiscount?.code || "",
                discount:
                  activeDiscount?.percentaje || activeDiscount?.quantity || 0,
                active: activeDiscount?.active || false,
                type: activeDiscount?.percentaje ? "percentaje" : "quantity",
              }}
              validationSchema={Yup.object({
                code: Yup.string().required("El código es requerido"),
                discount: Yup.number()
                  .required("El descuento es requerido")
                  .min(1, "El descuento debe ser mayor a 0"),
                active: Yup.boolean().required("El estado es requerido"),
                type: Yup.string().required("El tipo es requerido"),
              })}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleSubmit, resetForm }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Inputs>
                    <Input
                      label="Código"
                      name="code"
                      placeholder="Código del cupón"
                    />
                    <Input
                      label="Descuento"
                      name="discount"
                      placeholder="Descuento"
                      type="number"
                    />

                    <TypePicker
                      label="Tipo de descuento"
                      name="type"
                      types={[
                        {
                          label: "Porcentaje",
                          value: "percentaje",
                        },
                        {
                          label: "Pesos",
                          value: "quantity",
                        },
                      ]}
                    />

                    <Switch name="active" />
                  </Form.Inputs>

                  <Form.Buttons>
                    <SubmitButton
                      position="right"
                      type="button"
                      variant="cancel"
                      onClick={() => {
                        resetForm();
                        dispatch(clearActiveDiscount());
                        setShowModal(false);
                      }}
                    >
                      Cancelar
                    </SubmitButton>
                    <SubmitButton
                      position="right"
                      type="submit"
                      loading={formLoading}
                    >
                      {activeDiscount ? "Editar cupón" : "Agregar cupón"}
                    </SubmitButton>
                  </Form.Buttons>
                </Form>
              )}
            </Formik>
          </CardSection>
        </Card>
      </Modal>
    </div>
  );
};

export default Discounts;
