import styles from "@/styles/pages/login.module.scss";

import {
  Card,
  CardHeader,
  CardSection,
  Form,
  Input,
  SubmitButton,
  ProfileBox,
  Svg,
} from "@/components";

import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { startLogin } from "@/store/slices/auth/authThunks";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogin = (values: { nickname: string; password: string }) => {
    // console.log(values);
    dispatch(startLogin(values));
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.login}>
          <CardHeader center>
            <div className={styles.headerContainer}>
              <ProfileBox />
              <h1>¡Bienvenido de vuelta! </h1>
              <p>
                Que bueno verte 👋🏼 <br />
                ingresa tus datos para continuar
              </p>
            </div>
          </CardHeader>
          <CardSection line={false}>
            <div className={styles.form}>
              <Formik
                initialValues={{
                  nickname: "",
                  password: "",
                }}
                validationSchema={Yup.object({
                  nickname: Yup.string()
                    .required("Nombre de usuario requerido"),
                  password: Yup.string()
                    .min(8, "Mínimo 8 caracteres")
                    .required("Se esperaba una contraseña"),
                })}
                onSubmit={handleLogin}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Inputs withGap={false}>
                      <Input
                        name="nickname"
                        label="Nombre de usuario"
                        placeholder="nombre de usuario"
                        withLabel={false}
                        withPlaceholder={true}
                        inputPadding="0.5rem"
                      />
                      <Input
                        name="password"
                        label="Contraseña"
                        type="password"
                        placeholder="Contraseña"
                        withLabel={false}
                        withPlaceholder={true}
                        inputPadding="0.5rem"
                      />
                    </Form.Inputs>
                    <Form.Buttons>
                      <SubmitButton variant="login">Entrar</SubmitButton>
                    </Form.Buttons>
                  </Form>
                )}
              </Formik>
            </div>
          </CardSection>
        </div>
      </Card>
    </div>
  );
};

export default Login;
