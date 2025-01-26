/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose";

const customGenerateId = async (
  idPrefix: string,
  collectionName: Model<any>
) => {
  let currentId = (0).toString();
  const lastId = await collectionName
    .findOne(
      {},
      {
        id: 1,
        _id: 0,
      }
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  if (lastId) {
    currentId = lastId?.id.split("-")[1];
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${idPrefix}-${incrementId}`;
  return incrementId;
};

export default customGenerateId;
