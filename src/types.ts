export interface Task {
    id: number;
    description: string | undefined;
    status: "todo" | "in-progress" | "done";
    createdAt: string;
    updatedAt: string;
}
// bu dosyayı import type {Task} from "./types.js" şeklinde import ederiz.

