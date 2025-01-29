import mongoose from 'mongoose';

let isConnected = false;

mongoose.set('debug', true);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export async function initDB(mongoDBUrl) {

    console.log('start initDB function');
    console.log('MongoDB url: ');
    console.log(mongoDBUrl);

    if (isConnected) {
        console.log('MongoDB is already connected.');
        return;
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        const connection = await mongoose.connect(mongoDBUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 sec pour éviter un timeout rapide
        });
        isConnected = connection.connections[0].readyState;
        console.log('Connected to MongoDB');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        console.trace();
        throw error;
    }
}

export async function closeDB() {
    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error while closing MongoDB connection:', error);
    }
}

// Optionnel : Gérer les signaux pour une fermeture propre
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeDB();
    process.exit(0);
});

export default { initDB, closeDB };
