export const siteUrl = "https://amaardevelopers.com";

export const siteDescription =
  "Amaar is a real estate developer working across Afghanistan, with an office in Aino Mina, Kandahar.";

export const company = {
  name: "Amaar",
  category: "Real Estate Developer",
  summary:
    "Amaar develops residential, commercial, and mixed-use buildings in Afghanistan, joining contemporary architecture with Afghan design.",
  location: {
    street: "M3 Road",
    district: "Aino Mina",
    city: "Kandahar",
    country: "Afghanistan",
  },
  contact: {
    mobile: "+93 77 717 6176",
    mobileHref: "tel:+93777176176",
    whatsapp: "+93 70 000 7833",
    whatsappHref: "https://wa.me/93700007833",
    email: "info@amaardevelopers.com",
    emailHref: "mailto:info@amaardevelopers.com",
  },
  links: {
    facebook: "https://www.facebook.com/AmaarDevelopers",
    website: "https://amaardevelopers.com",
  },
} as const;

export function formatLocation(style: "short" | "full" = "full") {
  const { street, district, city, country } = company.location;

  if (style === "short") {
    return `${district}, ${city}`;
  }

  return `${street}, ${district}, ${city}, ${country}`;
}
