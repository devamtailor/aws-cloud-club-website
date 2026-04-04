import { app } from "./app";
import bcrypt from "bcryptjs";
import { connectDatabase } from "./config/db";
import { env } from "./config/env";
import { User } from "./models/User";

const ensureAdminExists = async (): Promise<void> => {
  const existing = await User.findOne({ email: env.ADMIN_EMAIL }).exec();

  if (existing) {
    return;
  }

  const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 10);

  await User.create({
    email: env.ADMIN_EMAIL,
    password: hashedPassword
  });

  // eslint-disable-next-line no-console
  console.log("Default admin seeded");
};

const bootstrap = async (): Promise<void> => {
  await connectDatabase();
  await ensureAdminExists();

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${env.PORT}`);
  });
};

bootstrap().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error("Bootstrap failed", error);
  process.exit(1);
});
