import path from "path";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const loadedTypes = loadFilesSync(path.join(__dirname, "/**/*.typeDefs.js"));
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "/**/*.resolvers.js")
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
