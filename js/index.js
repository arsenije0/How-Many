let btnOne = idCatch("btn-one");
let btnDtwo = idCatch("btn-div-two");
let btnTwo = idCatch("btn-two");
let head = idCatch("header");
let logo = idCatch("logo");
let logoTwo = idCatch("logo-two");
let home = idCatch("home");
let wrapperOne = idCatch("wrapper-one");
let wrapperTwo = idCatch("wrapper-two");
let wrapperThree = idCatch("wrapper-three");
let wrapperFour = idCatch("wrapper-four");
let wrapperFive = idCatch("wrapper-five");
let wrapperSix = idCatch("wrapper-six");
let wrapperSeven = idCatch("wrapper-seven");
let foot = idCatch("footer");
let rezOne = idCatch("rez-one");
let fOne = idCatch("form-one");
let errDiv = idCatch("error-div");
let errDivTwo = idCatch("error-div-2");
let ab = idCatch("about");
let wrapperAbout = idCatch("wrapper-about");
let hint = idCatch("hint");
let w5c = idCatch("w5c");
let w6c = idCatch("w6c");
let w7c = idCatch("w7c");
let repContainer = idCatch("rep-container");

/*=======================================================================*/
/*Events*/

displayOn(wrapperOne, wrapperTwo, wrapperThree);
displayOff(wrapperFour, btnDtwo, wrapperFive, wrapperSix, wrapperSeven, wrapperAbout, repContainer);
window.addEventListener("load", () => {
    let y = window.innerWidth < 500 ? -100 : -200;
    lineAnimation(idCatch("line1"), y);
})

btnOne.addEventListener("click", function(){
    displayOff(wrapperOne, wrapperTwo, wrapperThree);
    wrapperFourEvents = true;
    cont.style.opacity = 0;
    displayOn(wrapperFour);
    displayFlex(btnDtwo);
    opPPlus(cont, 40);
    scroll(0,0);
});

btnTwo.addEventListener("click", function(){
    if(m > 2){
        displayOff(wrapperFour, btnDtwo);
        wrapperFourEvents = false;
        displayOn(repContainer, wrapperFive, wrapperSix, wrapperSeven)
        dataGeter();
        scroll(0,0);
        opPPlus(repContainer, 40);
        idCatch("report-card").innerHTML = report(info);
        createCanvas(wrapperFive, "myChart");
        createCanvas(wrapperSix, "myChart2");
        createCanvas(wrapperSeven, "myChart3");
        createPopulationChart(info, "myChart");
        createTeritorySizeChart(info, "myChart2");
        createGDPChart(info, "myChart3");
    } else {
        errDivTwo.innerHTML = "PICK MORE THAN ONE COUNTRY";
        opPPlus(errDivTwo, 10);
        setTimeout(() => {
            opMinusErr(errDivTwo);
        }, 500);
    };
});

home.addEventListener("click", toHome);
logo.addEventListener("click", toHowMany);
logoTwo.addEventListener("click", function(){
    toHowMany();
    scroll(0,0);
});

ab.addEventListener("click", function(){
    about();
    scroll(0,0);
});

/*=======================================================================*/
/*Back functions*/

function toHome(){

    recycleDiv();
    wrapperFourEvents = false;
    repContainer.style.opacity = 0;
    displayOff(wrapperFour, btnDtwo, wrapperFive, repContainer, wrapperSix, wrapperSeven, wrapperAbout);
    for(let i = 0; i < k; i++){

        removeElement("hint-div-" + i);
    }
    k = 0;
    cont.value = "";
    if(wrapperOne.style.display == "none") {
         let y = window.innerHeight < 500 ? -100 : -200;
        lineAnimation(idCatch("line1"), y);
        displayOn(wrapperOne, wrapperTwo, wrapperThree);
    }
}

function about(){
    repContainer.style.opacity = 0;
    wrapperFourEvents = false;
    if(wrapperAbout.style.display == "none") {
         let y = window.innerWidth < 500 ? -80 : -180;
        lineAnimation(idCatch("line2"), y);
    }
    displayOn(wrapperAbout);
    displayOff(wrapperOne, wrapperTwo, wrapperThree, wrapperFour, btnDtwo, repContainer, wrapperFive, wrapperSix, wrapperSeven);
}

function toHowMany(){
    repContainer.style.opacity = 0;
    cont.style.opacity = 0;
    wrapperFourEvents = true;
    recycleDiv();
    if(wrapperFour.style.display == "none") {
        opPPlus(cont, 40);
    } else {
        cont.style.opacity = 1;
    }
    displayOn(wrapperFour);
    displayFlex(btnDtwo);
    displayOff(wrapperAbout, wrapperOne, wrapperTwo, wrapperThree, repContainer, wrapperFive, wrapperSix, wrapperSeven);
}

