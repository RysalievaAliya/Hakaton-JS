API = 'http://localhost:8000/students';

let photo = document.querySelector(".photo");
let name = document.querySelector(".name");
let surname = document.querySelector(".surname");
let kpi = document.querySelector(".kpi");
let groups = document.querySelector(".groups");
let number = document.querySelector(".number");
let email = document.querySelector(".email");
let gitHub = document.querySelector(".gitHub");
let button = document.querySelector(".button");

let list = document.querySelector("#products-list");

btnAdd.addEventListener("click", async () => {r 

    let obj = {
        photo: photo.value,
        name: name.value,
        surname: surname.value,
        kpi: kpi.value,
        groups: groups.value,
        number: namber.value,
        email: email.value,
        gitHub: gitHub.value,
        button: button.value,
    };


    if (!obj.photo.trim() ||
        !obj.name.trim() ||
        !obj.surname.trim() ||
        !obj.kpi.trim() ||
        !obj.groups.trim() ||
        !obj.number.trim() ||
        !obj.email.trim() ||
        !obj.gitHub.trim() ||
        !obj.button.trim()
    ) {
        alert("fill all fields");
        return;
    }
    // запрос для добавления 

    await fetch(API, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    });
    title.value = "";
    price.value = "";
    descr.value = "";
    image.value = "";
    render();
});

async function render() {
    let products = await fetch(`${API}?q=${searchVal}`)
        .then((res) => res.json());
    // console.log(products); 

    list.innerHTML = "";

    products.forEach((element) => {
        // console.log(element); 
        let newElem = document.createElement("div");
        newElem.innerHTML = 
        `
        <div class="card" style="width: 18rem;">
            <img src="${element.photo}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <h5 class="card-title">${element.surname}</h5>
                <p class="card-text">${element.kpi}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${element.groups}</li>
                <li class="list-group-item">${element.number}</li>
                <li class="list-group-item">${element.email}</li>
                <li class="list-group-item">${element.gitHub}</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Delete</a>
                <a href="#" class="card-link">Edit</a>
            </div>
        </div>`;

        list.append(newElem);
    });
};
render();