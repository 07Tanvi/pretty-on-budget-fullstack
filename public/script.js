function getPlan(){

    const name = document.getElementById("name").value;
    const skin = document.getElementById("skin").value;
    const budget = document.getElementById("budget").value;
    const issue = document.getElementById("issue").value;

    if(!name || !skin || !budget || !issue){
        alert("Fill all details 💖");
        return;
    }

    fetch("http://localhost:5000/get-plan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            skin: skin,
            budget: budget,
            issue: issue
        })
    })
    .then(res => res.json())
    .then(data => {

        const p = data.plan;

        document.getElementById("result").innerHTML = `
            <h3>✨ Hey ${name}</h3>

            <h4>🌞 Morning</h4>
            ${p.cleanser}<br>
            ${p.moisturizer}<br>
            ${p.sunscreen}

            <h4>🌙 Night</h4>
            ${p.cleanser}<br>
            ${p.treatment}<br>
            ${p.moisturizer}
        `;
    });

}