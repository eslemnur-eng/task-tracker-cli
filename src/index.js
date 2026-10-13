//Program çalıştığında uygulamanın başlatılmasını sağlayan ana dosya.
//Her TypeScript projesinde mutlaka index.ts olmak zorunda değildir. Dosyanın adı main.ts veya app.ts de olabilir.
const command = process.argv[2];
if (command === "add") {
    console.log("Görev ekleme işlemi seçildi.");
}
else if (command === "delete") {
    console.log("Görev silme işlemi seçildi");
}
else if (command === "list") {
    console.log("Görev listeleme işlemi seçildi");
}
else {
    console.log("Bilinmeyen Komut.");
}
export {};
//# sourceMappingURL=index.js.map