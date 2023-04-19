export default async ({ breedID, page }: { breedID: string; page: number }) => {
  try {
    const response = await fetch(
      // `https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=abys`,
      `https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${breedID}`,
      {
        // *GET, POST, PATCH, PUT, DELETE
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*", // Same as axios
          "Content-Type": "application/json",
        },
        // For POST/PUT requests
        // body: JSON.stringify({ key: "value" }),
      }
    );
    if (response?.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error: ${response}`);
    }
  } catch (error: unknown) {
    if (typeof error === `string`) {
      throw new Error(`There was an error: ${error}`);
    }
    if (error instanceof Error) {
      throw new Error(`There was an error: ${error.message}`);
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      throw new Error(`Syntax Error: ${error}`);
    }
  } finally {
  }
};