/*=======================================================================*/
/*Display functions*/

function displayOff(...arg){
    for(let i = 0; i < arg.length; i++){
        arg[i].style.display = "none";
    }
}

function displayOn(...arg){
    for(let i = 0; i < arg.length; i++){
        arg[i].style.display = "block";
    }
}

function displayFlex(...arg){
    for(let i = 0; i < arg.length; i++){
        arg[i].style.display = "flex";
    }
}

/*=======================================================================*/
/*Opacity functions*/

function opPlus(x){
    var y = 0;
    x.style.opacity = 0;
    var M = setInterval(opacityChange, 20);

    function opacityChange(){
        if(y > 1){
            clearInterval(M);
        } else {
            y += 0.01;
            x.style.opacity = y;
        }
    }
}

function opPPlus(x, time){
    var y = 0;
    var M = setInterval(opacityChange, time);

    function opacityChange(){
        if(y > 1){
            clearInterval(M);
        } else {
            y += 0.04;
            x.style.opacity = y;
        }
    }
}

function opMinus(x){
    var y = 1;
    var M = setInterval(opacityChange, 10);

    function opacityChange(){
        if(y<0){
            clearInterval(M);
        } else {
            y -= 0.04;
            x.style.opacity = y;
        }
    }
}

function opMinusErr(x){
    var y = 1;
    var M = setInterval(opacityChange, 10);

    function opacityChange(){
        if(y<0){
            x.innerHTML = "";
            clearInterval(M);
        } else {
            y -= 0.04;
            x.style.opacity = y;
        }
    }
}

/*=======================================================================*/
/*Functions that handle data from dataBase[]*/

/*m is a global variable that counts the number of countries.*/
let m = 1;

function initialData(){

    let same = false;
    for(let i = 1; i < m; i++) {
        if(databaseSearch(cont.value) != false && m > 0) {
            if(idCatch("rez" + i).innerHTML.toLocaleLowerCase() == dataBase[databaseSearch(cont.value)][0].toLocaleLowerCase()){
                same = true;
            }
        } else {
            break;
        }
    }

    if(same) {
        errDiv.innerHTML = "ALREADY CHOSEN";
        opPPlus(errDiv, 10);
        setTimeout(() => {
            opMinusErr(errDiv);
        }, 500);
    } else if(databaseSearch(cont.value) === false){
        if(cont.value != "") {
            errDiv.innerHTML = "WRONG INPUT";
            opPPlus(errDiv, 10);
            setTimeout(() => {
                opMinusErr(errDiv);
            }, 500);
        }
    } else {
        let param;
        param = document.createElement("div");
        param.setAttribute("id", "rez" + m);
        wrapperFour.appendChild(param);
        param.setAttribute("class", "rezz");
        idCatch("rez" + m).innerHTML = dataBase[databaseSearch(cont.value)][0];
        idCatch("rez" + m).value = dataBase[databaseSearch(cont.value)][0];
        idCatch("rez" + m).style.opacity = 0;
        opPlus(idCatch("rez" + m));
        m++;
    }
}

/*Population, name, teritorySize, color and gdp data.*/
let info = {
    name: [],
    population: [],
    teritorySize: [],
    gdp: [],
    color: []
}

let colors = ["yellow", "blue", "orange", "firebrick", "blueviolet", "aqua", "purple", 
    "green", "red", "brown", "maroon", "olive", "teal", "black", "grey", "navy", "salmon"];

function getData(x, y){

    let e = databaseSearch(x.innerHTML.split("<")[0]);

    if(e === false){
        console.log("err");
    } else {
        info.name[y - 1] = dataBase[e][0];
        if((dataBase[e][1]/1000000).toFixed(2) != 0) {
            info.population[y - 1] = (dataBase[e][1]/1000000).toFixed(2);//millions
        } else {
            info.population[y - 1] = dataBase[e][1]/1000000;
        }

        info.teritorySize[y - 1] = dataBase[e][2];
        info.gdp[y - 1] = Math.round(dataBase[e][3]/1000);

        let sameCol = true;
        let c = 0;
        do {
            sameCol = true;
            c = Math.round(Math.random()*(colors.length - 1));
            for(let i = 0; i < y - 1; i++) {
                if(colors[c] == info.color[i]) {
                    sameCol = false;
                }
            }
        } while (sameCol == false);
        info.color[y - 1] = colors[c];
    }
    
}

const dataGeter = () => {
    for(let i = 1; i < m; i++){
        getData(idCatch("rez" + i), i);
    }
}

/*=======================================================================*/
/*This part deals with the scrolling of the hint div with arrow keys
and mouseover and other events associated with it.*/

let wrapperFourEvents = false;
let hintHeight = 30;
let heightUpper = 0;
let heightDown = 5*hintHeight;

