import { timingSafeEqual } from "crypto";

export function compare(hash1: string, hash2: string) {
  return timingSafeEqual(Buffer.from(hash1), Buffer.from(hash2));
}
