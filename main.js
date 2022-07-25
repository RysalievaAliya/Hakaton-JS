API = "http://localhost:8000/students";

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

let searchVal = "";

button.addEventListener("click", async () => {
  let obj = {
    photo: photo.value,
    name: name.value,
    surname: surname.value,
    kpi: kpi.value,
    groups: groups.value,
    number: number.value,
    email: email.value,
    gitHub: gitHub.value,
    button: button.value,
  };

  await fetch(API, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  photo.value = "";
  name.value = "";
  surname.value = "";
  groups.value = "";
  render();
});

async function render() {
  let products = await fetch(`${API}?q=${searchVal}`).then((res) => res.json());

  list.innerHTML = "";

  products.forEach((element) => {
    let newElem = document.createElement("div");
    newElem.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${element.photo}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-photo">${element.name}</h5>
                <h5 class="card-photo">${element.surname}</h5>
                <p class="card-text">${element.kpi}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${element.groups}</li>
                <li class="list-group-item">${element.number}</li>
                <li class="list-group-item">${element.email}</li>
                <li class="list-group-item">${element.gitHub}</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link btn-delete"  id=${element.id} >Delete</a>
                <a href="#" class="card-link btn-edit"  id=${element.id}>Edit</a>
            </div>
        </div>`;

    list.append(newElem);
  });
}
render();

let editPhoto = document.querySelector(".edit-photo");
let editName = document.querySelector(".edit-name");
let editSurname = document.querySelector(".edit-surname");
let editKpi = document.querySelector(".edit-kpi");
let editGroups = document.querySelector(".edit-groups");
let editNumber = document.querySelector(".edit-number");
let editEmail = document.querySelector(".edit-email");
let editGitHub = document.querySelector(".edit-gitHub");
let btnSaveEdit = document.querySelector("#btn-save-edit");

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let answer = confirm("are you sure?");
    let id = e.target.id;

    if (answer) {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      render();
    }
  }
});

// searchInp.addEventListener("input", () => {
//   searchVal = searchInp.value;
//   console.log(searchInp.value);
//   render();
// });

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editPhoto.value = data.photo;
        editName.value = data.name;
        editSurname.value = data.surname;
        editKpi.value = data.kpi;
        editGroups.value = data.groups;
        editNumber.value = data.number;
        editEmail.value = data.email;
        editGitHub.value = data.gitHub;
        btnSaveEdit.setAttribute("id", data.id);
      });
  }
});

btnSaveEdit.addEventListener("click", (e) => {
  let id = e.target.id;
  let photo2 = editPhoto.value;
  let name2 = editName.value;
  let surname2 = editSurname.value;
  let groups2 = editGroups.value;
  let number2 = editNumber.value;
  let email2 = editEmail.value;
  let gitHub2 = editGitHub.value;

  let edittedProduct = {
    photo: photo2,
    name: name2,
    surname: surname2,
    groups: groups2,
    number: number2,
    email: email2,
    gitHub: gitHub2,
  };
  saveEdit(edittedProduct, id);
});

function saveEdit(edittedProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(edittedProduct),
  }).then(() => {
    render();
  });
}
