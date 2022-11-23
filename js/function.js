window.onload = () => {
  let sliderShows = document.querySelectorAll(".slider-show");
  let sliders = document.querySelectorAll(".range");
  for (let i = 0; i < sliderShows.length; i++) {
    sliderShows[i].innerText = sliders[i].value;
    sliders[i].addEventListener("input", (event) => {
      sliderShows[i].innerText = event.target.value;
    });
  }

  document.querySelector(".input-last").addEventListener("change", (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    if (event.target.value > 4416) {
      event.target.value = 4416;
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target.getAttribute("id") == "restore") {
      document.getElementById("not-ok").style.display = "none";
      document.getElementById("ok").style.display = "none";
      document.getElementById("content").style.display = "flex";
      document.getElementById("gb").value = "";
      document.getElementById("sub-years").value = 0.9;
      document.querySelector(".slider-show").innerText = 0.9;
      document.getElementById("left-years").value = 0;
      document.getElementById("times-fail").value = 0;
      document.querySelectorAll(".slider-show")[1].innerText = 0;
      document.querySelectorAll(".slider-show")[2].innerText = 0;
    }
  });

  document.querySelector("#submit").onclick = (event) => {
    event.preventDefault();
    let tv = document.getElementById("tv-sub");
    let gb = document.getElementById("gb");
    let subYears = document.getElementById("sub-years");
    let leftYears = document.getElementById("left-years");
    let timesFail = document.getElementById("times-fail");
    console.log(
      tv.checked,
      gb.value ? gb.value : "0",
      subYears.value,
      leftYears.value,
      timesFail.value
    );
    let url = `https://gentle-harbor-75783.herokuapp.com/predict?is_tv_subscriber=${
      tv.checked ? 1 : 0
    }&subscription_age=${subYears.value}&remaining_contract=${
      leftYears.value
    }&service_failure_count=${timesFail.value}&download_avg=${
      gb.value ? gb.value : "0"
    }`;
    console.log(url);
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        if (data == 0) {
          document.getElementById("content").style.display = "none";
          document.getElementById("ok").style.display = "block";
        } else {
          document.getElementById("content").style.display = "none";
          document.getElementById("not-ok").style.display = "block";
        }
      });
  };
};
