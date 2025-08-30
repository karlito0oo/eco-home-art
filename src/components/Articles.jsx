import { useNavigate } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "HAZARDOUS WASTE MANAGEMENT",
    description:
      " Hazardous waste poses a significant challenge when it comes to proper management.",
    content:
      "<div><p>Hazardous waste poses a significant challenge when it comes to proper management. It is crucial to handle it in a way that prevents its detrimental effects on the environment and human health. Based on the guidelines and procedural manual of the DENR DAO92-29 on hazardous waste management and to ensure compliance with the EPR law, we have developed an end to end solution to assist waste generators in our country.</p><p>References: <a href='https://www.env.go.jp/en/recycle/asian_net/Country_Information/Law_N_Regulation/Philippines/DAO%202004-36.pdf'>Procedural Manual Title lll DAO 92-29 'Hazardous Waste Management'</a> <a href='https://legacy.senate.gov.ph/republic_acts/ra%2011898.pdf'>Republic Act No. 11898 EPR Law</a> <a href='https://www2.deloitte.com/ph/en/pages/risk/articles/epr-law-philippines.html'>More info on EPR Law</a></p></div>",
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

export default function Articles() {
  const navigate = useNavigate();
  return (
    <section id="articles-section" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Articles
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-green-700">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
              </div>
              <button
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={() => navigate(`/articles/${article.id}`)}
              >
                Know More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
