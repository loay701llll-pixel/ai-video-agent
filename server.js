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
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0b1020;
  color: white;
}

.container {
  max-width: 700px;
  margin: 30px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 32px;
}

.subtitle {
  text-align: center;
  color: #aaa;
  margin-bottom: 25px;
}

.card {
  background: #151c31;
  padding: 22px;
  border-radius: 18px;
}

label {
  display: block;
  margin-top: 16px;
  margin-bottom: 7px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #39435f;
  background: #0d1427;
  color: white;
  font-size: 16px;
}

button {
  width: 100%;
  margin-top: 25px;
  padding: 16px;
  border: 0;
  border-radius: 10px;
  background: #5865f2;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

#result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  background: #0d1427;
  display: none;
  line-height: 2;
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
<input id="title" placeholder="اكتب عنوان الفيلم">

<label>نوع الفيلم</label>
<select id="genre">
<option>غموض</option>
<option>خيال علمي</option>
<option>مغامرة</option>
<option>دراما</option>
<option>رومانسي</option>
<option>أكشن</option>
</select>

<label>مدة الفيلم</label>
<select id="duration">
<option value="1">1 دقيقة</option>
<option value="3">3 دقائق</option>
<option value="5">5 دقائق</option>
<option value="10">10 دقائق</option>
<option value="15">15 دقيقة</option>
</select>

<label>أسلوب الفيديو</label>
<select id="style">
<option>سينمائي واقعي</option>
<option>أنمي شبه واقعي</option>
<option>خيال علمي سينمائي</option>
<option>درامي واقعي</option>
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
  const result = document.getElementById("result");

  if (!title) {
    alert("اكتب عنوان الفيلم أولاً");
    return;
  }

  result.style.display = "block";

  result.innerHTML = "⏳ الوكيل بدأ تحليل الفيلم...";

  const data = {
    title: title,
    genre: document.getElementById("genre").value,
    duration: document.getElementById("duration").value,
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

    result.innerHTML =
      "✅ تم إنشاء المشروع<br>" +
      "🎬 العنوان: " + project.title + "<br>" +
      "🎭 النوع: " + project.genre + "<br>" +
      "⏱️ المدة: " + project.duration + " دقائق<br>" +
      "🎨 الأسلوب: " + project.style + "<br>" +
      "📺 المقاس: " + project.ratio + "<br><br>" +
      "🧠 الخطوة التالية: إنشاء Story Bible والمشاهد.";

  } catch (error) {

    result.innerHTML = "❌ حدث خطأ أثناء تشغيل الوكيل.";

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

  const { title, genre, duration, style, ratio } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "عنوان الفيلم مطلوب"
    });
  }

  res.json({
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
