/*
  Warnings:

  - Added the required column `totalDiscount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountValue` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDiscount` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" INTEGER NOT NULL,
    "totalDiscount" INTEGER NOT NULL
);
INSERT INTO "new_Order" ("createdAt", "id", "total") SELECT "createdAt", "id", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "adjective" TEXT NOT NULL,
    "hasDiscount" BOOLEAN NOT NULL,
    "discountValue" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("adjective", "description", "id", "imageUrl", "material", "name", "orderId", "origin", "price", "productId", "quantity") SELECT "adjective", "description", "id", "imageUrl", "material", "name", "orderId", "origin", "price", "productId", "quantity" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
