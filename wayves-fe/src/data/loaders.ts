import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";

export async function getHomePage() {
  const path = "/api/home";
  const BASE_URL = "http://localhost:1337/api/home";
  const url = new URL(path, BASE_URL);
}