function scrollChecker(p) {
    if (!(globalCounter*hintHeight >= heightUpper && globalCounter*hintHeight <= heightDown)) {
        if (globalCounter == 0) {
            heightUpper = 0;
            heightDown = 5*hintHeight;
            hint.scroll(0,0);
        } else {
            if (p < 0) {
                hint.scroll(0, globalCounter*hintHeight);
            } else {
                hint.scroll(0, globalCounter*hintHeight - 5*hintHeight);
            }
            heightUpper += p;
            heightDown += p;
        }
    }
}

let hintArr = [];
let globalCounter = -1;

function f(x) {
    globalCounter = x;
    for(let i = 0; i < hintArr.length; i++) {
        if(i != x) {
            hintArr[i].style.backgroundColor = "#ceffdb";
            hintArr[i].style.opacity = 0.7;
        } else {
            hintArr[i].style.backgroundColor = "teal";
            hintArr[i].style.opacity = 1;
            cont.value =  hintArr[i].innerHTML;
        }
    }
}

window.addEventListener("keydown", (e) => {
    if(wrapperFourEvents) {
        if(e.keyCode == 40) {
            if(globalCounter < hintArr.length - 1) {
                globalCounter++;
                scrollChecker(hintHeight);
                f(globalCounter);
                cont.blur();
            }
        } else if(e.keyCode == 38) {
            if(globalCounter == 0) {
                globalCounter--;
                f(globalCounter);
                cont.focus();
            } else if(globalCounter > 0) {
                globalCounter--;
                scrollChecker(-hintHeight);
                f(globalCounter);
                cont.blur();
            }
        }
    }
});

cont.addEventListener("focus", () => {
    globalCounter = -1;
    f(globalCounter);
});

window.addEventListener("keydown", (e) => {

    if(wrapperFourEvents) {
        if(e.keyCode == 27) {
            cont.value = "";
        }
        if((e.keyCode == 38 || e.keyCode == 40) && hintArr.length != 0){
            e.preventDefault();
        }
        if(e.keyCode == 13){
            let go = false;
            if(globalCounter >= 0 && hint.style.display == "block" &&
                hintArr[globalCounter].style.backgroundColor == "teal") {
                if(check(hintArr[globalCounter].innerHTML) == false) {
                    picker(hintArr[globalCounter]);
                } else {
                    go = true;
                }
            } else if(globalCounter == -1 && cont.value != "") {
                if(databaseSearch(cont.value) != -1) {
                    if(check(cont.value) == false) {
                        picker(dataBase[databaseSearch(cont.value)][0]);
                    }
                } else {
                    go = true;
                }
            }
            if(go == false) {
                cont.focus();
            }
        }
    }
});

/*=======================================================================*/
/*A function that creates hint divs, according to the user input*/
let k = 0;
const hintBar = (str) => {

    heightUpper = 0;
    heightDown = 5*hintHeight;
    hint.scroll(0,0);
    hintArr.length = 0;
    globalCounter = -1;

    for(let i = 0; i < k; i++){
        removeElement("hint-div-" + i);
    }

    hint.style.display = "block";
    let s = [];
    k = 0;

    if(str.length == 0){
        hint.innerHTML = "";
    } else {

        for (let i = 0; i < dataBase.length; i++) {
            for (let j = 0; j <= dataBase[i][0].length - str.length; j++) {
                if(dataBase[i][0].substr(j, str.length).toLocaleLowerCase() == str.toLocaleLowerCase()){
                    s[k] = dataBase[i][0];
                    k++;
                    break;
                }
            }
        }

        let startingPoint = 0;
        let sortedS = [];
        let longestName = longestString(dataBase);

        while(startingPoint < longestName) {

            for (let i = 0; i < s.length; i++) {
                if(s[i].substr(startingPoint, str.length).toLocaleLowerCase() == str.toLocaleLowerCase()) {
                    let duplicate = false;
                    for(let j = 0; j < sortedS.length; j++) {
                        if(s[i] == sortedS[j]) {
                            duplicate = true;
                            break;
                        }
                    } 
                    if (duplicate == false) {
                        sortedS.push(s[i]);
                    }
                }
            }
            startingPoint++;
        }
        
        s = sortedS;
        sortedS = null;

        for(let i = 0; i < s.length; i++){
            let param = document.createElement("div");
            param.setAttribute("id", "hint-div-" + i);
            hint.appendChild(param);
            param.setAttribute("class", "hint-div-cl");
            idCatch("hint-div-" + i).innerHTML = s[i];

            hintArr[i] = idCatch("hint-div-" + i);
            hintArr[i].addEventListener("click", function(){
                if(check(idCatch("hint-div-" + i).innerHTML) == false) {
                    picker(idCatch("hint-div-" + i));
                }
            });
            hintArr[i].addEventListener("mouseover", () => f(i));
            hintArr[i].addEventListener("mouseout", () => {
                globalCounter = -1;
                hintArr[i].style.backgroundColor = "#ceffdb";
                hintArr[i].style.opacity = 0.7;
            });
        }
    }

    s.length = 0;
}

