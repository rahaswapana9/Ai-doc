async function getDiagnosis() {
  const symptom = document.getElementById("symptom").value;
  const resultElement = document.getElementById("result");

  if (!symptom.trim()) {
    resultElement.innerHTML = "⚠️ Please describe your symptom.";
    return;
  }

  resultElement.innerHTML = "⏳ Processing...";

  try {
    // 🔍 Logging what we're sending
    console.log("🟡 Sending symptom:", symptom);

    const response = await fetch("https://script.google.com/macros/s/AKfycbyjAMiX-AF3ObLX0o4-D0EdQJAMOTMUDrTFZ6CKZ9SVWzoVDlsmypr-ObvvANqYdN3z/exec", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain" // ✅ critical for Google Apps Script
      },
      body: symptom
    });

    const data = await response.json();

    // 🔍 Logging what we received
    console.log("🟢 AI Response received:", data);

    resultElement.innerHTML = data.result;
  } catch (error) {
    // 🔴 If anything fails, log exact error
    console.error("❌ Fetch error:", error.message);

    resultElement.innerHTML = "❌ Server error. Please try again later.";
  }
}
