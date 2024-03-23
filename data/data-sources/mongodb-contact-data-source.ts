import {ContactDataSource} from "../interfaces/data-sources/contact-data-source";
import {DatabaseWrapper} from "../interfaces/data-sources/database-wrapper";
import {Contact} from "../../domain/entities/contact";
import {it} from "node:test";

export class MongoDBContactDataSource implements ContactDataSource {

    private database: DatabaseWrapper

    constructor(database: DatabaseWrapper) {
        this.database = database
    }

    async create(contact: Contact): Promise<boolean> {
        return await this.database.insertOne(contact)
    }

    async getAll(): Promise<Contact[]> {
        const result = await this.database.find({})
        return result.map((item: Contact) => ({
            id: item._id?.toString(),
            surname: item.surname,
            firstName: item.firstName,
            email: item.email
        }))
    }
}