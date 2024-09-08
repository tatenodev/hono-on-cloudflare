import { Hono } from "hono";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

type Env = {
	Variables: {
		supabase: SupabaseClient;
	};
	Bindings: {
		SUPABASE_URL: string;
		SUPABASE_KEY: string;
	};
};

export const createHonoWithDB = () => {
	const app = new Hono<Env>();
	app.use(async (c, next) => {
		const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY);
		c.set("supabase", supabase);
		await next();
	});
	return app;
};
