async function getInfo() {

    const stopIdRef = document.getElementById('stopId');
    const stopId = stopIdRef.value;
    const stopNameRef = document.getElementById('stopName')
    const busesRef = document.getElementById('buses')

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`

    stopNameRef.textContent = "";
    busesRef.innerHTML = "";
    

    try {
        const response = await fetch(url);
        const data = await response.json();
        stopNameRef.textContent = data.name;
        appendChild(Object.entries(data.buses));

    } catch (err) {
        stopNameRef.textContent = 'Error'
    }

    function appendChild(data) {
        for ([bus, time] of data) {
            let li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${time} minutes`;
            busesRef.appendChild(li);
        }
    }

}