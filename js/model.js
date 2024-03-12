const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const submitBtn = document.getElementById("submit-btn");

let resolve_action;
let reject_action;

const promise = new Promise((resolve, reject) => {
  resolve_action = resolve;
  reject_action = reject;
});

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  return promise;
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  resolve_action(undefined);
};

const submitForm = function () {
  const name = document.getElementById("name").value;
  const rootOption = document.getElementById("rootOptions").value;
  const genericOption = document.getElementById("genericOptions").value;

  resolve_action({name, rootOption, genericOption});
  closeModal();
}

submitBtn.addEventListener("click", submitForm);
overlay.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modalClose();
  }
});

const rootSelect = document.getElementById("rootOptions");

if(rootSelect && rootGroups) {  
  rootGroups.forEach(element => { 
    const option = document.createElement("option");
    option.text = atob(element);
    option.value = element;
    rootSelect.add(option);
  });
}

const genericSelect = document.getElementById("genericOptions");

if(genericSelect && rootGroups) {  
  childGroups.forEach(element => { 
    const option = document.createElement("option");
    option.text = atob(element);
    option.value = element;
    genericSelect.add(option);
  });
}
