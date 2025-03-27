import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";

function HotelCard(props) {
  return (
    <Link
      to={`/hotels/${props.hotel._id}`}
      key={props.hotel._id}
      className="block group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={props.hotel.image}
          alt={props.hotel.name}
          className="object-cover w-full h-full absolute transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 p-4 bg-white rounded-b-xl">
        <h3 className="font-semibold text-lg text-gray-900">{props.hotel.name}</h3>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span>{props.hotel.location}</span>
        </div>
        <div className="flex items-center space-x-1 text-yellow-500 mt-1">
          <Star className="h-4 w-4" />
          <span className="font-medium text-gray-800">{props.hotel?.rating ?? "No rating"}</span>
          <span className="text-gray-500">
            ({props.hotel.reviews?.toLocaleString() ?? "No"} Reviews)
          </span>
        </div>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-xl font-bold text-gray-900">${props.hotel.price}</span>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;