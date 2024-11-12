import prismaCLient from "../prisma/index"

interface DeleteCustomerProps{
    id: string
}

class DeleteCustomerService{

    async execute({id}: DeleteCustomerProps){
        if(!id){
            throw new Error("SOlicitação invaida")
        }

        const findCustomer = await prismaCLient.customer.findFirst({
            where:{
                id:id
            }
        })

        if(!findCustomer){
            throw new Error("Cliente não existe!")
        }

        await prismaCLient.customer.delete({
            where:{
                id:findCustomer.id
            }
        })


        return{message: "Deletado com sucesso"}

    }
}

export {DeleteCustomerService}