import { Post } from "@prisma/client";

export default interface PostModel extends Post {
  creator_name?: string;
}
