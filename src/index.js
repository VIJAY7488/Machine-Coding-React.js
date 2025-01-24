async function fetchData(){
    const data = await fetch('./src/dummy.json')
    const employee = await data.json();
    console.log(employee);

    let selectedEmployeesId = employee[0].id;
    let selectedEmployee = employee[0];

    const employeeList = document.querySelector('.employees__name__list');
    const employeeInfo = document.querySelector('.employees__single__info');


    employeeList.addEventListener('click', (e) =>{
        if(e.target.tagName === "SPAN" && selectedEmployeesId !== e.target.id){
            selectedEmployeesId = e.target.id;
            renderEmployee();
            renderSingleEmployee();
        }
    })

   // Employee Rendering Logic
    const renderEmployee = () => {
        employeeList.innerHTML = '';
        employee.forEach(emp => {
            const employeeItem = document.createElement('span');
            employeeItem.classList.add('employees__name__item');


            if(parseInt(selectedEmployeesId, 10) === emp.id){
                employeeItem.classList.add('selected');
                selectedEmployee = emp;
            }

            employeeItem.setAttribute('id', emp.id);
            employeeItem.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">X</>`;

            employeeList.append(employeeItem);
        }); 
        
    }
    
    renderEmployee();


    const renderSingleEmployee = () =>{
        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single__heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} 
        (${selectedEmployee.age})
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
        `;
    }

    if(selectedEmployee){
        renderSingleEmployee();
    }
}

fetchData();