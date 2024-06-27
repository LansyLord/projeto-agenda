import { prisma } from "../database/prisma-client";
import { Contact, ContactCreate, ContactCreateData, ContactRpository } from "../interfaces/contacts.interface";

class ContactRepositoryPrisma implements ContactRpository{
    async create(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contact.create({
            data:{
                email: data.email,
                name: data.name,
                phone: data.phone,
                userId: data.userId,
            },
        });
        return result;
    }
    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {

        const result = await prisma.contact.findFirst({
            where:{
                OR:[
                    {
                        email,
                    },
                    { phone },

                ],
            },
        });
        return result || null;
    }

    async findAllContacts(userId: string): Promise<Contact[]> {
        const result = await prisma.contact.findMany({
            where: {
                userId,
            },
        });
        return result;
    }

    async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {
        const result = await prisma.contact.update({
            where: {
                id,
            },
            data: {
                email,
                name,
                phone,
            },
        });
        return result;
    }
    async delete(id: string): Promise<boolean> {
        const result = await prisma.contact.delete({
            where: {
                id,
            },
        });
        return result ? true : false;
    }
}

export { ContactRepositoryPrisma };