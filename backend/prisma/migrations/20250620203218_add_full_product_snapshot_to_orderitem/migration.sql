/*
  Warnings:

  - Added the required column `adjective` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "origin" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("id", "name", "orderId", "price", "productId", "quantity") SELECT "id", "name", "orderId", "price", "productId", "quantity" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
