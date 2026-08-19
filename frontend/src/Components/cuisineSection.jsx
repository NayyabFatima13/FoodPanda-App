import { useState } from "react";

const cuisines = [
  {
    name: "Pizza",
    image:
      "/pictures/pizza.jpg"
  },
  {
    name: "Fast Food",
    image:
      "/pictures/fastfood.jpg"
  },
  {
    name: "Burgers",
    image:
      "/pictures/burger.jpg"
  },
  {
    name: "BBQ",
    image:
      "/pictures/bbq.jpg"
  },
  {
    name: "Desserts",
    image:
      "/pictures/desserts.jpg"
  },
  {
    name: "Pakistani",
    image:
      "/pictures/pakistani.jpg"
  },
  {
    name: "Shawarma",
    image:
      "/pictures/shawarma.jpg"
  },
   {
    name: "Continental",
    image:
      "/pictures/continental.jpg"
  },
  {
    name: "Healthy",
    image:
      "/pictures/healthy.jpg"
  }

];


function CuisineSection({
  onCuisineSelect,
  selectedCuisine
}) {

  return (

    <section className="cuisine-section">

      <h2>
        Cuisines for you
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
              alt={cuisine.name}
            />

            <span>
              {cuisine.name}
            </span>

          </button>

        ))}

      </div>

    </section>

  );
}


export default CuisineSection;