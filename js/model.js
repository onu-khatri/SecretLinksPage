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
    if (!onsuccess) {
      this.resolve_action(undefined);
    }

    this.removeListener();
  };

  removeListener = function () {
    this.submitBtn.removeEventListener("click", this.submitForm);
    this.overlay.removeEventListener("click", this.closeModal);
    this.closeModalBtn.removeEventListener("click", this.closeModal);
    document.removeEventListener("keydown", this.checkEscKeyPress);
  };

  submitForm = (event$) => {
    const name = document.getElementById("name").value;
    const rootOption = document.getElementById("rootOptions").value;
    const genericOption = document.getElementById("genericOptions").value;

    this.resolve_action({ name, rootOption, genericOption });
    this.closeModal(true);
  };

  fillGenericOptions() {
    const genericSelect = document.getElementById("genericOptions");
    this.cleanDropdown(genericSelect);
    this.fillDropDowns(genericSelect, childGroups, "Select Generic");
  }

  fillRootOptions() {
    const rootSelect = document.getElementById("rootOptions");
    this.cleanDropdown(rootSelect);
    this.fillDropDowns(rootSelect, rootGroups, "Select Category");
  }

  cleanDropdown(selectControl) {
    const options = selectControl.getElementsByTagName("OPTION");

    for (let i = options.length - 1; i >= 0; i--) {
      selectControl.removeChild(options[i]);
    }
  }

  fillDropDowns(selectControl, groups, defaultOptionText) {
    const defaultOption = document.createElement("option");
    defaultOption.text = defaultOptionText;
    selectControl.add(defaultOption);

    if (groups && groups) {
      groups.forEach((element) => {
        const option = document.createElement("option");
        option.text = atob(element);
        option.value = element;
        selectControl.add(option);
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
  };
}
