import { initDB } from '../database/database.js';

export default defineNitroPlugin(async () => {
    await initDB();
});