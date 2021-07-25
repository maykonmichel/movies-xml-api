import mysql from 'mysql';

export const pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL || '');
