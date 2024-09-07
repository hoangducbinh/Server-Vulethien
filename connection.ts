
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
   const connecttion = await mongoose.connect("mongodb+srv://hoangbinhtdmu:4YmVv8rICfdKPyl5@unread.yij84.mongodb.net/?retryWrites=true&w=majority&appName=Unread");
    if(connecttion) {
      console.log("Connected to database")
    }
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

export default connectToDatabase;