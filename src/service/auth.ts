import { getDocById, setDocWithId } from "./generalRequests";

const signIn = async (username: string) => {
  if (!username || username.length === 0) return null;

  try {
    const suchUsernameExists = await getDocById("users", username);

    if (!suchUsernameExists) {
      await setDocWithId(username, { username });

      return username;
    }
    return suchUsernameExists?.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default signIn;
