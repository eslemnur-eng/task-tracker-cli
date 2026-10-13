//Program çalıştığında uygulamanın başlatılmasını sağlayan ana dosya.
//Her TypeScript projesinde mutlaka index.ts olmak zorunda değildir. Dosyanın adı main.ts veya app.ts de olabilir.
import type {Task} from "./types.js";

const command = process.argv[2];
const description = process.argv[3];


if (command === "add") {
  if (!description || description.trim() === "") {
    console.log("Hata: Görev açıklaması boş olamaz.");
  } else { // else blokunun içine girdiğinde description değerinin undefined olmadığını anlar.
    const now = new Date().toISOString();

    const task: Task = {
      id: 1,
      description: description.trim(),
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    console.log(task);
  }
}