import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";

async function loader() {
  const data = await getHomePage();
  if (!data?.data) notFound();
  return { ...data.data };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];
  return <BlockRenderer blocks={blocks} />;
}
