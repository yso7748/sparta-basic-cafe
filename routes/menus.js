import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});

router.get("/stats", async (req, res, next) => {
  const menus = await prisma.menu.findMany();
  const orders = await prisma.orderhistory.findMany();

  let totalOrders = 0;
  let totalSales = 0;
  for (let i = 0; i < orders.length; i++) {
    totalOrders += orders[i].quantity;

    // const menuInfo = await prisma.menu.findFirst({ where: { id: orders[i].menu_id } });

    const menuInfo = menus.find((menu) => {
      return menu.id === orders[i].menu_id;
    });
    console.log(menuInfo);

    totalSales += menuInfo.price * orders[i].quantity;
  }
  console.log("totalSales", totalSales);
  res.status(200).json({
    stats: {
      totalMenus: menus.length,
      totalOrders: totalOrders,
      totalSales: totalSales,
    },
  });
});

router.get("/", async (req, res, next) => {
  const menus = await prisma.menu.findMany();
  console.log(menus);

  return res.status(200).json({ menus });
});

export default router;
