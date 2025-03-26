import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/blocks/HeroSection";

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();
  console.log(data);
  return { ...data.data }
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || []; 
  console.log(data); 
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <HeroSection {...blocks[0]} />
    </div>
  );
}
