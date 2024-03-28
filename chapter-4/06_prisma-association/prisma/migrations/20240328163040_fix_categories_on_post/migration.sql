/*
  Warnings:

  - You are about to drop the column `assigned_at` on the `categories_on_posts` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_by` on the `categories_on_posts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `categories_on_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories_on_posts" DROP COLUMN "assigned_at",
DROP COLUMN "assigned_by",
DROP COLUMN "name";
