import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import uploadImage from "../../../firebase/uploadImage";
import ApolloContext from "../../types/context";

const EditUser = async (
  _parent: any,
  { payload }: { payload: Partial<User> },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  let thumbnail = undefined;

  if (payload.thumbnail) {
    const uuid = v4();
    const result = await uploadImage(
      payload.thumbnail,
      `users/${ctx.user.id}/${uuid}.png`
    );

    thumbnail = result.downloadUrl;
  }

  const edited = await ctx.prisma.user.update({
    where: {
      id: ctx.user.id,
    },
    data: {
      username: payload.username ?? undefined,
      thumbnail: thumbnail ?? undefined,
      country: payload.country ?? undefined,
    },
  });

  return Boolean(edited);
};

export default EditUser;
