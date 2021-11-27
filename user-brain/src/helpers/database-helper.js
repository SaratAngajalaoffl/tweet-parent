import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    console.log(
      `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}?authSource=admin&w=majority&readPreference=primary&retryWrites=true&ssl=true`
    );
    await mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`);
    console.log('Connected to DB Successfully');
  } catch (err) {
    console.log(err);
    setTimeout(connectMongo, 2000);
  }
};

connectMongo();