/*This one performs a check to see if an input is a duplicate*/
function check(str) {
    let same = false;
    if (m > 1) {
        for(let i = 1; i < m; i++) {
            if(idCatch("rez" + i).innerHTML.split("<")[0].toLocaleLowerCase() == str.toLocaleLowerCase()){
                same = true;
            }
        }
        if(same) {
            errDiv.innerHTML = "ALREADY CHOSEN";
            opPPlus(errDiv, 10);
            setTimeout(() => {
                opMinusErr(errDiv);
            }, 500);
        }
    }
    return same;
}

/*A function embedded inside of every hint-div via click() and enter
events. It creates div that represents our choice of a country.*/
const picker = (x) => {

    let str = x;
    if(typeof x === "object") {
        str = x.innerHTML;
    }

    hint.style.display = "none";
    cont.value = "";
    if (m <= 10) {
        let param;
        param = document.createElement("div");
        param.setAttribute("id", "rez" + m);
        idCatch("rezz-container").appendChild(param);
        param.setAttribute("class", "rezz");
        idCatch("rez" + m).innerHTML = str;
        idCatch("rez" + m).value = str;
        idCatch("rez" + m).style.opacity = 0;
        opPlus(idCatch("rez" + m));

        let p = document.createElement("div");
        p.setAttribute("id", "rezz-cancel-" + m);
        idCatch("rez" + m).appendChild(p);
        p.setAttribute("class", "rezz-cancel-cl");
        p.innerHTML = "<span class='fas fa-times x'></span>";
        p.style.color = "white";
        p.style.textAlign = "center";
        p.addEventListener("click", () => {
            rezDelete(p.id.split("-")[2]);
        });
        m++;

    } else {
        errDiv.innerHTML = "MAX NUMBER OF COUNTRIES REACHED";
        opPPlus(errDiv, 10);
        setTimeout(function(){
            opMinusErr(errDiv);
        }, 500);
    }

    for(let i = 0; i < k; i++){
        removeElement("hint-div-" + i);
    }
    k = 0;
}

/*A function that is called on a click event, when the user wants to delete
his choice.*/
function rezDelete(x) {
    let b = idCatch("rezz-container").children.length;
    for(let i = 0; i < b; i++) {
        if(i + 1 == x) {
            removeElement("rez" + (i + 1));
        } 
        if(i + 1 > x) {
            let temp = idCatch("rez" + (i + 1));
            let temp2 = idCatch("rezz-cancel-" + (i + 1));
            temp.id = "rez" + i;
            temp2.id = "rezz-cancel-" + i;
        }
    }
    m--;
}

/*=======================================================================*/
/*The following functions feed the data into the Chart.js objects*/

function createCanvas(parent, id) {
    let el = document.createElement("canvas");
    parent.appendChild(el);
    el.style.width = "400px";
    el.style.height = "350px";
    el.setAttribute("id", id);
}

function createTeritorySizeChart(info, id){

    let ctx = document.getElementById(id).getContext('2d');

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: info.name,
            datasets: [{
                data: info.teritorySize,
                backgroundColor: info.color
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "whitesmoke"
                    },
                    ticks: {
                        fontSize: 15
                    }
                }],
                yAxes: [{
                    display: false
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(item, data) {
                      var dataPoint = commaCreator(item.yLabel.toString());
                      return " " + dataPoint + " km^2";
                    }
                }
            }
        }
    });
}

function createGDPChart(info, id){
    
    let ctx = document.getElementById(id).getContext('2d');

    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: info.name,
            datasets: [{
                backgroundColor: "whitesmoke",
                borderColor: "#95FBE9",
                data: info.gdp,
                lineTension: 0.2,
                borderWidth: 4,
                pointBackgroundColor: info.color,
                pointBorderColor: info.color,
                pointRadius: 10,
                pointHoverRadius: 15,
                pointHoverBorderWidth: 6
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "whitesmoke"
                    },
                    ticks: {
                        fontSize: 15,
                        padding: 20
                    }
                }],
                yAxes: [{
                    display: false
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontColor: "whitesmoke",
                    boxWidth: 0
                }
            },
            tooltips: {
                callbacks: {
                    label: function(item, data) {
                      var dataPoint = item.yLabel;
                      if(dataPoint > 1000) {
                        dataPoint = (dataPoint/1000).toFixed(2);
                        return " " + dataPoint + " trillion";
                      } else {
                        dataPoint = commaCreator(dataPoint.toString());
                        return " " + dataPoint + " billion";
                      }
                    }
                }
            }
        }
    });
}

