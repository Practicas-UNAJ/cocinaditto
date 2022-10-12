import admin from "firebase-admin";
import serviceAccount from "../modules/firebase/serviceAccount.json";

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(
        Buffer.from(
          process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 as string,
          "base64"
        ).toString("ascii")
      ) as admin.ServiceAccount
    ),
  });

const auth = admin.auth();

export default { auth };
