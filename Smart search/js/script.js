
let suggestions = [];
fetch('js/suggestions.json')
  .then(response => response.json())
  .then(data => suggestions = data)
  .catch(err => console.error('Не удалось загрузить подсказки', err));

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;


inputBox.onkeyup = (e)=>{
    let userData = e.target.value; 
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        searchWrapper.classList.add("active");
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {

            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); 
    }
}

function showSuggestions(list){
    suggBox.innerHTML = '';
    const userValue = inputBox.value;
    if(!list.length){
        const li = document.createElement('li');
        li.textContent = userValue;
        suggBox.appendChild(li);
    }else{
      list.forEach((data) => {
        const li = document.createElement('li');
        li.textContent = data;
        suggBox.appendChild(li);
      });
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

