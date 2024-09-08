import { createHonoWithDB } from "./utils/factory";

const app = createHonoWithDB();

app.get("/", async (c) => {
	return c.text("Hello Hono.");
});

app.get("/users", async (c) => {
	const { data, error } = await c.var.supabase.from("countries").select("*");
	if (error) throw error;
	return c.json(data);
});

export default app;
