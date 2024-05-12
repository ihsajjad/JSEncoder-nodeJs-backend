import { changeStatusToCanceled } from "../controllers/bookings.controller";
import { checkBookingId, router } from "./bookings";

// cancel booking by Id
router.patch(
  "/cancel/:bookingId",
  checkBookingId(),
  // validateToken,
  changeStatusToCanceled
);
