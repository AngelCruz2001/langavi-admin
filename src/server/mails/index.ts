import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "alfabaluartedgo@gmail.com", // production
    pass: "mwjhxvsnqdhukwuy", // production
    // user: "i.s.ricardo.sandoval@gmail.com", // development
    // pass: "zsxyyrugfktoayzt", // development
  },
});

transporter.verify().then(() => {
  console.log("Ready to send mails");
});
