import { useTranslation } from "react-i18next";

const cuisines = [
  {
    name: "Pizza",
    translationKey: "pizza",
    image: "/pictures/pizza.jpg"
  },
  {
    name: "Fast Food",
    translationKey: "fastFood",
    image: "/pictures/fastfood.jpg"
  },
  {
    name: "Burgers",
    translationKey: "burgers",
    image: "/pictures/burger.jpg"
  },
  {
    name: "BBQ",
    translationKey: "bbq",
    image: "/pictures/bbq.jpg"
  },
  {
    name: "Desserts",
    translationKey: "desserts",
    image: "/pictures/desserts.jpg"
  },
  {
    name: "Pakistani",
    translationKey: "pakistani",
    image: "/pictures/pakistani.jpg"
  },
  {
    name: "Shawarma",
    translationKey: "shawarma",
    image: "/pictures/shawarma.jpg"
  },
  {
    name: "Continental",
    translationKey: "continental",
    image: "/pictures/continental.jpg"
  },
  {
    name: "Healthy",
    translationKey: "healthy",
    image: "/pictures/healthy.jpg"
  }
];


function CuisineSection({
  onCuisineSelect,
  selectedCuisine
}) {

  const { t } = useTranslation();

  return (

    <section className="cuisine-section">

      <h2>
        {t("cuisine.title")}
      </h2>


      <div className="cuisine-row">

        {cuisines.map((cuisine) => (

          <button
            key={cuisine.name}

            className={
              selectedCuisine === cuisine.name
                ? "cuisine-card selected"
                : "cuisine-card"
            }

            onClick={() =>
              onCuisineSelect(cuisine.name)
            }
          >

            <img
              src={cuisine.image}
              alt={t(
                `cuisine.items.${cuisine.translationKey}`
              )}
            />

            <span>
              {t(
                `cuisine.items.${cuisine.translationKey}`
              )}
            </span>

          </button>

        ))}

      </div>

    </section>

  );
}


export default CuisineSection;