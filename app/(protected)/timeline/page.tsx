import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth()

  return (
    <>
    {JSON.stringify(session)}
    <form action={async () => {
      "use server"

      await signOut()
    }}>
      <button type="submit">
        Sign Out
      </button>
    </form>
      <h1 className="head-text text-left">TimeLine</h1>
    </>
  );
}
