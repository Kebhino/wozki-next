export async function pobierzSlotyPlanowania() {
  const res = await fetch("/api/planowanie");

  if (!res.ok) {
    throw new Error("Nie udało się pobrać slotów do planowania.");
  }

  const json = await res.json();
  return json.sloty;
}
