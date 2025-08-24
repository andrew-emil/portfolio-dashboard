import { ContactDto } from "../dtos/contact.dto";

export interface ContactCardProps {
    contact: ContactDto;
    onDelete: (id: string) => Promise<void>;
}