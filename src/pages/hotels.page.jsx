import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HotelCard from "@/components/HotelCard"; // Assuming you have a HotelCard component
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useGetHotelsQuery } from "@/lib/api"; // Import the query hook

const HotelsPage = () => {
  const [location, setLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Custom hook to fetch hotels with filtering and sorting
  const { data: hotels, error, refetch } = useGetHotelsQuery(
    { location, sortOrder },
    { skip: false } // Fetch initially
  );

  useEffect(() => {
    if (location || sortOrder) {
      refetch(); // Fetch hotels whenever location or sortOrder changes
    }
  }, [location, sortOrder, refetch]);

  useEffect(() => {
    if (error) {
      setErrorMessage("Failed to fetch hotels. Please try again later.");
    }
  }, [error]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hotels</h1>
      <div className="filters flex space-x-4 mb-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div className="relative flex-1">
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)} className="w-full">
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">Sort by Price</SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={refetch} className="flex-none">Search</Button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="hotel-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels?.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </main>
  );
};

export default HotelsPage;