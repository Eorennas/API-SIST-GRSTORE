import prismaCLient from "../prisma";

class ListCustomerService{
    async execute(){
        const customers = await prismaCLient.customer.findMany()

        return customers;
    }
}


export {ListCustomerService}