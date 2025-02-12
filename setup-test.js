import dotenv from 'dotenv';
import { config } from '@vue/test-utils';

// Charger les variables depuis le fichier .env
const envFile = '.env';
dotenv.config({ path: envFile });

config.global.stubs['router-link'] = true;