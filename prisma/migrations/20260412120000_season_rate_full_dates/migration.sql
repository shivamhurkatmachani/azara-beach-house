-- Delete all existing season rates so admin can re-enter with proper dates
DELETE FROM "SeasonRate";

-- Drop old month/day columns
ALTER TABLE "SeasonRate" DROP COLUMN "startMonth";
ALTER TABLE "SeasonRate" DROP COLUMN "startDay";
ALTER TABLE "SeasonRate" DROP COLUMN "endMonth";
ALTER TABLE "SeasonRate" DROP COLUMN "endDay";

-- Add new full-date columns
ALTER TABLE "SeasonRate" ADD COLUMN "startDate" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "SeasonRate" ADD COLUMN "endDate" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- Remove the temporary defaults
ALTER TABLE "SeasonRate" ALTER COLUMN "startDate" DROP DEFAULT;
ALTER TABLE "SeasonRate" ALTER COLUMN "endDate" DROP DEFAULT;
