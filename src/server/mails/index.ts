import nodemailer from "nodemailer";
import { ShippingInfoEmail } from "./templates/ShippingInfoEmail";
import { render } from "@react-email/render";
import { IOrder } from "../../interfaces/order";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL || "i.s.ricardo.sandoval@gmail.com", // production
    pass: process.env.EMAIL_PASSWORD || "", // production
    // user: "i.s.ricardo.sandoval@gmail.com", // development
    // pass: "zsxyyrugfktoayzt", // development
  },
});

transporter.verify().then(() => {
  console.log("Ready to send mails");
});

export async function sendShippingInfoEmail({
  to,
  order,
}: {
  to: string;
  order: IOrder;
}) {
  const emailHtml = render(ShippingInfoEmail({ order }));

  const options = {
    from: "Langavi Envíos",
    to,
    subject: `Tu pedido ${order.orderNumber} va en camino!`,
    html: emailHtml,
  };

  const send = await transporter.sendMail(options);
  // console.log({ send });
}
