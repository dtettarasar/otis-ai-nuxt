import { initDB } from '../database/database.js';

const config = useRuntimeConfig();

export default defineNitroPlugin(async () => {
    await initDB(config.mongoUri);
});