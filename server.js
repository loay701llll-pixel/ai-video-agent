const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>AI Video Agent</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0b1020;
  color: white;
}

.container {
  width: 92%;
  max-width: 700px;
  margin: 40px auto;
}

h1 {
  text-align: center;
  font-size: 34px;
  margin-bottom: 8px;
}

.subtitle {
  text-align: center;
  color: #aab2c8;
  margin-bottom: 30px;
}

.card {
  background: #151c31;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0,0,0,.35);
}

label {
  display: block;
  margin: 15px 0 7px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 14px;
  border: 1px solid #303a58;
  border-radius: 12px;
  background: #0d1427;
  color: white;
  font-size: 16px;
}

button {
  width: 100%;
  margin-top: 25px;
  padding: 16px;
  border: 0;
  border-radius: 12px;
  background: #4f7cff;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

button:active {
  transform: scale(.98);
}

#result {
  display: none;
  margin-top: 25px;
  padding: 20px;
  background: #0d1427;
  border-radius: 15px;
  line-height: 1.9;
}

.step {
  padding: 10px 0;
  border-bottom: 1px solid #27314b;
}
</style>
</head>

<body>

<div class="container">

<h1>🎬 AI Video Agent</h1>

<div class="subtitle">
وكيل ذكي لصناعة الأفلام والفيديوهات
</div>

<div class="card">

<label>عنوان الفيلم</label>
<input id="title" placeholder="مثال: الرسالة التي وصلت بعد وفاة صاحبها">

<label>نوع الفيلم</label>
<select id="genre">
<option>غموض</option>
<option>رعب</option>
<option>خيال علمي</option>
<option>مغامرة</option>
<option>دراما</option>
<option>رومانسي</option>
<option>أكشن</option>
</select>

<label>مدة الفيلم</label>
<select id="duration">
<option value="60">1 دقيقة</option>
<option value="180">3 دقائق</option>
<option value="300">5 دقائق</option>
<option value="600">10 دقائق</option>
<option value="900">15 دقيقة</option>
</select>

<label>أسلوب الفيديو</label>
<select id="style">
<option>سينمائي واقعي</option>
<option>أنمي شبه واقعي</option>
<option>سينمائي خيال علمي</option>
<option>واقعي درامي</option>
</select>

<label>نسبة الفيديو</label>
<select id="ratio">
<option>16:9</option>
<option>9:16</option>
<option>1:1</option>
</select>

<button onclick="startAgent()">
🚀 ابدأ صناعة الفيلم
</button>

<div id="result"></div>

</div>
</div>

<script>

async function startAgent() {

  const title = document.getElementById("title").value.trim();

  if (!title) {
    alert("اكتب عنوان الفيلم أولاً");
    return;
  }

  const result = document.getElementById("result");

  result.style.display = "block";

  result.innerHTML = "⏳ الوكيل يحلل فكرة الفيلم...";

  const data = {
    title: title,
    genre: document.getElementById("genre").value,
    duration: Number(document.getElementById("duration").value),
    style: document.getElementById("style").value,
    ratio: document.getElementById("ratio").value
  };

  try {

    const response = await fetch("/api/create-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const project = await response.json();

    result.innerHTML = \`
      <div class="step">✅ تم استلام المشروع</div>
      <div class="step">🎬 العنوان: \${project.title}</div>
      <div class="step">🎭 النوع: \${project.genre}</div>
      <div class="step">⏱️ المدة: \${project.duration / 60} دقيقة</div>
      <div class="step">🎨 الأسلوب: \${project.style}</div>
      <div class="step">📺 المقاس: \${project.ratio}</div>
      <div class="step">🧠 المرحلة التالية: بناء Story Bible</div>
      <div class="step">🎞️ ثم تقسيم الفيلم إلى مشاهد</div>
      <div class="step">📝 ثم إنشاء Prompts للمشاهد</div>
      <div class="step">🤖 ثم ربط مولد الفيديو</div>
    \`;

  } catch (error) {

    result.innerHTML =
      "❌ حدث خطأ أثناء تشغيل الوكيل";

  }
}

</script>

</body>
</html>
`;

app.get("/", (req, res) => {
  res.send(html);
});

app.post("/api/create-project", (req, res) => {

  const {
    title,
    genre,
    duration,
    style,
    ratio
  } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "عنوان الفيلم مطلوب"
    });
  }

  res.json({
    success: true,
    title,
    genre,
    duration,
    style,
    ratio
  });

});

app.listen(PORT, "0.0.0.0", () => {
  console.log("AI Video Agent running on port " + PORT);
});
