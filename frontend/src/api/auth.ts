export async function renewToken() {
  const res = await fetch("http://localhost:5000/auth/token", {
    credentials: "include",
  });
}
