import { NextResponse } from "next/server";
import { query } from "@/lib/db";


export async function GET(request) {
    try {
      const managers = await query({
        query: "SELECT * FROM Manager",
        values: [],
      });
      return NextResponse.json(managers);
    } catch (e) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }