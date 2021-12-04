const deleteBtns = document.querySelectorAll(".delete-btn");
const deleteConfirm = document.querySelector(".delete-wrapper");
const add = document.querySelector(".add-btn");
const addForm = document.querySelector(".add-form");
const table = document.querySelector("table");
const submitAddFormBtn = addForm.querySelector("button");
const changeBtns = document.querySelectorAll(".change-btn");
const changeForm = document.querySelector(".change-form");
const submitChangeBtn = document.querySelector(".submit-change-btn");
let currentRow = null;

document.addEventListener("DOMContentLoaded", () => {
    changeNumeration();
});

deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        let link = event.target;
        const td = link.parentElement.parentElement;
        deleteItem(td);
    });
});

add.addEventListener("click", (e) => {
    e.preventDefault();
    addForm.style.display = "block";
});

submitAddFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const data = getData(addForm);
    const row = render(data);
    table.append(row);
    addForm.style.display = "none";
    changeNumeration();
    addForm.reset();
});

changeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        changeForm.style.display = "block";
        const row = btn.parentElement.parentElement;
        currentRow = row;
        for (let i = 1; i < row.childElementCount - 2; i++) {
            changeForm.children[i].firstChild.value = row.children[i].textContent;
        }
    });
});

submitChangeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const data = getData(changeForm);
    const arrayOfData = Object.values(data);

    for (let i = 1; i < currentRow.childElementCount - 2; i++) {
        currentRow.children[i].textContent = `${arrayOfData[i - 1]}`;
    }
    changeForm.style.display = "none";
});

function deleteItem(element) {
    deleteConfirm.style.display = "flex";
    const agree = deleteConfirm.querySelector("#yes");
    const decline = deleteConfirm.querySelector("#no");
    agree.addEventListener("click", () => {
        element.remove();
        deleteConfirm.style.display = "none";
        changeNumeration();
    });
    decline.addEventListener("click", () => {
        deleteConfirm.style.display = "none";
    });
}

function render(data) {
    const deleteBtn = document.createElement("a");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Удалить";
    deleteBtn.style.cursor = "pointer";

    const tdDelete = createTd();
    tdDelete.append(deleteBtn);
    deleteBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        deleteItem(tr);
    });

    const change = document.createElement("a");
    change.classList.add("change-btn");
    change.text = "Изменить";
    const tdChange = createTd();
    tdChange.append(change);
    const element = `
        <td class="number">1</td>
        <td>${data.surname}</td>
        <td>${data.name}</td>
        <td>${data.lastname}</td>
        <td>${data.group}</td>
        
  `;
    const tr = document.createElement("tr");
    tr.innerHTML = element;
    tr.append(tdDelete, tdChange);
    return tr;
}

function createTd() {
    const td = document.createElement("td");
    td.style.borderBottom = "1px solid gray";
    return td;
}

function changeNumeration() {
    const allNumbers = document.querySelectorAll(".number");
    allNumbers.forEach((item, i) => {
        item.innerHTML = `${i + 1}`;
    });
    const rows = table.querySelectorAll("tr");
    for (let i = 1; i < rows.length; i++) {
        if (i % 2 === 0) {
            rows[i].style.backgroundColor = "#cecdcd";
        } else {
            rows[i].style.backgroundColor = "#ececec";
        }
    }
}

function getData(selector) {
    const name = selector.querySelector(".name").value;
    const surname = selector.querySelector(".surname").value;
    const lastname = selector.querySelector(".otchestvo").value;
    const group = selector.querySelector(".group").value;

    return {
        name,
        surname,
        lastname,
        group,
    };
}
