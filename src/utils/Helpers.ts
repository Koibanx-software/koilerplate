export const decodeBasicCredentials = (
  basicCredentials: string
): { username: string; password: string } => {
  const decodeData = Buffer.from(
    basicCredentials.replace("Basic", ""),
    "base64"
  ).toString("utf-8");
  const [username, password] = decodeData.split(":");
  return { username, password };
};

export const encodeBasicCredentials = (
  username: string,
  password: string
): string => {
  const token = username + ":" + password;
  return `Basic ${Buffer.from(token).toString("base64")}`;
};