function createPopulationChart(info, id){
    
    let ctx = document.getElementById(id).getContext('2d');

    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: info.name,
            datasets: [{
                label: "Population",
                data: info.population,
                backgroundColor: info.color
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }]
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontSize: 15
                }
            }
        }
    });
}

/*=======================================================================*/

/*A function that creates a string that describes countries that are picked.*/
function report(info) {
    let popStr = [];
    for (let i = 0; i < info.population.length; i++) {
        popStr[i] = parseInt(info.population[i]);
    }
    let state = [];
     for (let i = 0; i < info.name.length; i++) {
        state[i] = [info.name[i], new Array()];
    }

    let hPop = info.name[minMax(popStr)[1]];
    let lPop = info.name[minMax(popStr)[0]];
    let hGdp = info.name[minMax(info.gdp)[1]];
    let lGdp = info.name[minMax(info.gdp)[0]];
    let hTer = info.name[minMax(info.teritorySize)[1]];
    let lTer = info.name[minMax(info.teritorySize)[0]];

    for (let i = 0; i < state.length; i++) {
        if(hPop == state[i][0]) {
            state[i][1].push("the biggest population size");
        } else if(lPop == state[i][0]) {
            state[i][1].push("the lowest population size");
        }
        if(hGdp == state[i][0]) {
            state[i][1].push("the strongest economy");
        } else if(lGdp == state[i][0]) {
            state[i][1].push("the weakest economy");
        }
        if(hTer == state[i][0]) {
            state[i][1].push("the largest land area");
        } else if(lTer == state[i][0]) {
            state[i][1].push("the smallest land area");
        }
    }

    let stringOutput = "Out of the countries you picked, ";

    let newArr = [];
    for(let i = 0, c = 0; i < state.length; i++) {
        if(state[i][1].length != 0) {
            newArr[c] = state[i];
            c++;
        } 
    }

    for(let i = 0; i < newArr.length; i++) {
        if(i == newArr.length - 2 || newArr.length - 2 == -1) {
            t = " while "
        } else if (i < newArr.length - 1){
            t = ", ";
        } else {
            t = ".";
        }
        stringOutput += "<span class='boldy'>" + newArr[i][0] + "</span>" + " has ";
        if(newArr[i][1].length == 2) {
            stringOutput += newArr[i][1][0] + " and " 
                + newArr[i][1][1] + t;
        } else if(newArr[i][1].length == 3) {
            stringOutput += newArr[i][1][0] + ", " 
                + newArr[i][1][1] + " and " + newArr[i][1][2] + t;
        } else {
            stringOutput += newArr[i][1][0] + t;
        }
    }

    return stringOutput;
}

/*=======================================================================*/
/*Paralaxa effect*/

let paralaxaDiv = document.getElementById("paralaxa-div");
paralaxaDiv.style.top = "-750px";
let prevScrollValue = 0;

window.addEventListener("scroll", () => {
if(wrapperThree.style.display == "block") {
    let sc = window.pageYOffset;

    if(sc < 500) {
        paralaxaDiv.style.top = "-750px";
    }

    if(sc > 500) {
        if(sc > prevScrollValue) {
            let param = 6;
            let M = setInterval(() => {
                if(param > 0) {
                    let p = (param > 3) ? 2 : 1;
                    if(parseInt(paralaxaDiv.style.top) >= 0) {
                        paralaxaDiv.style.top = "0px";
                        clearInterval(m);
                    } else {
                        paralaxaDiv.style.top = parseInt(paralaxaDiv.style.top) + p + "px";
                    }
                    param--;
                } else {
                    clearInterval(m);
                }
            }, 80);
        } else {
            let param = 6;
            let M = setInterval(() => {
                if(param > 0) {
                    let p = (param > 3) ? 2 : 1;
                    if(parseInt(paralaxaDiv.style.top) <= -750) {
                        paralaxaDiv.style.top = "-750px";
                        clearInterval(m);
                    } else {
                        paralaxaDiv.style.top = parseInt(paralaxaDiv.style.top) - p + "px";
                    }
                    param--;
                } else {
                    clearInterval(m);
                }
            }, 80);
        }
    }
    prevScrollValue = sc;
}
});

/*=======================================================================*/

/*Input validation*/
function onlyTxtValidation(obj) {
    let testValue = obj.value;
    let regEx = /^[a-zA-Z]+$/;
    
    if(regEx.test(testValue) === false) {
        let a = testValue.split("");
        for(let i = 0; i < a.length; i++) {
            if(regEx.test(a[i]) === false && i !== a.length - 1) {
                obj.value = "";
                break;
            }
            if(i === a.length - 1 && regEx.test(a[i]) === false) {
                let a = testValue.split("");
                a.pop();
                obj.value = a.join("").toLocaleString();
            }
        }
    }
}

