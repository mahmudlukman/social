import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  return (
    <>
    {JSON.stringify(session)}
      <h1 className="head-text text-left">TimeLine</h1>
    </>
  );
}
