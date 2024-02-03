import { NextResponse } from "next/server";

const transactionHistories = [
  {
    title: "Groceries",
    total: 200.0,
    createdAt: Date.now(),
    income: true,
  },
  {
    title: "Gas",
    total: 60.35,
    createdAt: Date.now(),
    income: false,
  },
  {
    title: "Snacks",
    total: 15.3,
    createdAt: Date.now(),
    income: false,
  },
  {
    title: "Netflix",
    total: 20.5,
    createdAt: Date.now(),
    income: true,
  },
];

/**
 * Get all transaction histories
 * @param {*} request
 * @returns {Array}
 */
export async function GET(request) {
  return NextResponse.json(transactionHistories);
}

/**
 * Handle create transaction histories
 * @param {*} request
 * @returns
 */
export async function POST(request) {
  return NextResponse.json({
    message: `You have reached transaction histories POST.`,
  });
}
