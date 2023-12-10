
// // addnew.onclick = function (){
// //     let newElementp = document.createElement('div');
// //     newElementp.className="notes";
// //     let nelech = document.createElement('div');
// //     nelech.className="tools";
// //     let editbut = document.createElement('button');
// //     editbut.innerText="Edit";
// //     editbut.id=`e${localStorage.getItem("count")}`;
// //     let deletebut = document.createElement('button');
// //     deletebut.innerText="Delete";
// //     deletebut.id=`d${localStorage.getItem("count")}`;
// //     let savebut = document.createElement('button');
// //     savebut.innerText="Save";
// //     savebut.id=`s${localStorage.getItem("count")}`;
// //     let text = document.createElement('textarea');
// //     text.id=`t${localStorage.getItem("count")}`;

// //   document.body.appendChild(newElementp);
// //   newElementp.appendChild(nelech);
// //   nelech.appendChild(editbut);
// //   nelech.appendChild(deletebut);
// //   nelech.appendChild(savebut);
// //   newElementp.appendChild(text);
    
// // };


class Notes {
  constructor() {
    this.text = "";
    this.structure = `<div class="tools">
      <button class="delete-btn">Delete</button>
      <button class="save-btn">Save</button>
    </div>
    <textarea class="textarea"></textarea>`;
  
  }
}

document.getElementById("addnew").onclick = function () {
  createBox("text",true);
};


let retrievedArray = JSON.parse(localStorage.getItem('logbook'));

window.onload = () => {
  retrievedArray.forEach(obj => createBox(`${obj.text}`,false));
};

let arrayOfObjects = retrievedArray || [];

function createBox(text,flag) {
  const newNotes = new Notes();
  let newElement = document.createElement("div");
  newElement.className = "notes";
  newElement.innerHTML = newNotes.structure;
  document.getElementById("here").append(newElement);
  if(flag)arrayOfObjects.push(newNotes);
  

  let buttons = newElement.querySelectorAll("button");
  newElement.querySelector(".textarea").innerHTML = `${text}`;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      if (event.target.classList.contains("save-btn")) {
        // Find the corresponding Notes object
        let index = Array.from(newElement.parentElement.children).indexOf(newElement);
        let correspondingNotes = arrayOfObjects[index];

         // Access the textarea and update the text property
         let textarea = newElement.querySelector(".textarea");
         correspondingNotes.text = textarea.value;

      }else if (event.target.classList.contains("delete-btn")) {
        let index = Array.from(newElement.parentElement.children).indexOf(newElement);
        arrayOfObjects.splice(index,1);
        newElement.remove();
        localStorage.setItem('logbook', JSON.stringify(arrayOfObjects));
      let retrievedArray = JSON.parse(localStorage.getItem('logbook'));
      console.log(retrievedArray)
      }

      localStorage.setItem('logbook', JSON.stringify(arrayOfObjects));
      // let retrievedArray = JSON.parse(localStorage.getItem('logbook'));
    });
  }

  console.log(arrayOfObjects);
}






