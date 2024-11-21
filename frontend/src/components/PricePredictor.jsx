import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-markdown";

const PricePredictor = ({ vehicleSpecs }) => {
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePredictPrice = async () => {
    setLoading(true);
    setError("");
    setPredictedPrice(null);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Exclude the price from the vehicle specifications
      const { price, ...specsWithoutPrice } = vehicleSpecs;

      const prompt = `
        Based on the following vehicle specifications, predict the price range in Indian Rupees (₹):
        - Brand: ${specsWithoutPrice.brand}
        - Model: ${specsWithoutPrice.model}
        - Year: ${specsWithoutPrice.year}
        - Mileage: ${specsWithoutPrice.mileage} km
        - Fuel Type: ${specsWithoutPrice.fuelType}
        - Condition: ${specsWithoutPrice.condition || "Not specified"}
        - Location: ${specsWithoutPrice.location || "Not specified"}

        Please provide a two-line output with a price range in Indian Rupees (₹) considering the current market trends in India.
      `;
      const result = await model.generateContent(prompt);

      setPredictedPrice(result.response.text());
    } catch (error) {
      console.error("Error predicting price:", error);
      setError("Failed to predict price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInitialClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmClick = () => {
    setShowConfirmation(false);
    handlePredictPrice();
  };

  return (
    <div className="mt-4">
      {!showConfirmation ? (
        <button
          onClick={handleInitialClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Predict Price
        </button>
      ) : (
        <div>
          <p className="text-gray-700 mb-4">
            This feature is in process. Do you still want to predict the price?
          </p>
          <button
            onClick={handleConfirmClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Yes, Predict"}
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      )}
      {predictedPrice && (
        <div className="mt-4 text-green-500">
          <Markdown>{predictedPrice}</Markdown>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default PricePredictor;