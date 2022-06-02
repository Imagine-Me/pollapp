import { createClient } from "redis";

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
});

export const connectRedis = async () => {
  await client.connect();
};

export const createRedisRoom = async (
  roomId: string,
  data: Record<string, any>
) => {
  await client.set(roomId, JSON.stringify(data));
};

client.on("error", (err) => console.log("Redis Client Error", err));
