async function fetchData(){
    const data = await fetch('./src/dummy.json')
    const res = await data.json();
    console.log(res);
}

fetchData();