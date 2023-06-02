var pophide = document.getElementById('pop_up_window');

var overlay = document.getElementById('whole-middle-container');



function editdel(index) {
    var x = document.getElementById("edidel-div-" + index);
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function popdisplay() {
    pophide.style.display = 'flex';
    overlay.style.opacity = '0.2';
    document.body.style.backgroundColor = 'black';
}

function poplhide() {
    pophide.style.display = 'none';
    overlay.style.opacity = '1';
    document.body.style.backgroundColor = 'rgb(4, 19, 26)';
}


function submitted() {
    var fname = document.getElementById('fnamee').value;
    var lname = document.getElementById('lnamee').value;
    var phnum = document.getElementById('pnum').value;
    var adda = document.getElementById('addaras').value;

    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    let html = `<div class="card"><ul class="itul" id="myUL">`;

    html += '<li><img onclick="editdel(' + ContactList.length + ')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

    html += '<div class="edidel-div" id="edidel-div-' + ContactList.length + '"> <div class="div-del" onclick="onndelete()">DELETE</div> <div class="div-edit"  onclick="onnedit()">EDIT</div></div>';

    html += '<li class="center-human"><img class="human" src="./IMAGES/human.png"></li>';
    html += `<li>FirstName: ${fname}</li>`;
    html += `<li>LastName: ${lname}</li>`;
    html += `<li>Phone Number: ${phnum}</li>`;
    html += `<li>Address: ${adda}</li>`;

    html += `</ul><div>`;
    document.getElementById("all-card-parts").innerHTML += html;

    document.getElementById('fnamee').value = "";
    document.getElementById('lnamee').value = "";
    document.getElementById('pnum').value = "";
    document.getElementById('addaras').value = "";


    ContactList.push({
        firstname: fname, lastname: lname, Phonenumber: phnum,
        Address: adda
    });

    localStorage.setItem('ContactList', JSON.stringify(ContactList));

    poplhide();

    showdata();

}


function showdata() {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    document.getElementById("all-card-parts").innerHTML = "";
    for (let index = 0; index < ContactList.length; index++) {
        
        const element = ContactList[index];
        // console.log(element.firstname + " Inputted");
        let html = `<div class="card"><ul class="itul" id="myUL">`;

        html += '<li><img onclick="editdel(' + index + ')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

        html += '<li><div class="edidel-div" id="edidel-div-' + index + '"> <div class="div-del" onclick="onndelete(' + index + ')">DELETE</div> <div class="div-edit"  onclick="onnedit(' + index + ')">EDIT</div></div></li>';

        html += '<li class="center-human"><img class="human" src="./IMAGES/human.png"></li>';
        html += `<li>FirstName: ${element.firstname}</li>`;
        html += `<li>LastName: ${element.lastname}</li>`;
        html += `<li>Phone Number: ${element.Phonenumber}</li>`;
        html += `<li>Address: ${element.Address}</li>`;

        html += `</ul><div>`;
        document.getElementById("all-card-parts").innerHTML += html;
    }
}


function onndelete(index) {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }


    ContactList.splice(index, 1);

    localStorage.setItem("ContactList", JSON.stringify(ContactList));
    showdata();
}


function onnedit(index) {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    const element = ContactList[index];
    // console.log(element.firstname + " Displaying");
    // console.log(element.lastname + " Displaying");
    

    document.getElementById('fnamee').value = element.firstname;
    document.getElementById('lnamee').value = element.lastname;
    document.getElementById('pnum').value = element.Phonenumber;
    document.getElementById('addaras').value = element.Address;
    popdisplay();
    
    ContactList.splice(index, 1);
    localStorage.setItem("ContactList", JSON.stringify(ContactList));
    showdata();
}






// document.onreadystatechange = function () {
//     if (document.readyState === 'complete') {
//         for (i = 0; i < todos.length; i++) {
//             addTodoInUI(todos[i]);
//         }
//     }
// }


function myFunction() {
    // Declare variables

    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }


showdata();


