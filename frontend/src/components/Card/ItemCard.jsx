// import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";

export default function ItemCard({
  id,
  image,
  title,
  description,
  year,
  mileage,
  price,
  className,
}) {
  return (
    <Card
      className={`py-4 hover:bg-cyan-100 ${className}`}
      style={{ width: "300px" }}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-semibold text-cyan-700 text-large">{title}</h4>
        <small className="text-default-500">{year}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl transform transition-transform duration-300 hover:scale-105"
          src={image}
          width={270}
          height={180}
        />
      </CardBody>
      <CardFooter className="flex flex-row justify-between items-center">
        <p className="uppercase font-light text-lg">{price}</p>
        <Button
          variant="solid"
          size="sm"
          className="bg-blue-600 text-white font-normal uppercase"
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
