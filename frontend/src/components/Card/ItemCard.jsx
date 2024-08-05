import React from "react";
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
}) {
  return (
    <Card className="py-4 hover:bg-cyan-100">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-semibold text-cyan-700 text-large">{title}</h4>
        <small className="text-default-500">{year}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        <p className="uppercase font-light">{price}</p>
        <Button
          variant="solid"
          size="sm"
          className="bg-blue-600 text-white font-normal uppercase"
        >
          VIEW
        </Button>
      </CardFooter>
    </Card>
  );
}
