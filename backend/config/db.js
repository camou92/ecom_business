const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://mohamed:Orange@2020@cluster0.yftj0.mongodb.net/k_business",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )

    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("failed to connect to MongoDB", err));
