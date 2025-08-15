import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User, UserRole } from "../entity/User";
import { Company } from "../entity/Company";

export class FirstUserController {
    static async createWithCompany(req: Request, res: Response) {
        const { name, email, password, companyName, companyCnpj } = req.body;
        const userRepo = AppDataSource.getRepository(User);
        const companyRepo = AppDataSource.getRepository(Company);

        try {
            const user = userRepo.create({ name, email, password, role: UserRole.OWNER });

            const company = companyRepo.create({ name: companyName, cnpj: companyCnpj, owner: user });

            await userRepo.save(user);
            await companyRepo.save(company);

            res.status(201).json({ user, company });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
