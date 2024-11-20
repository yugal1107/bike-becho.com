// src/pages/RentPage/RentForm.jsx
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
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { FaUpload } from "react-icons/fa"; // Import the Upload icon

const RentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    rentPrice: "",
    mileage: "",
    fuelType: "",
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

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "myCloud");
        data.append("cloud_name", "dtzjzuoud");

        try {
          if (file === null) {
            return toast.error("Please Upload a file");
          }

          // Determine the upload URL based on file type
          const isImage = file.type.startsWith("image/");
          const uploadUrl = isImage
            ? "https://api.cloudinary.com/v1_1/dtzjzuoud/image/upload"
            : "https://api.cloudinary.com/v1_1/dtzjzuoud/video/upload";

          const res = await fetch(uploadUrl, {
            method: "POST",
            body: data,
          });

          const cloudData = await res.json();
          if (cloudData.error) {
            console.error("Error uploading image:", cloudData.error);
            return null;
          }
          return cloudData.secure_url;
        } catch (error) {
          console.error("Error uploading file:", error);
          return null;
        }
      })
    );

    setImages(uploadedImages.filter((url) => url !== null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to list a vehicle.");
        setLoading(false);
        return;
      }

      const db = getFirestore(app);
      const newListing = {
        ...formData,
        images,
        createdAt: new Date(),
        userId: user.uid,
      };

      await addDoc(collection(db, "rentals"), newListing);

      alert("Vehicle listed successfully!");
      setFormData({
        title: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        rentPrice: "",
        mileage: "",
        fuelType: "",
        description: "",
        sellerName: "",
        sellerContact: "",
        sellerEmail: "",
      });
      setImages([]);
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
          <p className="text-xl font-bold">List Your Vehicle for Rent</p>
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
                label="Mileage"
                placeholder="Enter mileage"
                value={formData.mileage}
                onChange={(e) => handleInputChange("mileage", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Price"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
              <Input
                type="number"
                label="Rent Price (per hour)"
                placeholder="Enter rent price per hour"
                value={formData.rentPrice}
                onChange={(e) => handleInputChange("rentPrice", e.target.value)}
                required
              />
            </div>
            <Select
              label="Fuel Type"
              placeholder="Select fuel type"
              value={formData.fuelType}
              onChange={(e) => handleInputChange("fuelType", e.target.value)}
              required
            >
              {fuelTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              label="Description"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          {/* Seller Details */}
          <div className="space-y-4">
            <Input
              label="Seller Name"
              placeholder="Enter your name"
              value={formData.sellerName}
              onChange={(e) => handleInputChange("sellerName", e.target.value)}
              required
            />
            <Input
              type="email"
              label="Seller Email"
              placeholder="Enter your email"
              value={formData.sellerEmail}
              onChange={(e) => handleInputChange("sellerEmail", e.target.value)}
              required
            />
            <Input
              label="Seller Contact"
              placeholder="Enter your contact number"
              value={formData.sellerContact}
              onChange={(e) => handleInputChange("sellerContact", e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <div className="flex space-x-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Uploaded"
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white text-xl font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Listing..." : "List Vehicle"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default RentForm;