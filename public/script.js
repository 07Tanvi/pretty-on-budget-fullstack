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
  <div class="result-card">
    <h3>✨ Hey ${name}</h3>

    <div class="section">
      <h4>🌞 Morning</h4>
      <p>${data.plan.morning.join("<br>")}</p>
    </div>

    <div class="section">
      <h4>🌙 Night</h4>
      <p>${data.plan.night.join("<br>")}</p>
    </div>
  </div>
`;
  } catch (err) {
    console.log(err);
    alert("Server error 😭");
  }
}