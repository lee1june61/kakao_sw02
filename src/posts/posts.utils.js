import dbModel from "../../db/model";


// createPost 에서 앞으로 생성할 postId값 return
export const getPostId = async () => {
  const { postIdCounter } = await dbModel.counter.findOneAndUpdate(
    { _id: "65119cde3979d309d616e22d" },
    { $inc: { postIdCounter: 1 } },
    { new: true }
  );
  return postIdCounter;
};
