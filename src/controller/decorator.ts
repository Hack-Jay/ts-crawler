import { Router } from 'express'
export const router = Router()

enum Mehtod {
    get = 'get',
    post = 'post'

}

function getRequestDecorator(type: string) {
    return function(path: string) {
        return function(target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
export const put = getRequestDecorator('put');
export const del = getRequestDecorator('delete');
