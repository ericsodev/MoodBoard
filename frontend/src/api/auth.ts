export async function renewToken() {
  await fetch("/auth/token", {
    credentials: "include",
  });
}
