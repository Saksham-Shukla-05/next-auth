import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(requst: NextRequest) {
  const userId = await getDataFromToken(requst); //extract id from token

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 500 });
  } else {
    return NextResponse.json({ message: "User Found", data: user });
  }
}
