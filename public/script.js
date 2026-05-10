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

    const response = await fetch("http://localhost:5000/get-plan", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        skin,
        budget
      })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `

      <div class="result-card">

        <h3>
          ✨ Hey ${name}
        </h3>

        <p style="
          color:#f3d9ff;
          margin-bottom:18px;
          font-size:13px;
        ">
          your personalized glow routine is ready 💖
        </p>

        <!-- MORNING -->

        <div class="plan-box">

          <h4>🌞 Morning</h4>

          ${data.plan.morning.map(item =>

            `<div class="item">
              🧴 ${item.name} - ₹${item.price}
            </div>`

          ).join("")}

        </div>

        <!-- NIGHT -->

        <div class="plan-box">

          <h4>🌙 Night</h4>

          ${data.plan.night.map(item =>

            `<div class="item">
              🌸 ${item.name} - ₹${item.price}
            </div>`

          ).join("")}

        </div>

        <!-- SELF CARE -->

        <div class="motivation-box">

          <h4>✨ Self Care Corner</h4>

          <p>💧 Stay hydrated</p>

          <p>🥗 Eat healthy for healthy skin</p>

          <p>🌸 Healing takes time</p>

          <p>✨ Beauty starts from within</p>

        </div>

      </div>
    `;

  } catch (err) {

    console.log(err);

    alert("Server error 😭");
  }
}