async function fetchData(){
    const data = await fetch('./src/dummy.json')
    const employee = await data.json();
    console.log(employee);

    let selectedEmployeesId = employee[0].id;
    let selectedEmployee = employee[0];

    const employeeList = document.querySelector('.employees__name__list');
    const employeeInfo = document.querySelector('.employees__single__info');


    // Add a new employee logic
    const createEmployee = document.querySelector('.createEmployee');
    const addEmployeeModal = document.querySelector('.add__employee');
    const addEmployeeForm = document.querySelector('.add__employee__create');

    createEmployee.addEventListener('click', () => {
        addEmployeeModal.style.display = 'flex'
    });

    addEmployeeModal.addEventListener('click', (e) =>{
        if(e.target.className === 'add__employee'){
            addEmployeeModal.style.display = 'none'
        }
    });

    addEmployeeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        let empData = {}
        values.forEach(val => {
            empData[val[0]] = val[1];
        });

        empData.id = employee[employee.length-1].id + 1;
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
        empData.imageUrl = empData.imageUrl || 'https://cdn-icons-png.flaticon.com/512/0/93.png';
        employee.push(empData);
        renderEmployee();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = 'none'
    })

    // Select Employee Logic
    employeeList.addEventListener('click', (e) =>{
        
        if(e.target.tagName === "SPAN" && selectedEmployeesId !== e.target.id){
            selectedEmployeesId = e.target.id;
            renderEmployee();
            renderSingleEmployee();
        }

        // delete employee logic
        if (e.target?.tagName === 'I') {
            employee = employee.filter(emp => String(emp.id) !== e.target.parentNode?.id)
            if (String(selectedEmployeesId) === e.target.parentNode?.id) {
                selectedEmployeesId = employee[0]?.id || -1;
                renderSingleEmployee();
            }
            renderEmployee();
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
            employeeItem.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</>`;

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