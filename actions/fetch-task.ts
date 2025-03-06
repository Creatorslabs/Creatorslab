export async function fetchUserTasks(userId: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}tasks/available`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");

    return await res.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}
