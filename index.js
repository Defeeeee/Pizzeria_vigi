import "dotenv/config"
import { createPool } from 'mysql2/promise'

const conn = createPool()