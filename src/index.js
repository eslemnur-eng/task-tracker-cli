import { existsSync, readFileSync, writeFileSync } from "fs";
const command = process.argv[2];
const description = process.argv[3];
const TASK_FİlE = "./tasks.json"; // görevleri saklayacağımız dosya yolu.
const fileContent = readFileSync(TASK_FİlE, "utf-8");
const tasks = [];
if (!existsSync(TASK_FİlE)) {
    writeFileSync(TASK_FİlE, "[]");
}
if (command === "add") {
    if (!description || description.trim() === "") {
        console.log("Hata: Görev açıklaması boş olamaz.");
    }
    else { // else blokunun içine girdiğinde description değerinin undefined olmadığını anlar.
        const now = new Date().toISOString();
        const ids = tasks.map(task => task.id);
        const maxId = Math.max(0, ...ids);
        const newId = maxId + 1;
        const task = {
            id: 1,
            description: description.trim(),
            status: "todo",
            createdAt: now,
            updatedAt: now,
        };
        tasks.push(task); // oluşturduğumuz tasks nesnesini diziye ekledik. push() js'de dizilerim 
        const jsonData = JSON.stringify(tasks, null, 2); // jsonData değişkenine tasks dizisini json formatına çevirip atadık.
        writeFileSync(TASK_FİlE, jsonData);
        console.log(`Görev başarıyla eklendi. (ID: ${task.id})`);
        console.log(task);
    }
}
//# sourceMappingURL=index.js.map