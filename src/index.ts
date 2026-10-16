import type { Task } from "./types.js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const command = process.argv[2];
const description = process.argv[3];
const TASKS_FILE = "./tasks.json";

// JSON dosyası yoksa oluştur.
if (!existsSync(TASKS_FILE)) {
  writeFileSync(TASKS_FILE, "[]");
}

// JSON dosyasındaki görevleri oku.
const tasks: Task[] = JSON.parse(readFileSync(TASKS_FILE, "utf-8"));

if (command === "add") {

  if (!description || description.trim() === "") {
    console.log("Hata: Görev açıklaması boş olamaz.");
  } else {

    const now = new Date().toISOString();

    const ids = tasks.map(task => task.id);
    const newId = Math.max(0, ...ids) + 1;

    const task: Task = {
      id: newId,
      description: description.trim(),
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(task);

    writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));

    console.log(`Görev başarıyla eklendi. (ID: ${task.id})`);
  }

} else if (command === "list") {

  if (tasks.length === 0) {
    console.log("Henüz görev bulunmuyor.");
  } else {
    tasks.forEach(task => {
      console.log(`ID: ${task.id} | ${task.description} | ${task.status}`);
    });
  }

} else {
  console.log("Bilinmeyen komut.");
}