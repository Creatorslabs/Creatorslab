export async function switchRole(
  userId: string,
  newRole: "user" | "creator"
): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/switch-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRole }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert(`Successfully switched role to ${newRole}!`);
    return true;
  } catch (err) {
    console.error("Role switch failed:", err);
    alert("Error switching role. Please try again.");
    return false;
  }
}
