import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  Chip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const calculateAge = (year) => {
  const currentYear = new Date().getFullYear();
  return currentYear - Number(year);
};

export default function ItemCard({
  id,
  image,
  title,
  description,
  year,
  mileage,
  price,
  className,
  condition,
  location,
  fuelType,
}) {
  const formattedPrice = Number(price).toLocaleString('en-IN');
  const bikeAge = calculateAge(year);

  return (
    <Card 
      className={`group relative transition-all duration-300 hover:shadow-lg ${className}`}
      style={{ width: "320px" }}
    >
      {/* Status Badge */}
      {condition && (
        <Chip
          color={condition === 'New' ? 'success' : 'default'}
          className="absolute top-2 right-2 z-10"
        >
          {condition}
        </Chip>
      )}

      <CardHeader className="pb-0 pt-2 px-4">
        <div className="flex flex-col gap-1 w-full">
          <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 
            transition-colors line-clamp-1">
            {title}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{year}</span>
            {location && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">{location}</span>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody className="py-2">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            alt={title}
            className="w-full h-48 object-cover transform transition-transform 
              duration-300 group-hover:scale-110"
            src={image}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {/* Age Chip */}
          <Chip size="sm" variant="flat" className="bg-blue-100 text-blue-700">
            {bikeAge} {bikeAge === 1 ? 'year' : 'years'} old
          </Chip>
          
          {/* Mileage Chip */}
          {mileage && (
            <Chip size="sm" variant="flat" className="bg-green-100 text-green-700">
              {mileage} km
            </Chip>
          )}
          
          {/* Fuel Type Chip */}
          {fuelType && (
            <Chip size="sm" variant="flat" className="bg-purple-100 text-purple-700">
              {fuelType}
            </Chip>
          )}
        </div>
      </CardBody>

      <CardFooter className="flex justify-between items-center pt-0">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-blue-600">₹{formattedPrice}</p>
          <p className="text-xs text-gray-500">Listed price</p>
        </div>
        <Link to={`/item/${id}`}>
          <Button 
            className="bg-blue-600 text-white font-medium shadow-sm
              hover:bg-blue-700 transition-colors"
            radius="full"
            size="sm"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
