import { app } from "./app";
import { env } from "./infra/utils/environments";

app.listen({ host: "0.0.0.0", port: env.PORT }, (_, path) => {
  console.log(`application running at ${path}`);
});
