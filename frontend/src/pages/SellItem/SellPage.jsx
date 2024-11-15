import React, { useState } from "react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import { Upload } from "lucide-react";

const VehicleListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    location: "",
    description: "",
    sellerName: "",
    sellerContact: "",
    sellerEmail: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, // Replace with your cloud name
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const vehicleData = {
        ...formData,
        images,
        createdAt: new Date(),
      };

      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        alert("Vehicle listed successfully!");
        setFormData({
          title: "",
          brand: "",
          model: "",
          year: "",
          price: "",
          mileage: "",
          fuelType: "",
          transmission: "",
          location: "",
          description: "",
          sellerName: "",
          sellerContact: "",
          sellerEmail: "",
        });
        setImages([]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const fuelTypes = [
    { label: "Petrol", value: "petrol" },
    { label: "Diesel", value: "diesel" },
    { label: "Electric", value: "electric" },
    { label: "Hybrid", value: "hybrid" },
  ];

  return (
    <Card className="max-w-3xl mx-auto my-2">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl font-bold">List Your Vehicle</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Details */}
          <div className="space-y-4">
            <Input
              label="Listing Title"
              placeholder="Enter listing title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Brand"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                required
              />
              <Input
                label="Model"
                placeholder="Enter model"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Year"
                placeholder="Enter year"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                required
              />
              <Input
                type="number"
                label="Price"
                placeholder="Enter price"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Mileage"
                placeholder="Enter mileage"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">km</span>
                  </div>
                }
                value={formData.mileage}
                onChange={(e) => handleInputChange("mileage", e.target.value)}
                required
              />
              <Select
                label="Fuel Type"
                placeholder="Select fuel type"
                value={formData.fuelType}
                onChange={(e) => handleInputChange("fuelType", e.target.value)}
                required
              >
                {fuelTypes.map((fuel) => (
                  <SelectItem key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Textarea
              label="Description"
              placeholder="Enter vehicle description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          {/* Seller Details */}
          <div className="space-y-4">
            <p className="text-lg font-semibold">Seller Information</p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={formData.sellerName}
                onChange={(e) =>
                  handleInputChange("sellerName", e.target.value)
                }
                required
              />
              <Input
                label="Contact Number"
                placeholder="Enter contact number"
                value={formData.sellerContact}
                onChange={(e) =>
                  handleInputChange("sellerContact", e.target.value)
                }
                required
              />
            </div>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.sellerEmail}
              onChange={(e) => handleInputChange("sellerEmail", e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className="text-sm mb-2">Vehicle Images</p>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="images"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="text-sm text-gray-600">
                  Click to upload images
                </div>
              </div>
            </label>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Vehicle preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <Button type="submit" color="primary" isLoading={loading} fullWidth>
            {loading ? "Submitting..." : "List Vehicle"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default VehicleListingForm;
