"use strict";
// CUSTOM SELECT 
/*look for any elements with the class "custom-select":*/
let $formSelect = document.getElementsByClassName("form__select");
let formSelectLength = $formSelect.length;
for (let i = 0; i < formSelectLength; i++) {
  let $selElmnt = $formSelect[i].getElementsByTagName("select")[0];
  let selElmntLength = $selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  let $divSelected = document.createElement("DIV");
  $divSelected.setAttribute("class", "form__select-selected");
  $divSelected.innerHTML = $selElmnt.options[$selElmnt.selectedIndex].innerHTML;
  $divSelected.setAttribute("data-value", $selElmnt.options[$selElmnt.selectedIndex].value);
  $formSelect[i].appendChild($divSelected);
  /*for each element, create a new DIV that will contain the option list:*/
  let $divOptionList = document.createElement("DIV");
  $divOptionList.setAttribute("class", "select-items select-hide");
  for (let j = 1; j < selElmntLength; j++) {
    /*for each option in the original select element, create a new DIV that will act as an option item:*/
    let $divOption = document.createElement("DIV");
    $divOption.innerHTML = $selElmnt.options[j].innerHTML;
    $divOption.setAttribute("data-value", $selElmnt.options[j].value);
    $divOption.addEventListener("click", function(e) {
      /*when an item is clicked, update the original select box,and the selected item:*/
      let $select = this.parentNode.parentNode.getElementsByTagName("select")[0];
      let selectLength = $select.length;
      let $prevSibling = this.parentNode.previousSibling;
      for (let i = 0; i < selectLength; i++) {
        if ($select.options[i].innerHTML == this.innerHTML) {
          $select.selectedIndex = i;
          $prevSibling.innerHTML = this.innerHTML;
          $prevSibling.setAttribute("data-value", $select.options[i].value);
          let $asSelected = this.parentNode.getElementsByClassName("same-as-selected");
          let asSelectedLength = $asSelected.length;
          for (let k = 0; k < asSelectedLength; k++) {
            $asSelected[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      $prevSibling.click();
    });
    $divOptionList.appendChild($divOption);
  }
  $formSelect[i].appendChild($divOptionList);
  $divSelected.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes, and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document, except the current select box:*/
  let arrNo = [];
  let $selectItems = document.getElementsByClassName("select-items");
  let $selected = document.getElementsByClassName("form__select-selected");
  let selectItemsLength = $selectItems.length;
  let selectedLength = $selected.length;
  for (let i = 0; i < selectedLength; i++) {
    if (elmnt == $selected[i]) {
      arrNo.push(i)
    } else {
      $selected[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < selectItemsLength; i++) {
    if (arrNo.indexOf(i)) {
      $selectItems[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box, then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

// end CUSTOM SELECT

// Calculator
let $firstNum = document.querySelector("#inputNumberOne");
let $secondNum = document.querySelector("#inputNumberTwo");
let $select = document.querySelector(".form__select-selected");
let $warning = document.querySelector(".select-warning");
let $formBtn = document.querySelector(".form__btn");
let $result = document.querySelector(".form-result__data");
let $form = document.querySelector(".form");
let $defaultOptText = document.querySelector("select")[0].innerText;
let $defaultOptVal = document.querySelector("select")[0].value;

let resetForm = () => {
  $form.reset();
  $select.innerText = $defaultOptText;
  $select.dataset.value = $defaultOptVal;
}

let sum = (num1, num2) => { 
  let sum = num1 + num2;
  return Math.round(sum); 
}
let minus = (num1, num2) => { 
  let minus = num1 - num2;
  return Math.round(minus); 
}
let multiply = (num1, num2) => {
  let minus = num1 * num2;
  return Math.round(minus); 
}
let divide = (num1, num2) => {
  let divide = num1 / num2;
  if (divide == Infinity || divide == -Infinity || isNaN(divide)) {
    return "Не можна ділити на 0"
  } 
  return Math.round(divide); 
}
let calculate = () => {
  let $firstNumVal = $firstNum.valueAsNumber;
  let $secondNumVal = $secondNum.valueAsNumber;
  let $operator = $select.dataset.value;

  switch ($operator) {
    case "plus":
      $result.innerText = sum($firstNumVal, $secondNumVal);
      resetForm();
      break;
    case "minus":
      $result.innerText = minus($firstNumVal, $secondNumVal);
      resetForm();
      break;
    case "mult":
      $result.innerText = multiply($firstNumVal, $secondNumVal);
      resetForm();
      break;
    case "divide":
      $result.innerText = divide($firstNumVal, $secondNumVal);
      resetForm();
      break;
    default:
      break;
  }
  
}
// document.querySelector(".form").
$formBtn.addEventListener("click", calculate);