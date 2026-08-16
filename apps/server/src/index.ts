import { log } from "@repo/logger";
import { createServer } from "./server";
import "dotenv/config";

(async () => {
  const port = process.env.PORT || 5001;
  const server = await createServer();

  server.listen(port, () => {
    log(`api running on ${port}`);
  });
})();
