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
  });

  document.querySelector("button").onclick = (event) => {
    event.preventDefault();
    let tv = document.getElementById("tv-sub");
    let gb = document.getElementById("gb");
    let subYears = document.getElementById("sub-years");
    let leftYears = document.getElementById("left-years");
    let timesFail = document.getElementById("times-fail");
    console.log(
      tv.checked,
      gb.value,
      subYears.value,
      leftYears.value,
      timesFail.value
    );
    let url = `https://gentle-harbor-75783.herokuapp.com/predict?is_tv_subscriber=${
      tv.checked ? 1 : 0
    }&subscription_age=${subYears.value}&remaining_contract=${
      leftYears.value
    }&service_failure_count=${timesFail.value}&download_avg=${gb.value}`;
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.onload((res) => {
      console.log(res);
    });
  };
};
