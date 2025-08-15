import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { User } from "../entity/User";
import { Employee } from "../entity/Employee";
import bcrypt from "bcrypt";

@EventSubscriber()
export class PasswordSubscriber implements EntitySubscriberInterface<any> {
    listenTo() {
        return Object; 
    }

    async beforeInsert(event: InsertEvent<any>) {
        if (event.entity instanceof User || event.entity instanceof Employee) {
            if (event.entity.password) {
                event.entity.password = await bcrypt.hash(event.entity.password, 10);
            }
        }
    }

    async beforeUpdate(event: UpdateEvent<any>) {
        if (event.entity instanceof User || event.entity instanceof Employee) {
            if (event.entity.password && event.databaseEntity.password !== event.entity.password) {
                event.entity.password = await bcrypt.hash(event.entity.password, 10);
            }
        }
    }
}
