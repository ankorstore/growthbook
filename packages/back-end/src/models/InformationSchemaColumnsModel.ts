import omit from "lodash/omit";
import mongoose from "mongoose";
import uniqid from "uniqid";
import {
  Column,
  InformationSchemaColumnsInterface,
} from "../../types/information-source";

const informationSchemaColumnsSchema = new mongoose.Schema({
  id: String,
  organization: String,
  columns: [
    {
      id: String,
      column_name: String,
      data_type: String,
      path: String,
    },
  ],
  dateCreated: Date,
  dateUpdated: Date,
});

type InformationSchemaColumnsDocument = mongoose.Document &
  InformationSchemaColumnsInterface;

const InformationSchemaColumnsModel = mongoose.model<InformationSchemaColumnsDocument>(
  "InformationSchemaColumns",
  informationSchemaColumnsSchema
);

/**
 * Convert the Mongo document to an InformationSourceInterface, omitting Mongo default fields __v, _id
 * @param doc
 */
const toInterface = (
  doc: InformationSchemaColumnsDocument
): InformationSchemaColumnsInterface => omit(doc.toJSON(), ["__v", "_id"]);

export async function createInformationSchemaColumns(
  columns: Column[],
  organization: string
) {
  const result = await InformationSchemaColumnsModel.create({
    id: uniqid("cols_"),
    organization,
    columns,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  });

  return toInterface(result);
}
