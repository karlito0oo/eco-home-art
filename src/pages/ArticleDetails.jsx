import { useParams, useNavigate } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "HAZARDOUS WASTE MANAGEMENT",
    description:
      " Hazardous waste poses a significant challenge when it comes to proper management.",
    content:
      "<div><p>Hazardous waste poses a significant challenge when it comes to proper management. It is crucial to handle it in a way that prevents its detrimental effects on the environment and human health. Based on the guidelines and procedural manual of the DENR DAO92-29 hazardous waste management and to ensure compliance with the EPR law, we have developed an end to end solution to assist waste generators in our country.</p><br/><br/><p>References:<br/> <a href='https://www.env.go.jp/en/recycle/asian_net/Country_Information/Law_N_Regulation/Philippines/DAO%202004-36.pdf'>Procedural Manual Title lll DAO 92-29 'Hazardous Waste Management'</a> <br/><a href='https://legacy.senate.gov.ph/republic_acts/ra%2011898.pdf'>Republic Act No. 11898 EPR Law</a><br/> <a href='https://www2.deloitte.com/ph/en/pages/risk/articles/epr-law-philippines.html'>More info on EPR Law</a></p></div>",
    image: "/articles/Screenshot_258.png",
  },
  {
    id: 2,
    title: "PHILIPPINE INTERNATIONAL FURNITURE SHOW",
    description:
      "WASTO & EcohomeArt showcased upcycled products from plastic waste and marine litter at the 2023 Philippine International Furniture Show.",
    content:
      "WASTO Waste Solutions & EcohomeArt also participated in the Philippine International Furniture Show 2023 from March 9-11 at SMX Convention Center Manila, Mall of Asia Complex in Pasay City to showcase the newly launched upcycled products from plastic waste materials & marine litter.",
    image: "/articles/Screenshot_259.png",
  },
  {
    id: 3,
    title: "Eco Home Art Polyplastics",
    description:
      "POLYPLASTICS upcycles plastic waste into stylish, durable, and sustainable furniture, lighting, and accessories.",
    content:
      "POLYPLASTICS transforms rigid & flexible plastic waste into stylish and sustainable furniture, lighting, and accessories. By upcycling discarded plastics, we create innovative designs that merge durability with eco-conscious craftsmanship, giving waste a second life with purpose and style.",
    image: "/articles/Screenshot_260.png",
  },
];

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Article not found
        </h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const el = document.getElementById("articles-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto py-16 px-4"
      style={{ paddingTop: "120px" }}
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        {article.title}
      </h2>
      <p
        className="mb-8 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></p>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}
