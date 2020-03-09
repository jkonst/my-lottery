import {Request, Response} from 'express';

export function winners(req: Request, res: Response) {
    return res.status(200).send({
        success: 'true',
        message: 'candidates added successfully'
    });
}
