import mongoose from 'mongoose';

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('DB CANNOT CONNECT');
    };
};

export default dbConection;