console.log("script running")

let input = document.getElementById("inp")
let saveBtn = document.getElementById("saveD")
// let recentdata = document.getElementById("sp1")
let getAll = document.getElementById("allD")
let delAll = document.getElementById("delAll")
let p = document.querySelector("#p1")
let dd = document.querySelector("#dd")


let storageData = []

input.addEventListener('input', (e)=>{
    let inpVal = e.target.value
    // console.log(inpVal)  
})


const setVal = (val) => {
    // Getting existing data
    let existData = JSON.parse(localStorage.getItem('data')) || [];
    // Pushing value in that
    existData.push(val);

    // Stringify the updated data array
    let stringedD = JSON.stringify(existData);
    localStorage.setItem('data', stringedD);
    location.reload()
};


// //saveBtn button -------------------------

// Save button event listener
saveBtn.addEventListener('click', (e) => {
e.preventDefault();
let inpVal = input.value;
if(inpVal == ''){
    alert("Please fill in the values")
    return
}
else{
setVal(inpVal);
alert("Data saved Successfully! Click on 'Get All Data' button to view. ")
// recentdata.innerText = inpVal
input.value = '';// Clear the input field

// location.reload();
// allD.click();

} 
});

//---------------DELETE ONE ----------------


const delOne =(index)=()=>{
    let data = JSON.parse(localStorage.getItem('data'))
    if(data){
        data.splice(index, 1)
        localStorage.setItem('data', JSON.stringify(data))
        alert("Selected record has been deleted")
        location.reload();
        
    }else{alert("No data exists in storage to delete.");}
}

//---------------EDIT ONE --------------------
const editOne = (index) => {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data) {
        let newValue = prompt("Enter the new value:", data[index]);
        if (newValue !== null) {
            data[index] = newValue; // Update the item at the specified index
            localStorage.setItem('data', JSON.stringify(data)); // Save the updated data back to localStorage
            alert("Selected record has been updated");
            location.reload(); // Reload the page to reflect changes
        }
    } else {
        alert("No data exists in storage to edit.");
    }
};

//getting all data button
allD.addEventListener('click', () => {
    let retv = JSON.parse(localStorage.getItem('data'));
    if (retv) {
        // console.log(retv);
        retv.map((data, index) => {
            // console.log(index, data);
            // Create a new list item element
            const newli = document.createElement('li');
            newli.innerHTML = `${index}--${data}
                <button onclick ="editOne(${index})" type="button" class="editBtn">Edit This</button>
                <button onclick ="delOne(${index})" type="button" class="delBtn">Delete This</button>`;
            p.appendChild(newli);
            // dd.innerHTML = ` <button onclick ="" type="button" class="delBtn">Refresh results</button>;`

        });
        if(retv == 0){
            alert("Oops!! Nothing to show. Please add something.")
                }
        allD.setAttribute("disabled", true);
        
    } 
    
    
    else {
        alert("There's no data in storage. Please add to proceed.");
    }
});

 //-------------------------DELETE ALL-------------------------------

delAll.addEventListener('click', ()=>{
    let exData = JSON.parse(localStorage.getItem('data'))
    if(exData){
    window.localStorage.removeItem('data')
    alert("All Data has been emptied")
    location.reload()}
    else{
        alert("No Data exists in storage to Delete")
    }
})

