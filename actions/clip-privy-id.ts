export const clipBeforeLastColon = (input: string | undefined): string | null => {
  if (input === undefined) return null
  return input.substring(input.lastIndexOf(":") + 1);
};