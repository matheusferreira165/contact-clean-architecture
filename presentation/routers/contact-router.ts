import {GetAllContactsUseCase} from "../../domain/interfaces/use-cases/contact/get-all-contacts";
import {CreateContactUseCase} from "../../domain/interfaces/use-cases/contact/create-contact";
import {Request, Response, Router} from "express"

export default function ContactRouter(getAllContactsUseCase: GetAllContactsUseCase,
                                      createContactUseCase: CreateContactUseCase) {

    const router = Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const contacts = await getAllContactsUseCase.execute()
            res.send(contacts)
        } catch (err) {
            res.status(500).send({message: "Error fetching data"})
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createContactUseCase.execute(req.body)
            res.statusCode = 201
            res.json({message: "Created"})
        } catch (err) {
            res.status(500).send({message: "Error saving data"})
        }
    })

    return router
}
