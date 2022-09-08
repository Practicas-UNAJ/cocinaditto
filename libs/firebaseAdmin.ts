import admin from "firebase-admin";
import serviceAccount from "../modules/firebase/serviceAccount.json";

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });

const auth = admin.auth();

export default { auth };
