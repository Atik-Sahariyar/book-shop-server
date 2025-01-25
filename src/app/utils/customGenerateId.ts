import { Model } from "mongoose";

const customGenerateId = async (
  idPrefix: string,
  collectionName: Model<any>
) => {
  let currentId = (0).toString();
  const lastCategoryId = await collectionName
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

  if (lastCategoryId) {
    currentId = lastCategoryId.id.substring(9);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${idPrefix}-${incrementId}`;
  return incrementId;
};

export default customGenerateId;
