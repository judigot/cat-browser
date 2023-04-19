export default async ({ catID }: { catID: string }) => {
  let data;

  try {
    const response = await fetch(
      // `https://api.thecatapi.com/v1/images/EHG3sOpAM`,
      `https://api.thecatapi.com/v1/images/${catID}`,
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
      alert(`Hairball Error\n\nApologies but we could not load the cat information for you.`);
    }
  } catch (error: unknown) {
    if (typeof error === `string`) {
      alert(`Hairball Error\n\nApologies but we could not load the cat information for you.`);
    }
    if (error instanceof Error) {
      alert(`Hairball Error\n\nApologies but we could not load the cat information for you.`);
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      alert(`Hairball Error\n\nApologies but we could not load the cat information for you.`);
    }
  } finally {
  }

  // Success
  if (data) {
    return data;
  }
};
