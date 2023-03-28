import { post } from "@/api/langaviApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Router from "next/router";

export const startLogin = createAsyncThunk(
  "auth/startLogin",
  async (
    data: {
      nickname: string;
      password: string;
    },
    { dispatch }
  ) => {
    try {
      const response = await post<{ token: string }>("/login", data);
      toast.success("Un placer saludarte de nuevo");
      Router.push("/admin/orders");
      return response.token;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast.error("Credenciales incorrectas");
            break;
          case 500:
            toast.error("Error interno del servidor");
            break;
          default:
            toast.error("Error al iniciar sesión");
        }
      }
    }
  }
);
