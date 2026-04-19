async function getPlan() {
  const name = document.getElementById("name").value;
  const skin = document.getElementById("skin").value;
  const budget = document.getElementById("budget").value;
  const issue = document.getElementById("issue").value;
  showQuote();
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

    <div class="plan-box">
      <h4>🌞 Morning</h4>
      ${data.plan.morning.map(item => `<div class="item">🧴 ${item}</div>`).join("")}
    </div>

    <div class="plan-box">
      <h4>🌙 Night</h4>
      ${data.plan.night.map(item => `<div class="item">🌸 ${item}</div>`).join("")}
    </div>
  </div>
`;
  } catch (err) {
    console.log(err);
    alert("Server error 😭");
  }
}
const quotes = [
  "Glow different 💖",
  "You are your best investment ✨",
  "Self-care is not selfish 🌸",
  "Healthy skin = happy you 💅",
  "Confidence looks good on you 💜"
];

function showQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").innerText = random;
}