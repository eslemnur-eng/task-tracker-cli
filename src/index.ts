import type { Task } from "./types.js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

// Terminal argümanları
const command = process.argv[2];
const description = process.argv[3];
const newDescription = process.argv[4];

// Görevlerin saklanacağı dosya
const TASKS_FILE = "./tasks.json";

function isValidId(id: number): boolean {
  return Number.isInteger(id) && id > 0;
}

// Dosya yoksa oluştur
if (!existsSync(TASKS_FILE)) {
  writeFileSync(TASKS_FILE, "[]");
}

// JSON dosyasını oku
let tasks: Task[] = [];

try {
  const data: unknown = JSON.parse(readFileSync(TASKS_FILE, "utf-8"));

  if (!Array.isArray(data)) {
    throw new Error("Görev dosyası bir dizi olmalıdır.");
  }

  for (const task of data) {
    if (
      typeof task !== "object" ||
      task === null ||
      !Number.isInteger(task.id) ||
      task.id <= 0 ||
      typeof task.description !== "string" ||
      !["todo", "in-progress", "done"].includes(task.status) ||
      typeof task.createdAt !== "string" ||
      typeof task.updatedAt !== "string"
    ) {
      throw new Error("Görev verileri geçersiz.");
    }
  }

  tasks = data as Task[];
} catch {
  console.log("Hata: tasks.json dosyası okunamadı veya içeriği geçersiz.");
  process.exit(1);
}

// ADD - Görev ekleme
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

// LIST - Görevleri listeleme
} else if (command === "list") {

  if (
    description &&
    description !== "todo" &&
    description !== "in-progress" &&
    description !== "done"
  ) {
    console.log("Hata: Geçersiz görev durumu.");
  } else {

    const filteredTasks = description
      ? tasks.filter(task => task.status === description)
      : tasks;

    if (filteredTasks.length === 0) {
      console.log("Görev bulunamadı.");
    } else {
      filteredTasks.forEach(task => {
        console.log(
          `ID: ${task.id} | ${task.description} | ${task.status}`
        );
      });
    }
  }

// DELETE - Görev silme
} else if (command === "delete") {
//
  const id = Number(description);

  if (!description || !isValidId(id)) {
    console.log("Hata: Geçerli bir görev ID'si giriniz.");
  } else {

    const remainingTasks = tasks.filter(task => task.id !== id);

    if (remainingTasks.length === tasks.length) {
      console.log("Hata: Görev bulunamadı.");
    } else {

      writeFileSync(
        TASKS_FILE,
        JSON.stringify(remainingTasks, null, 2)
      );

      console.log(`ID: ${id} olan görev silindi.`);
    }
  }

// UPDATE - Görev açıklamasını güncelleme
} else if (command === "update") {

  const id = Number(description);

  if (!description || !Number.isInteger(id) || id <= 0) {
    console.log("Hata: Geçerli bir görev ID'si giriniz.");

  } else if (!newDescription || newDescription.trim() === "") {
    console.log("Hata: Yeni açıklama boş olamaz.");

  } else {

    const task = tasks.find(task => task.id === id);

    if (!task) {
      console.log("Hata: Görev bulunamadı.");
    } else {

      task.description = newDescription.trim();
      task.updatedAt = new Date().toISOString();

      writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));

      console.log(`ID: ${id} olan görev güncellendi.`);
    }
  }

// MARK-IN-PROGRESS - Görevi devam ediyor olarak işaretleme
} else if (command === "mark-in-progress") {

  const id = Number(description);

  if (!description || !Number.isInteger(id) || id <= 0) {
    console.log("Hata: Geçerli bir görev ID'si giriniz.");
  } else {

    const task = tasks.find(task => task.id === id);

    if (!task) {
      console.log("Hata: Görev bulunamadı.");
    } else {

      task.status = "in-progress";
      task.updatedAt = new Date().toISOString();

      writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));

      console.log(`ID: ${id} olan görev devam ediyor olarak işaretlendi.`);
    }
  }

// MARK-DONE - Görevi tamamlandı olarak işaretleme
} else if (command === "mark-done") {

  const id = Number(description);

  if (!description || !Number.isInteger(id) || id <= 0) {
    console.log("Hata: Geçerli bir görev ID'si giriniz.");
  } else {

    const task = tasks.find(task => task.id === id);

    if (!task) {
      console.log("Hata: Görev bulunamadı.");
    } else {

      task.status = "done";
      task.updatedAt = new Date().toISOString();

      writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));

      console.log(`ID: ${id} olan görev tamamlandı.`);
    }
  }

// Bilinmeyen komut
} else {
  console.log("Hata: Bilinmeyen komut.");
}