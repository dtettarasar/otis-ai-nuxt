import mongoose from 'mongoose';

let isConnected = false;

const config = useRuntimeConfig();

export async function initDB() {

    if (isConnected) {
        console.log('MongoDB is already connected.');
        return;
    }

    try {
        const connection = await mongoose.connect(config.mongoUri);
        isConnected = connection.connections[0].readyState;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
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
