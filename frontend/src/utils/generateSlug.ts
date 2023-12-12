export const generateSlug = (data: string) => {
  // Replace spaces with underscores and generate a random string
  const sanitizedData = data.replace(/\s+/g, "_");
  const randomString = Math.random().toString(36).substring(2, 15);

  // Concatenate the sanitized data and random string
  const slug = `${sanitizedData}_${randomString}`;

  return slug;
};
