"use server";

import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { getBooking, getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update a reservation.");

  const bookingId = formData.get("bookingId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  
  const booking = await getBooking(bookingId)

   if (!booking) throw new Error("Booking not found");

  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", bookingId)

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  redirect("/account/reservations");

}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You don't have permission to delete this reservation.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Reservation could not be deleted.");

  revalidatePath("/account/reservations");
}

export async function updateGuestProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update your profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID number");

  const updatedData = {
    nationalID,
    countryFlag,
    nationality,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated.");

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
