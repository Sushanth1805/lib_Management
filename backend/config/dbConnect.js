const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb+srv://s09082003:hsshreyas00@cluster0.umllk4h.mongodb.net/book-collection', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('DB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = dbConnect;

// Call the function to establish the database connection
dbConnect();
