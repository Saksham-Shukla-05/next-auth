import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connect();

export async function POST(requst: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Check Your Credentials" },
        { status: 400 }
      );
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(
      tokenPayload,
      process.env.TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Looged in Success",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
