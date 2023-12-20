/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- RenameTable
PRAGMA foreign_keys=off;
ALTER TABLE "Todo" RENAME TO "Todos";
PRAGMA foreign_keys=on;

