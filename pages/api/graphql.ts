import apollo, { startServer } from "../../libs/apollo";
import Cors from "micro-cors";

const cors = Cors({
  origin: "*",
  allowCredentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: [
    "access-control-allow-credentials",
    "access-control-allow-origin",
    "content-type",
  ],
});

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apollo.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "64mb",
  },
};
