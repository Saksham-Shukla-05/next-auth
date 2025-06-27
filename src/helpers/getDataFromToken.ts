import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (requst: NextRequest) => {
  try {
    const token = requst.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
