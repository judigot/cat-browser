export default async () => {
  let data;

  try {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds`, {
      // *GET, POST, PATCH, PUT, DELETE
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*", // Same as axios
        "Content-Type": "application/json",
      },
      // For POST/PUT requests
      // body: JSON.stringify({ key: "value" }),
    });
    if (response?.ok) {
      data = response.json();
    } else {
      alert(
        `Hairball Error\n\nWe could not load the cat breeds for some reason. Maybe some other time?`
      );
    }
  } catch (error: unknown) {
    if (typeof error === `string`) {
      alert(
        `Hairball Error\n\nWe could not load the cat breeds for some reason. Maybe some other time?`
      );
    }
    if (error instanceof Error) {
      alert(
        `Hairball Error\n\nWe could not load the cat breeds for some reason. Maybe some other time?`
      );
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      alert(
        `Hairball Error\n\nWe could not load the cat breeds for some reason. Maybe some other time?`
      );
    }
  } finally {
  }

  // Success
  if (data) {
    return data;
  }
};
