import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

// Controller não deveria trabalhar inserções na db
// contudo, não é necessário otimizar a estrutura do código de forma prematura

// usar async & await sempre que envolver db

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.week_day) {
            // erro 400: bad request
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            // resulta inner joing vvv
            .select(['classes.*', 'users;*']);

        return response.json(classes);
    }


    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedUsersIds =  await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertedClassesIds[0];
        
            // horário sempre convertido em minutos, já que segundos não são necessários
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            });
        
            await trx('class_schedule').insert(classSchedule);
        
            // .commit(): nesse momento insere tudo na db
            await trx.commit();
        
            // success 201: criado com sucesso
            return response.status(201).send();
        } catch (err) {
            // .rollback(): dá rollback em qualquer alteração feita na db
            await trx.rollback();
    
            // erro 400: bad request
            return response.send(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}