function plotGraph() {
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const maxValue = parseFloat(document.getElementById("maxValue").value);
  
    if (isNaN(inputValue) || isNaN(maxValue)) {
      alert("Please enter valid numeric values.");
    } else if (inputValue > maxValue) {
      document.getElementById("error-popup").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("error-popup").classList.add("hidden");
      }, 3000);
    } else {
      const percentage = (inputValue / maxValue) * 100;
      document.getElementById("bar").style.height = `${percentage}%`;
    }
  }
  