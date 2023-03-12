import Image from "next/image";
import styles from "./PaymentProcessor.module.scss";

interface IPaymentProcessorProps {
  pickImage: string;
}

export const PaymentProcessor = ({ pickImage }: IPaymentProcessorProps) => {
  let providerImage = "";
  switch (pickImage) {
    case "Paypal":
      providerImage = "/images/logos/paypalLogo.png";
      break;
    case "Stripe":
      providerImage = "/images/logos/stripeLogo.png";
    default:
      break;
  }

  return (
    <div className={styles.PaymentProcessor}>
      <Image src={providerImage} alt="Logotipo del proveedor de pagos" />
    </div>
  );
};
