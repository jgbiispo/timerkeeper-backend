import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { Punch } from "../entity/Punches";
import { Log, LogType } from "../entity/Log";
import { AppDataSource } from "../data-source";

@EventSubscriber()
export class PunchSubscriber implements EntitySubscriberInterface<Punch> {
    listenTo() {
        return Punch;
    }

    async afterInsert(event: InsertEvent<Punch>) {
        const logRepo = AppDataSource.getRepository(Log);
        await logRepo.save({
            type: LogType.PUNCH,
            message: `Punch registrado: EmployeeID=${event.entity.employee.id}, Tipo=${event.entity.type}, Timestamp=${event.entity.timestamp}`,
            entityId: event.entity.id,
            companyId: event.entity.employee.company?.id
        });
    }
}