/*A function that performs the cleanup*/
function recycleDiv(){
    for(let i = 1; i < m; i++){
        removeElement("rez" + i);
    }

    if(wrapperFive.style.display == "block") {
        wrapperFive.removeChild(idCatch("myChart"));
        wrapperSix.removeChild(idCatch("myChart2"));
        wrapperSeven.removeChild(idCatch("myChart3"));
    }
    m = 1;
    info.population.length = 0;
    info.teritorySize.length = 0;
    info.gdp.length = 0;
    info.name.length = 0;
    info.color.length = 0;
}

function idCatch(id){
    return document.getElementById(id);
}

function removeElement(id){
    var element = idCatch(id);
    element.parentNode.removeChild(element);
}

/*Line animation*/
function lineAnimation(line, m) {
    line.style.width = "0px";
    line.style.left = "0px";

    requestAnimationFrame(move);
    function move() {
        if(!(parseInt(line.style.left) < m)) {
            line.style.left = parseInt(line.style.left) - 6 + "px";
            line.style.width = parseInt(line.style.width) + 12 + "px";
            requestAnimationFrame(move);
        }
    }
}

/*Min/max of an array*/
function minMax(a) {
    min = a[0];
    indexMin = 0;
    max = a[0];
    indexMax = 0;
    for(let i = 0; i < a.length; i++) {
        if(a[i] > max) {
            max = a[i];
            indexMax = i;
        }
        if(a[i] < min) {
            min = a[i];
            indexMin = i;
        }
    }
    return [indexMin, indexMax];
}

//Gives commas to large numbers and returns string: commaCreator(2133454) = "2,133,454;".
//Input can be either a number or a string.
function commaCreator(numStr){

    let c = numStr.split("").reverse();
    let w = [];
    let cTrack = 0;

    for(let i = 0, commaTrack = 1; i < (c.length + Math.round(c.length/3)); i++, commaTrack++){

        if(commaTrack%4 != 0){
            w[i] = c[cTrack];
            cTrack++;
        } else {
            w[i] = ",";
        }
    }

    if(w[w.length - 1] == ","){
        w.pop();
    }

    return w.reverse().join("");
}

/*=======================================================================*/

