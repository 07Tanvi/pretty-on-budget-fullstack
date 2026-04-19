async function getPlan() {
  const name = document.getElementById("name").value;
  const skin = document.getElementById("skin").value;
  const budget = document.getElementById("budget").value;
  const issue = document.getElementById("issue").value;

  if (!name || !budget || !issue) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/get-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skin, budget, issue }),
    });

    const data = await res.json();

    document.getElementById("result").innerHTML = `
      <h3>✨ Hey ${name}</h3>

      <div class="section">
        🌞 <b>Morning</b><br>
        ${data.plan.morning.join("<br>")}
      </div>

      <div class="section">
        🌙 <b>Night</b><br>
        ${data.plan.night.join("<br>")}
      </div>
    `;
  } catch (err) {
    console.log(err);
    alert("Server error 😭");
  }
}