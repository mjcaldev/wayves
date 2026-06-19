import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import type { Block } from "@/types";

interface HomePageResponse {
  data: {
    id: number;
    documentId: string;
    title?: string;
    description?: string;
    blocks?: Block[];
  };
}

const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              logo: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              cta: true,
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        },
      },
    },
  },
);

export async function getHomePage() {
  const path = "/api/home";
  const BASE_URL = getStrapiURL();

  const url = new URL(path, BASE_URL);
  url.search = homePageQuery;

  return await fetchAPI<HomePageResponse>(url.href, {
    method: "GET",
    next: { tags: ["home"] },
  });
}