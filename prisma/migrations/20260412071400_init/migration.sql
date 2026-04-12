-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "nights" INTEGER NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL DEFAULT 0,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gstNumber" TEXT,
    "specialRequests" TEXT,
    "promoCode" TEXT,
    "paymentOption" TEXT NOT NULL,
    "baseTotal" INTEGER NOT NULL,
    "gstAmount" INTEGER NOT NULL,
    "grandTotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paidAmount" INTEGER NOT NULL DEFAULT 0,
    "adminNotes" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedDate" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "BlockedDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonRate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "startDay" INTEGER NOT NULL,
    "endMonth" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,
    "nightlyRate" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeasonRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "maxUses" INTEGER NOT NULL,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_ref_key" ON "Booking"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedDate_date_key" ON "BlockedDate"("date");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");
