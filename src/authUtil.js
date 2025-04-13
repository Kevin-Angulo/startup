export async function checkAuth() {
  const res = await fetch("/api/user/me", {
    credentials: "include",
  });

  if (res.ok) {
    return await res.json();
  } else {
    return null;
  }
}
