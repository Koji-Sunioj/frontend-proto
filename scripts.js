async function init() {
  //https://api.discogs.com/database/search?artist=KMFDM&format=album
  const url = "https://fakestoreapi.com/products";

  let fetched = await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error;
      }
    })
    .then((data) => data);

  const target = document.getElementById("test");

  fetched.sort((a, b) => {
    return b.rating.rate - a.rating.rate;
  });

  const stars = document.createElement("ul");
  stars.setAttribute("class", "stars");
  for (let i = 0; i < 5; i++) {
    stars.innerHTML += '<li class="star">&#10029;</li>';
  }

  function setStars(rating) {
    const rated = Math.round(rating);
    const stars = document.createElement("ul");
    const partial = rating % 1;
    for (let i = 1; i <= 5; i++) {
      const test = (i - rating).toFixed(2);
      if (test < 0.3) {
        stars.innerHTML += '<span class="fa fa-star  fa-solid orange"></span>';
      } else if (test >= 0.3 && test < 0.7) {
        stars.innerHTML += '<span class="fa fa-star-half-full orange"></span>';
      } else {
        stars.innerHTML += '<span class="fa fa-star-o fa-solid orange"></span>';
      }
    }
    stars.setAttribute("title", `${rating}`);
    return stars.outerHTML;
  }

  fetched.forEach((element) => {
    const tr = document.createElement("tr");
    tr.innerHTML += `<td class="img-column"><img class="img" src=${
      element.image
    } alt=""></td><td class="title-column">${element.title}</td><td>${
      element.category
    }</td><td>$${element.price.toFixed(2)}</td><td>${setStars(
      element.rating.rate
    )}${
      element.rating.rate
    }</td><td class="button-column"><button class="btn btn-primary">add to cart</button></td>`;
    target.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", init);
