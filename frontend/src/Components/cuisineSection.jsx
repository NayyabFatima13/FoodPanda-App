import { useState } from "react";

const cuisines = [
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300"
  },
  {
    name: "Fast Food",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
  },
  {
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300"
  },
  {
    name: "BBQ",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300"
  },
  {
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300"
  },
  {
    name: "Pakistani",
    image:
      "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=300"
  },
  {
    name: "Shawarma",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300"
  },
   {
    name: "Continental",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Healthy",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
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