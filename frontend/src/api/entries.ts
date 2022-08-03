import { Entry } from "../types/Entry";
export async function submitEntry(
  entry: Entry,
  token: string
): Promise<Entry | null> {
  try {
    const res = await fetch("/api/entry", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data as Entry;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteEntry(date: Date, token: string): Promise<boolean> {
  try {
    await fetch("/api/entry", {
      method: "DELETE",
      body: JSON.stringify({ date: date }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (e) {
    return false;
  }
}
