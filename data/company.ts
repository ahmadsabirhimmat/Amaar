export const siteUrl = "https://timetowers.af";

export const siteDescription =
  "Time Towers (ټايم ټاورز) is a residence and real estate address on 26th Street, 2nd Aino Mina, District 11, Kandahar. The office is always open.";

export const company = {
  name: "Time Towers",
  localName: "ټايم ټاورز",
  category: "Residence · Real Estate",
  summary:
    "Time Towers is a residence in 2nd Aino Mina, Kandahar, with an office on 26th Street in District 11. The office is always open.",
  location: {
    street: "26th Street",
    district: "2nd Aino Mina",
    area: "District #11",
    city: "Kandahar",
    country: "Afghanistan",
  },
  contact: {
    mobile: "+93 70 004 0086",
    mobileHref: "tel:+93700040086",
    whatsapp: "+93 70 004 0086",
    whatsappHref: "https://wa.me/93700040086",
  },
  links: {
    facebook:
      "https://www.facebook.com/p/Time-Towers-%D9%BC%D8%A7%D9%8A%D9%85-%D9%BC%D8%A7%D9%88%D8%B1%D8%B2-61590567833222/",
    website: "https://timetowers.af",
    websiteLabel: "timetowers.af",
  },
} as const;

export function formatLocation(style: "short" | "full" = "full") {
  const { street, district, area, city, country } = company.location;

  if (style === "short") {
    return `${district}, ${city}`;
  }

  return `${street}, ${district}, ${area}, ${city}, ${country}`;
}
