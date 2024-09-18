export async function signinService(FormData) {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    //getting response is the end of work service do
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
