import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepo = AppDataSource.getRepository(User);

export class UserController {
    static async create(req: Request, res: Response) {
        const { name, email, password, role } = req.body;
        try {
            const user = userRepo.create({ name, email, password, role });
            await userRepo.save(user);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async list(req: Request, res: Response) {
        const users = await userRepo.find({ relations: ["companies"] });
        res.json(users);
    }

    static async get(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userRepo.findOne({ where: { id }, relations: ["companies"] });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userRepo.findOneBy({ id });
        if (!user) return res.status(404).json({ error: "User not found" });

        userRepo.merge(user, req.body);
        await userRepo.save(user);
        res.json(user);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await userRepo.delete(id);
        if (result.affected === 0) return res.status(404).json({ error: "User not found" });
        res.status(204).send();
    }
}
