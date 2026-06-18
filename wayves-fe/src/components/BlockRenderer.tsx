import type { Block } from "@/types";
import { HeroSection } from "@/components/blocks/HeroSection";
import { InfoBlock } from "@/components/blocks/InfoBlock";

function blockRenderer(block: Block) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={block.id} />;
    case "blocks.info-block":
      return <InfoBlock {...block} key={block.id} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block) => blockRenderer(block));
}