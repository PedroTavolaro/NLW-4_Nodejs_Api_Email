import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    
    async show(request: Request, response: Response){

        const surveysRepository = getCustomRepository(UsersRepository);

        const all = await surveysRepository.find();

        return response.json(all);
    }

    async create(request: Request, response: Response) {
         const {name, email} = request.body;

         const shcema = yup.object().shape({
             name: yup.string().required("nome obrigatorio"),
             email: yup.string().email().required("email incorreto")
         })

        //validar campos de criação do user__________________________________________
        
        //  if(!(await shcema.isValid(request.body))) {
        //      return response.status(400).json({ error: "Validation Failed" });
        //  }

        try{
            await shcema.validate(request.body, { abortEarly: false });
        }catch(err) {
            throw new AppError(err);
        }

        //____________________________________________________________________________

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
                throw new AppError("User already exists!")
        }
        
        const user = usersRepository.create({
            name, 
            email
        })
        await usersRepository.save(user);

         return response.status(201).json(user)

    }
}

export { UserController };
