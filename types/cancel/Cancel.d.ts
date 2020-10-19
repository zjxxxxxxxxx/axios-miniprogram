import { Cancel } from '../types';
export default class CancelClass implements Cancel {
    message?: string | undefined;
    /**
     * @param message 取消信息
     */
    constructor(message?: string | undefined);
    toString(): string;
}
