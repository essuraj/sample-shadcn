import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  auth: {
    from: {
      source: "url",
      url: "http://localhost:8080/nms-auth/v3/api-docs",
    },
    outputDir: "/src/api/auth",
    to: async (context) => {
      const filenamePrefix = "auth";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
