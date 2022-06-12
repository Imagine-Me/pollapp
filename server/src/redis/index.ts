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

export const getRedisRoom = async (roomId: string) => {
  const result = await client.GET(roomId);
  if (result) {
    return JSON.parse(result);
  }
  return {};
};

export const updateRedisRoom = async (
  roomId: string,
  data: Record<string, any>
) => {
  const roomData = await getRedisRoom(roomId);
  delete roomData.answer;
  const newData = {
    ...roomData,
    ...data,
  };
  await client.set(roomId, JSON.stringify(newData));
};

client.on("error", (err) => console.log("Redis Client Error", err));
