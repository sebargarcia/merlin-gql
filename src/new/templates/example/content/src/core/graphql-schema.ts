import { loadOtFiles } from "merlin-gql";
import { DataGeneratorResolver } from "./../data-generator/data-generator";
import { buildSchema } from "type-graphql";

export const graphqlSchema = async () => {
  await loadOtFiles();
  return await buildSchema({
    resolvers: [
      __dirname + "/../_generated/**/*.resolver.{ts,js}",
      __dirname + "/../data-generator/data-generator.{ts,js}",
    ],
    emitSchemaFile: {
      path: __dirname + "../../../schema.gql",
      commentDescriptions: true,
      sortedSchema: false, // by default the printed schema is sorted alphabetically
    },
  });
};
