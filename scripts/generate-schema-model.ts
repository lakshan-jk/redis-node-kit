import fs from "fs";
import path from "path";

interface Field {
  name: string;
  type: any;
  required?: boolean;
}

function generateSchema(collectionName: string, fields: Field[]): string {
  const schemaContent = `
import mongoose, { Document, Schema } from 'mongoose';

export interface I${collectionName} extends Document {
${fields.map((field) => `  ${field.name}: ${field.type};`).join("\n")}
}

const ${collectionName.toLowerCase()}Schema = new Schema<I${collectionName}>({
${fields
  .map(
    (field) =>
      `  ${field.name}: { type: ${field.type},${
        field.required ? " required: true," : ""
      } },`
  )
  .join("\n")}
});

export const ${collectionName}Model = mongoose.model<I${collectionName}>('${collectionName}', ${collectionName.toLowerCase()}Schema);
`;

  return schemaContent;
}

function generateModel(collectionName: string): string {
  return `
import { I${collectionName} } from '../schema/${collectionName.toLowerCase()}.model';
import { ${collectionName}Type } from '../types/${collectionName.toLowerCase()}.type';

// Additional model logic can be added here if needed
`;
}

function saveToFile(content: string, filePath: string): void {
  fs.writeFileSync(filePath, content);
  console.log(`File created: ${filePath}`);
}

function generateSchemaModelTypes(
  collectionName: string,
  fields: Field[]
): void {
  const schemaContent = generateSchema(collectionName, fields);
  const modelContent = generateModel(collectionName);

  const schemaPath = path.join(
    __dirname,
    `../schema/${collectionName.toLowerCase()}.model.ts`
  );
  const modelPath = path.join(
    __dirname,
    `../models/${collectionName.toLowerCase()}.model.ts`
  );

  saveToFile(schemaContent, schemaPath);
  saveToFile(modelContent, modelPath);
}

const collectionName = "Student";
const fields: Field[] = [
  { name: "name", type: "String", required: true },
  { name: "age", type: "Number", required: true },
  { name: "grade", type: "String", required: true },
];

generateSchemaModelTypes(collectionName, fields);
