function solve() {

    const infoSpanRef = document.querySelector("#info span");
    const departBtn = document.getElementById('depart')
    const arriveBtn = document.getElementById('arrive')
    const stop = {
        currentStopId: "",
        nextStopId: 'depot'
    }

    const url = "http://localhost:3030/jsonstore/bus/schedule/"

    async function depart() {
        try {
            const response = await fetch(url + stop.nextStopId);
            const data = await response.json();
            stop.nextStopId = data.next;
            stop.currentStopId = data.name;
            infoSpanRef.textContent = "Next stop " + stop.currentStopId;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (error) {
            infoSpanRef.textContent = "Error"
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }
    
    function arrive() {
        infoSpanRef.textContent = "Arrive " + stop.currentStopId;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();