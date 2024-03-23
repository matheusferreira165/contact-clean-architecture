import {Contact} from "../../entities/contact";

import {CreateContactUseCase} from "../../interfaces/use-cases/contact/create-contact";
import {ContactRepository} from "../../interfaces/repositories/contact-repository";


export class CreateContact implements CreateContactUseCase {
    contactRepository: ContactRepository

    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository
    }

    async execute(contact: Contact): Promise<boolean> {
        return await this.contactRepository.createContact(contact)
    }
}