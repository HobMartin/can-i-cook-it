export function isValid(value: unknown): boolean {
  if (Array.isArray(value)) {
    // If the value is an array, validate each element in the array
    return value.every(isValid);
  } else if (typeof value === "object" && value !== null) {
    // If the value is an object, validate each property in the object
    return Object.entries(value).every(([key, val]) => {
      switch (key) {
        case "name":
        case "difficult":
        case "description":
          // Apply specific validation for non-empty strings for certain fields
          return typeof val === "string" && val.trim() !== "";
        case "timeToCook":
          // Apply specific validation for positive numbers for the timeToCook field
          return typeof val === "number" && val > 0;
        case "ingredients":
        case "steps":
          // Validate recursively for arrays of objects (optional fields)
          return Array.isArray(val) && val.every(isValid);
        case "image":
          // Validate image field as optional (if present, it must be a non-null value)
          return (
            val === null ||
            (typeof val["uri"] === "string" && val["uri"].trim() !== "")
          );
        case "receiptImage":
          // Validate receiptImage field as optional (if present, it must be a non-null value)
          return (
            val !== null &&
            typeof val["uri"] === "string" &&
            val["uri"].trim() !== ""
          );
        default:
          // Handle other optional fields here
          return true;
      }
    });
  } else {
    // For non-object, non-array values, apply your specific validation logic
    return typeof value === "string" && value.trim() !== "";
  }
}

export function getInvalidFields(value: unknown, parentKey?: string): string[] {
  if (Array.isArray(value)) {
    // If the value is an array, validate each element in the array
    const invalidFields: string[] = [];
    value.forEach((element, index) => {
      const elementInvalidFields = getInvalidFields(
        element,
        `${parentKey}[${index}]`
      );
      invalidFields.push(...elementInvalidFields);
    });
    return invalidFields;
  } else if (typeof value === "object" && value !== null) {
    // If the value is an object, validate each property in the object
    const invalidFields: string[] = [];
    for (const [key, val] of Object.entries(value)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      switch (key) {
        case "name":
        case "difficult":
        case "description":
          // Apply specific validation for non-empty strings for certain fields
          if (!(typeof val === "string" && val.trim() !== "")) {
            invalidFields.push(currentKey);
          }
          break;
        case "timeToCook":
          // Apply specific validation for positive numbers for the timeToCook field
          if (!(typeof val === "number" && val > 0)) {
            invalidFields.push(currentKey);
          }
          break;
        case "ingredients":
        case "steps":
          // Validate recursively for arrays of objects (optional fields)
          const elementInvalidFields = getInvalidFields(val, currentKey);
          invalidFields.push(...elementInvalidFields);
          break;
        case "image":
          // Validate image field as optional (if present, it must be a non-null value)
          if (
            !(
              val === null ||
              (typeof val["uri"] === "string" && val["uri"].trim() !== "")
            )
          ) {
            invalidFields.push(currentKey);
          }
          break;
        case "receiptImage":
          // Validate receiptImage field as optional (if present, it must be a non-null value)
          if (
            !(
              val !== null &&
              typeof val["uri"] === "string" &&
              val["uri"].trim() !== ""
            )
          ) {
            invalidFields.push(currentKey);
          }
          break;
        default:
          // Handle other optional fields here
          // For simplicity, we're considering other fields as valid in this example
          break;
      }
    }
    return invalidFields;
  } else {
    // For non-object, non-array values, apply your specific validation logic
    const currentKey = parentKey || "value";
    if (!(typeof value === "string" && value.trim() !== "")) {
      return [currentKey];
    }
    return [];
  }
}

export function parseProperty(str: string) {
  const match = str.match(/^\w+/); // Match the first word (property name)
  return match ? match[0] : null;
}
