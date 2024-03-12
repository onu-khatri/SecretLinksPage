class ModelPopup {
  modal;
  overlay;
  closeModalBtn;
  submitBtn;
  resolve_action;
  reject_action;
  promise;

  constructor() {
    this.modal = document.querySelector(".modal");
    this.overlay = document.querySelector(".overlay");
    this.closeModalBtn = document.querySelector(".btn-close");
    this.submitBtn = document.getElementById("submit-btn");

    this.promise = new Promise((resolve, reject) => {
      this.resolve_action = resolve;
      this.reject_action = reject;
    });

    this.addListeners();
    this.fillRootOptions();
    this.fillGenericOptions();
    this.submitForm = this.submitForm.bind(this);
  }

  openModal = function () {
    this.modal.classList.remove("hidden");
    this.overlay.classList.remove("hidden");
    return this.promise;
  };

  closeModal = (onsuccess = false) => {
    this.modal.classList.add("hidden");
    this.overlay.classList.add("hidden");
    if(!onsuccess) {
      this.resolve_action(undefined);
    }

    this.removeListener();
  };

  removeListener = function() {
    this.submitBtn.removeEventListener("click", this.submitForm);
    this.overlay.removeEventListener("click", this.closeModal);
    this.closeModalBtn.removeEventListener("click", this.closeModal);
    document.removeEventListener("keydown", this.checkEscKeyPress);
  }

  submitForm = (event$) => {
    const name = document.getElementById("name").value;
    const rootOption = document.getElementById("rootOptions").value;
    const genericOption = document.getElementById("genericOptions").value;

    this.resolve_action({ name, rootOption, genericOption });
    this.closeModal(true);
  };

  fillGenericOptions() {
    const genericSelect = document.getElementById("genericOptions");

    if (genericSelect && rootGroups) {
      childGroups.forEach((element) => {
        const option = document.createElement("option");
        option.text = atob(element);
        option.value = element;
        genericSelect.add(option);
      });
    }
  }

  fillRootOptions() {
    const rootSelect = document.getElementById("rootOptions");
    if (rootSelect && rootGroups) {
      rootGroups.forEach((element) => {
        const option = document.createElement("option");
        option.text = atob(element);
        option.value = element;
        rootSelect.add(option);
      });
    }
  }

  addListeners() {
    this.submitBtn.addEventListener("click", this.submitForm);
    this.overlay.addEventListener("click", this.closeModal);
    this.closeModalBtn.addEventListener("click", this.closeModal);

    document.addEventListener("keydown", this.checkEscKeyPress);
  }

  checkEscKeyPress = (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modalClose();
    }
  }
}