//Database
let dataBase = [
    ["China", 1397010000, 9326410, 13407398],
    ["India", 1346260000, 2973190, 2716746],
    ["The United States of America", 329074000, 9147593, 20494050],
    ["Russia", 146793744, 16377742, 1630659],
    ["Brazil", 209807000, 8460415, 1868184],
    ["Indonesia", 268074600, 1811569, 1022454],
    ["Pakistan", 204413000, 881912, 312570],
    ["Nigeria", 193392517, 910768, 397270],
    ["Bangladesh", 166425000, 130168, 313509],
    ["Mexico", 126577691, 1943945, 1223359],
    ["Japan", 126220000, 364543, 4971929],
    ["Philippines", 107527000, 298170, 330846],
    ["Ethiopia", 98665000, 1000000, 80279],
    ["Egypt", 98591400, 995450, 249559],
    ["Vietnam", 95354000, 310070, 241272],
    ["Democratic Republic of the Congo", 86727573, 2267048, 42644],
    ["Germany", 82979100, 348672, 4000386],
    ["Iran", 82387100, 1531595, 452275],
    ["Turkey", 82003882, 769632, 766428],
    ["France", 66989000, 640427, 2775252],
    ["Thailand", 66354530, 510890, 487239],
    ["United Kingdom", 66040229, 241930, 2828644],
    ["Italy", 60375749, 294140, 2072201],
    ["South Africa", 57725600, 1214470, 368135],
    ["Tanzania", 55890747, 885800, 57862],
    ["Myanmar", 54339766, 653508, 68559],
    ["Kenya", 52214791, 569140, 89205],
    ["South Korea", 51811167, 99909, 1619424],
    ["Colombia", 49850000, 1038700, 333114],
    ["Spain", 46733038, 498980, 1425865],
    ["Argentina", 44938712, 2736690, 518092],
    ["Algeria", 43378027, 2381741, 180441],
    ["Ukraine", 42122657, 579300, 124603],
    ["Sudan", 41465358, 1886068, 33903],
    ["Uganda", 40006700, 197100, 28122],
    ["Iraq", 39127900, 437367, 226070],
    ["Poland", 38433600, 311888, 586015],
    ["Canada", 37450200, 9093507, 1711387],
    ["Morocco", 34997300, 446300, 118309],
    ["Uzbekistan", 33456428, 425400, 41241],
    ["Saudi Arabia", 33413660, 2149690, 782483],
    ["Malaysia", 32696700, 329613, 354348],
    ["Peru", 32495510, 1279996, 225203],
    ["Venezuela", 32219521, 882050, 98468],
    ["Afghanistan", 31575018, 652230, 19585],
    ["Ghana", 30280811, 227533, 65191],
    ["Angola", 30175553, 1246700, 107316],
    ["Nepal", 29609623, 143351, 28812],
    ["Yemen", 29579986, 527968, 26914],
    ["Mozambique", 28861863, 786380, 14428],
    ["Ivory Coast", 25823071, 318003, 43032],
    ["North Korea", 25450000, 120538, 32100],
    ["Australia", 25333700, 7633565, 1418275],
    ["Madagascar", 25263000, 581540, 12449],
    ["Cameroon", 24348251, 472710, 38521],
    ["Taiwan", 23589192, 32260, 589391],
    ["Niger", 22314743, 1266700, 9458],
    ["Sri Lanka", 21670112, 62732, 88223],
    ["Burkina Faso", 20870060, 273602, 14180],
    ["Mali", 19973000, 1220190, 17187],
    ["Wakanda", 9999999, 999, 30000000],
    ["Romania", 19523621, 231291, 239851],
    ["Chile", 19107216, 743812, 298172],
    ["Syria", 18499181, 183630, 77460],
    ["Kazakhstan", 18461336, 2699700, 170539],
    ["Guatemala", 17679735, 107159, 78979],
    ["Malawi", 17563749, 94080, 6885],
    ["Zambia", 17381168, 743398, 25179],
    ["Netherlands", 17313100, 33893, 912899],
    ["Ecuador", 17222800, 256369, 107511],
    ["Cambodia", 16289270, 176515, 24532],
    ["Senegal", 16209125, 192530, 24027],
    ["Chad", 15692969, 1259200, 11112],
    ["Somalia", 15636171, 627337, 5000],
    ["Zimbabwe", 15159624, 386847, 26127],
    ["South Sudan", 12778250, 619745, 3980],
    ["Rwanda", 12374397, 24668, 9709],
    ["Guinea", 12218357, 245717, 11503],
    ["Benin", 11733059, 114305, 10546],
    ["Haiti", 11577779, 27560, 9717],
    ["Tunisia", 11551448, 155360, 39911],
    ["Bolivia", 11469896, 1083301, 41410],
    ["Belgium", 11460522, 30278, 533153],
    ["Cuba", 11221060, 109820, 96851],
    ["Burundi", 10953317, 25680, 3436],
    ["Greece", 10741165, 130647, 219097],
    ["Czech Republic", 10649800, 77247, 242052],
    ["Jordan", 10398900, 88802, 42371],
    ["Dominican Republic", 10358320, 48320, 80940],
    ["Portugal", 10291027, 91470, 238510],
    ["Sweden", 10246901, 410335, 551135],
    ["Azerbaijan", 9981457, 86100, 45418],
    ["Hungary", 9771000, 89608, 155703],
    ["United Arab Emirates", 9682088, 83600, 424635],
    ["Belarus", 9475200, 202900, 59643],
    ["Honduras", 9158345, 111890, 23778],
    ["Israel", 9021560, 20330, 369843],
    ["Tajikistan", 8931000, 141510, 7350],
    ["Austria", 8859992, 82445, 457637],
    ["Papua New Guinea", 8558800, 452860, 21319],
    ["Switzerland", 8542323, 39997, 703750],
    ["Sierra Leone", 7901454, 71620, 3754],
    ["Togo", 7538000, 54385, 5347],
    ["Paraguay", 7152703, 397302, 41604],
    ["Laos", 7123205, 230800, 18434],
    ["Serbia", 7001444, 88246, 50651],
    ["Bulgaria", 7000039, 108489, 64963],
    ["El Salvador", 6704864, 20721, 26057],
    ["Libya", 6569864, 1759540, 43587],
    ["Nicaragua", 6393824, 119990, 13380],
    ["Kyrgyzstan", 6389500, 191801, 8013],
    ["Lebanon", 6065922, 10230, 56409],
    ["Turkmenistan", 5942561, 469930, 44114],
    ["Denmark", 5806081, 42434, 350874],
    ["Singapore", 5638700, 687, 361109],
    ["Republic of the Congo", 5542197, 341500, 11460],
    ["Finland", 5522018, 303815, 275321],
    ["Central African Republic", 5496011, 622984, 2307],
    ["Slovakia", 5450421, 48105, 106585],
    ["Norway", 5328212, 304282, 434937],
    ["Eritrea", 5309659, 101000, 6722],
    ["Costa Rica", 5058007, 51060, 59006],
    ["New Zealand", 4957320, 262443, 203404],
    ["Ireland", 4857000, 68883, 372695],
    ["Palestine", 4780978, 5640, 12670],
    ["Oman", 4688571, 309500, 82243],
    ["Liberia", 4475353, 96320, 3218],
    ["Kuwait", 4226920, 17818, 141050],
    ["Panama", 4218808, 74340, 65206],
    ["Croatia", 4105493, 55974, 60668],
    ["Mauritania", 4077347, 1025520, 5200],
    ["Georgia", 3729600, 69700, 16324],
    ["Moldova", 3547539, 32891, 11436],
    ["Uruguay", 3518552, 175015, 60180],
    ["Bosnia and Herzegovina", 3502550, 51187, 19881],
    ["Mongolia", 3253881, 1553556, 12724],
    ["Puerto Rico", 3195153, 9104, 104344],
    ["Armenia", 2969200, 28342, 12553],
    ["Albania", 2862427, 27398, 15202],
    ["Lithuania", 2790322, 62680, 53323],
    ["Qatar", 2760586, 11586, 192450],
    ["Jamaica", 2726667, 10831, 15442],
    ["Namibia", 2458936, 823290, 14148],
    ["Botswana", 2338851, 566730, 18998],
    ["The Gambia", 2228075, 10000, 1605],
    ["Gabon", 2109099, 257667, 17033],
    ["Slovenia", 2076595, 20151, 54242],
    ["North Macedonia", 2075301, 25433, 11340],
    ["Lesotho", 2007201, 30355, 2981],
    ["Latvia", 1916200, 62249, 34881],
    ["Guinea-Bissau", 1604528, 28120, 1480],
    ["Bahrain", 1543300, 767, 38291],
    ["East Timor", 1387149, 14919, 3155],
    ["Trinidad and Tobago", 1359193, 5128, 22311],
    ["Equatorial Guinea", 1358276, 28051, 13225],
    ["Estonia", 1323820, 42388, 30312],
    ["Mauritius", 1265577, 2030, 14033],
    ["Eswatini", 1093238, 17204, 4756],
    ["Djibouti", 1078373, 23180, 2187],
    ["Fiji", 884887, 18274, 5223],
    ["Comoros", 873724, 1862, 745],
    ["Cyprus", 864200, 9241, 24492],
    ["Guyana", 786508, 196849, 3636],
    ["Bhutan", 741672, 38394, 2624],
    ["Solomon Islands", 680806, 27986, 1424],
    ["Montenegro", 622359, 13452, 5389],
    ["Luxembourg", 613894, 2586, 68770],
    ["Suriname", 573085, 156000, 3840],
    ["Cape Verde", 555483, 4033, 1972],
    ["Malta", 475701, 316, 14505],
    ["Brunei", 421300, 5265, 14082],
    ["Belize", 398050, 22806, 1912],
    ["Bahamas", 385340, 10010, 12928],
    ["Maldives", 378114, 298, 4809],
    ["Iceland", 357050, 25882, 23000],
    ["Vanuatu", 304500, 12189, 957],
    ["Barbados", 287010, 431, 5172],
    ["São Tomé and Príncipe", 201784, 964, 450],
    ["Samoa", 200874, 2821, 878],
    ["Saint Lucia", 180454, 606, 1774],
    ["Kiribati", 120100, 811, 205],
    ["Saint Vincent and the Grenadines", 109803, 389, 828],
    ["Grenada", 108825, 344, 1192],
    ["Federated States of Micronesia", 105300, 702, 335],
    ["Antigua and Barbuda", 104084, 443, 1612],
    ["Tonga", 100651, 717, 468],
    ["Seychelles", 96762, 455, 1564],
    ["Andorra", 74794, 468, 3000],
    ["Dominica", 74679, 751, 485],
    ["Saint Kitts and Nevis", 56345, 261, 1005],
    ["Marshall Islands", 55500, 181, 230],
    ["Liechtenstein", 38380, 160, 6289],
    ["Monaco", 38300, 2, 6075],
    ["San Marino", 33419, 61, 1769],
    ["Palau", 17900, 459, 300],
    ["Nauru", 11000, 21, 114],
    ["Tuvalu", 10200, 26, 45],
    ["Vatican City State", 1000, 0.44, 2]
];

const databaseSearch = (x) => {

    var ind = -1;
    for(let i = 0; i < dataBase.length; i++){
        if(x.toLocaleLowerCase() == dataBase[i][0].toLocaleLowerCase()){
            ind = i;
            break;
        } 
    }

    if(ind == -1) {
        return false;
    } else {
        return ind;
    }
}

function longestString(a) {
    let max = a[0][0].length;
    let index = 0;
    for(let i = 0; i < a.length; i++) {
        if(max < a[i][0].length) {
            max = a[i][0].length;
            index = i;
        }
    }
    return max;
}