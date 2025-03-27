import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Goa, for 1 Days for 2 members with a Moderate budget,Give me a Hotels options list with HotelName, Hotel address along with city or town name, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName along with city or town name, Place Details, Place Image Url, Geo Coordinates,rating, ticket Pricing ,Time to travel each of the location for 1 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "json\n{\n  \"travelPlan\": {\n    \"location\": \"Goa\",\n    \"duration\": \"1 Day\",\n    \"budget\": \"Moderate\",\n    \"travelers\": 2,\n    \"hotels\": [\n      {\n        \"hotelName\": \"The LaLiT Golf & Spa Resort Goa\",\n        \"hotelAddress\": \"Raj Baga, Dona Paula, Goa 403004, India\",\n        \"price\": \"₹5,000 - ₹10,000 per night\",\n        \"hotelImageUrl\": \"https://www.lalit.com/images/hotel-gallery/lalit-golf-spa-resort-goa/lalit-golf-spa-resort-goa-exterior-view-1024x768.jpg\",\n        \"geoCoordinates\": \"15.4678° N, 73.8392° E\",\n        \"rating\": 4.5,\n        \"description\": \"Luxury resort with golf course, spa, multiple dining options, and stunning views.\"\n      },\n      {\n        \"hotelName\": \"The Leela Goa\",\n        \"hotelAddress\": \"Mobor, Cavelossim, Goa 403731, India\",\n        \"price\": \"₹6,000 - ₹12,000 per night\",\n        \"hotelImageUrl\": \"https://www.theleela.com/images/hotel-gallery/the-leela-goa/the-leela-goa-exterior-view-1024x768.jpg\",\n        \"geoCoordinates\": \"15.2679° N, 73.9632° E\",\n        \"rating\": 4.8,\n        \"description\": \"Upscale beachfront resort with multiple pools, restaurants, and spa services.\"\n      },\n      {\n        \"hotelName\": \"The Zuri White Sands Resort & Casino Goa\",\n        \"hotelAddress\": \"Varca Beach, Salcete, Goa 403707, India\",\n        \"price\": \"₹3,500 - ₹7,000 per night\",\n        \"hotelImageUrl\": \"https://www.thezuri.com/images/hotel-gallery/zuri-white-sands-resort-casino-goa/zuri-white-sands-resort-casino-goa-exterior-view-1024x768.jpg\",\n        \"geoCoordinates\": \"15.2336° N, 73.9803° E\",\n        \"rating\": 4.2,\n        \"description\": \"Beachfront resort with casino, water sports, multiple dining options, and lively entertainment.\"\n      },\n      {\n        \"hotelName\": \"Candolim Villa\",\n        \"hotelAddress\": \"168, Candolim, Bardez, Goa 403515, India\",\n        \"price\": \"₹2,000 - ₹4,000 per night\",\n        \"hotelImageUrl\": \"https://www.candolimvilla.com/images/hotel-gallery/candolimvilla-goa-exterior-view-1024x768.jpg\",\n        \"geoCoordinates\": \"15.5242° N, 73.8632° E\",\n        \"rating\": 4.0,\n        \"description\": \"Cozy villa with pool, garden, and comfortable rooms, located near popular beaches.\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": \"Day 1\",\n        \"plan\": [\n          {\n            \"placeName\": \"Old Goa\",\n            \"placeDetails\": \"Historic churches, including the Basilica of Bom Jesus and Se Cathedral.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Basilica_of_Bom_Jesus,_Old_Goa%2C_Goa%2C_India.jpg/1280px-Basilica_of_Bom_Jesus,_Old_Goa%2C_Goa%2C_India.jpg\",\n            \"geoCoordinates\": \"15.4818° N, 73.8444° E\",\n            \"rating\": 4.7,\n            \"ticketPricing\": \"Free entry to most churches\",\n            \"timeToTravel\": \"2-3 hours\"\n          },\n          {\n            \"placeName\": \"Panjim (Panaji)\",\n            \"placeDetails\": \"Capital city of Goa, known for its colonial architecture, vibrant markets, and waterfront promenade.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Panaji_Goa%2C_India.jpg/1280px-Panaji_Goa%2C_India.jpg\",\n            \"geoCoordinates\": \"15.5008° N, 73.8386° E\",\n            \"rating\": 4.4,\n            \"ticketPricing\": \"N/A\",\n            \"timeToTravel\": \"2-3 hours\"\n          },\n          {\n            \"placeName\": \"Calangute Beach\",\n            \"placeDetails\": \"Popular beach known for its vibrant atmosphere, water sports, and nightlife.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Calangute_beach.jpg/1024px-Calangute_beach.jpg\",\n            \"geoCoordinates\": \"15.5386° N, 73.8560° E\",\n            \"rating\": 4.6,\n            \"ticketPricing\": \"N/A\",\n            \"timeToTravel\": \"2-3 hours\"\n          }\n        ],\n        \"bestTimeToVisit\": \"Morning and evening for pleasant weather and fewer crowds.\"\n      }\n    ]\n  }\n}\n```\n\n**Explanation:**\n\n* **travelPlan:** Contains overall information about the trip.\n* **hotels:** Lists various hotel options with relevant details.\n* **itinerary:** Includes a day-wise plan with:\n    * **day:** Specifies the day of the trip.\n    * **plan:** Contains a list of places to visit on that day with:\n        * **placeName:** The name of the place.\n        * **placeDetails:** A brief description of the place.\n        * **placeImageUrl:** A link to an image of the place.\n        * **geoCoordinates:** The geographical coordinates of the place.\n        * **rating:** A rating of the place (optional).\n        * **ticketPricing:** Information about entry fees (if applicable).\n        * **timeToTravel:** An estimated time to spend at the place.\n    * **bestTimeToVisit:** Recommended time to visit during the day for optimal weather and crowd conditions.\n\n**Note:** This is a sample plan, you can customize it further based on your preferences, interests, and travel style.\n"},
          ],
        },
      ],
    });


  