import {
  ObjectType as TypeGraphQLObjectType,
  ObjectTypeOptions,
} from "type-graphql";
import {
  CrudOperationsAndAll,
  getMerlinMetadataStorage,
} from "./../../../utils/metadata-storage";

export function ObjectType(
  filePath: string,
  operations: CrudOperationsAndAll[]
): ClassDecorator;
export function ObjectType(
  filePath: string,
  operations: CrudOperationsAndAll[],
  options: ObjectTypeOptions
): ClassDecorator;
export function ObjectType(
  filePath: string,
  operations: CrudOperationsAndAll[],
  name: string,
  options?: ObjectTypeOptions
): ClassDecorator;
export function ObjectType(
  filePath: string,
  operations: CrudOperationsAndAll[],
  nameOrOptions?: string | ObjectTypeOptions,
  maybeOptions?: ObjectTypeOptions
): ClassDecorator {
  return (target) => {
    const merlinGqlMetadataStorage = getMerlinMetadataStorage();
    //Class with applied decorator
    const superClass = Object.getPrototypeOf(target);
    const superClassName = superClass.name;
    //Get BaseModel Class
    const baseSuperClassName = Object.getPrototypeOf(superClass).name;

    const metadataEntry = merlinGqlMetadataStorage.objectTypes[superClassName];
    if (metadataEntry) {
      metadataEntry.extends = baseSuperClassName;
      metadataEntry.filePath = filePath;
      metadataEntry.operations = operations;
    } else {
      merlinGqlMetadataStorage.objectTypes = {
        ...merlinGqlMetadataStorage.objectTypes,
        ...{
          [superClassName]: {
            filePath: filePath,
            fields: [],
            extends: baseSuperClassName,
            operations: operations,
          },
        },
      };
    }
    return TypeGraphQLObjectType(
      nameOrOptions as any,
      maybeOptions
    )(superClass);
  };
}
