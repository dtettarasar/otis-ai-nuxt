import mongoose from 'mongoose';

let isConnected = false;

// const config = useRuntimeConfig();

export async function initDB() {

    console.log('start initDB function');
    console.log('MongoDB url: ');
    console.log(process.env.DB_URL);

    if (isConnected) {
        console.log('MongoDB is already connected.');
        return;
    }

    try {
        const connection = await mongoose.connect(process.env.DB_URL);
        isConnected = connection.connections[0].readyState;
        console.log('Connected to MongoDB');
        return connection;
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

export default { initDB, closeDB };
