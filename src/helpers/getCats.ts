export default async ({
  breedID,
  page,
}: {
  breedID: string | undefined;
  page: number;
}) => {
  let data;

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
      data = response.json();
    } else {
      alert(
        `Hairball Error\n\nApologies but we could not load new cats for you at this time! Miau!`
      );
    }
  } catch (error: unknown) {
    if (typeof error === `string`) {
      alert(
        `Hairball Error\n\nApologies but we could not load new cats for you at this time! Miau!`
      );
    }
    if (error instanceof Error) {
      alert(
        `Hairball Error\n\nApologies but we could not load new cats for you at this time! Miau!`
      );
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      alert(
        `Hairball Error\n\nApologies but we could not load new cats for you at this time! Miau!`
      );
    }
  } finally {
  }

  // Success
  if (data) {
    return data;
  }
};
