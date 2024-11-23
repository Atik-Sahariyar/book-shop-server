import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    console.log("connecting to database ...")
    await mongoose.connect(config.database_url as string, { dbName: config.db_name });

    app.listen(config.port, () => {
      console.log(`Book shop server is runing on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
