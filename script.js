const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function (oneCat) {

        //create links 
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`);
        a.textContent = oneCat;
        document.querySelector("header>nav").appendChild(a);

        //create section
        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);
    })

    getProducts();
}


function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })

}

function showData(jsonData) {
    jsonData.forEach(showDish)
    console.log(jsonData)
}

function showDish(dish) {
    const template = document.querySelector("template").content;

    const clone = template.cloneNode(true);

    
    clone.querySelector("h4").textContent = dish.name;
    clone.querySelector("p").textContent = dish.shortdescription;


    const imageName = dish.image; // this would be dynamic
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    clone.querySelector("img").src = smallImg;
    if(dish.vegetarian == false){
        clone.querySelector(".vegetarian").remove()
    }
    
    //const parent = document.querySelector("main");
    //parent.appendChild(clone);
    //document.querySelector("main").appendChild(clone);

    console.log(`#${dish.category}`)
    //document.querySelector(`#${dish.category}`).appendChild(clone);


    
  
        clone.querySelector("button").addEventListener("click", () => {
            console.log("click", dish)
          fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
        });
      


    document.querySelector(`#${dish.category}`).appendChild(clone);

}

function showDetails(data) {
    console.log(data)
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-region").textContent = data.region;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  //...
  modal.classList.remove("hide");
}

  
