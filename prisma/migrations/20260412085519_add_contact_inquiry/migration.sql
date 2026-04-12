-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "checkIn" TEXT,
    "checkOut" TEXT,
    "guests" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);
