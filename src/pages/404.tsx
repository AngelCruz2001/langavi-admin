import { Line } from "@/components";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "white",
        gap: "3rem",
      }}
    >
      <h3>404 - Hay que esperar a que se ponga a chambear el Richi</h3>
      <Line />
      <Link href="/admin" legacyBehavior>
        <a style={{ color: "red" }}>Ir a la página de inicio</a>
      </Link>
    </div>
  );
}
