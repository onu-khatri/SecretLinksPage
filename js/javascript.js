const source = document.getElementById("source");
const result = document.getElementById("encryptOutput");
const isb2a = window.location.href.indexOf("btoa") > 1;
let isValid = false;

const storedData = window.localStorage.getItem("data");
if (storedData && storedData.length < data.length) {
  data = JSON.parse(storedData);
  document.getElementById('copyTheUpdates').style.display = "inline-block";
} else {
  window.localStorage.setItem("data", JSON.stringify(data));
}

const inputHandler = function (e) {
  isValid = btoa(e.target.value) === owner && isb2a;
  if (isValid) {
    showLinks();
  }

  result.innerText = btoa(e.target.value);

  const copyButton = document.getElementById("copy-button");
  const addButton = document.getElementById("add-button");
  if (result.innerText.length > 0) {
    copyButton.style.display = "inline-block";
    addButton.style.display = "inline-block";
  } else {
    copyButton.style.display = "none";
    addButton.style.display = "none";
  }
};

source.addEventListener("input", inputHandler);

function showLinks() {
  document.getElementById("container").innerHTML = "";
  const listToShow = JSON.parse(JSON.stringify(data)).map((t) => {
    t.id = isb2a && isValid ? atob(t.id) : t.id;
    return t;
  });

  const groupByRoot = Object.groupBy(listToShow, (item) => item.root);

  let rootUL = document.createElement("ul");
  rootUL.className="root-ul collapse-able"
  document.getElementById("container").appendChild(rootUL);

  const rootGroupProp = Object.getOwnPropertyNames(groupByRoot);
  rootGroupProp.forEach((prop) => {
    let rootLI = document.createElement("li");
    rootLI.className = "root-li list";

    let rootLabel = document.createElement("span");
    rootLabel.innerHTML = atob(prop);
    rootLI.appendChild(rootLabel);

    //for (var i = 0; i < groupByRoot[prop].length; i++) {
    let genericUL = document.createElement("ul");
    genericUL.className="collapse-able"
    const groupByGeneric = Object.groupBy(
      groupByRoot[prop],
      (item) => item.generic
    );
    
    const genericGroupProp = Object.getOwnPropertyNames(groupByGeneric);
    genericGroupProp.forEach((gen_prop) => {
      let genericLI = document.createElement("li");
      genericLI.className = "list";

      let genericLabel = document.createElement("span");
      genericLabel.innerHTML = atob(gen_prop);
      genericLI.appendChild(genericLabel);

      var itemUL = document.createElement("ul");
      for (var i = 0; i < groupByGeneric[gen_prop].length; i++) {
        let li = document.createElement("li");
        li.className = "list";

        let a = document.createElement("a");
        a.innerHTML = groupByGeneric[gen_prop][i].name;
        a.setAttribute("href", groupByGeneric[gen_prop][i].id);

        li.appendChild(a);
        itemUL.appendChild(li);
      }

      genericLI.appendChild(itemUL);
      genericUL.appendChild(genericLI);
    });

    rootLI.appendChild(genericUL);
    rootUL.appendChild(rootLI);
    //}
  });

  expandCollapseBind()
}

function addToStorage() {
  const dataToStore = document.getElementById("encryptOutput").innerHTML;
  //const itemName = prompt("Enter the name");
  openModal().then((item) => {
    if (item) {
      data.push({
        id: dataToStore,
        name: item.name,
        root: item.rootOption,
        generic: item.genericOption,
      });
      window.localStorage.setItem("data", JSON.stringify(data));
      showLinks();
      document.getElementById('copyTheUpdates').style.display = "inline-block";
    }
  });
}

async function copyToClipBoard() {
  let text = document.getElementById("encryptOutput").innerHTML;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
  }

  return false;
}

async function copyDataToClipBoard() {
  let text = window.localStorage.getItem('data');
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
  }

  return false;
}

