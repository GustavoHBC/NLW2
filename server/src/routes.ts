import express from 'express';
import db from './database/connection';

import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

// usar async & await sempre que envolver db
routes.post('/classes', async (request, response) => {
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
});



export default routes;