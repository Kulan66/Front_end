import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import {
  Coffee,
  MapPin,
  MenuIcon as Restaurant,
  Star,
  Tv,
  Wifi,
} from "lucide-react";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function HotelPage() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(id);
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = Math.abs(checkOutDate - checkInDate);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        diffDays = 1; // Add one night price if check-in and check-out are the same day
      }
      setTotalBill(diffDays * hotel.price);
    }
  }, [checkIn, checkOut, hotel]);

  const handleBook = async () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select both check-in and check-out dates.");
      return;
    }
    const toastId = toast.loading("Creating booking...");
    try {
      await createBooking({
        hotelId: id,
        checkIn,
        checkOut,
        roomNumber: 200,
        totalBill,
      }).unwrap();
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Booking failed, please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-4 w-36" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    );

  if (isError) return <p className="text-red">Error: {isError.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="absolute object-cover rounded-lg w-full h-full"
            />
          </div>
          <div className="text-left">
            <p className="text-2xl font-semibold">Total: ${totalBill}</p>
            <p className="text-xl text-muted-foreground">Per Night: ${hotel.price}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                <p className="text-muted-foreground">{hotel.location}</p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Star className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-bold">{hotel?.rating ?? "No rating"}</span>
            <span className="text-muted-foreground">
              ({hotel?.reviews?.toLocaleString() ?? "No"} reviews)
            </span>
          </div>
          <p className="text-muted-foreground">{hotel.description}</p>
          <Card className="bg-white shadow-lg rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Wifi className="h-6 w-6 text-primary mr-3" />
                  <span className="text-gray-700">Free Wi-Fi</span>
                </div>
                <div className="flex items-center">
                  <Restaurant className="h-6 w-6 text-primary mr-3" />
                  <span className="text-gray-700">Restaurant</span>
                </div>
                <div className="flex items-center">
                  <Tv className="h-6 w-6 text-primary mr-3" />
                  <span className="text-gray-700">Flat-screen TV</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="h-6 w-6 text-primary mr-3" />
                  <span className="text-gray-700">Coffee maker</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Check-in
              </label>
              <input
                type="date"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={today}
              />
              <Button variant="outline" size="sm" onClick={() => document.querySelector('input[type="date"]').showPicker()}>
                Choose Check-in Date
              </Button>
              <label className="block text-sm font-medium text-gray-700">
                Check-out
              </label>
              <input
                type="date"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || today}
              />
              <Button variant="outline" size="sm" onClick={() => document.querySelectorAll('input[type="date"]')[1].showPicker()}>
                Choose Check-out Date
              </Button>
            </div>
            <Button size="lg" onClick={handleBook} disabled={isCreateBookingLoading}>
              {isCreateBookingLoading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}