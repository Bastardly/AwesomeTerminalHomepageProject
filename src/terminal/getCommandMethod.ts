import * as methods from './commands'

export default function getCommandMethod(command: string): any {
    switch(command) {
        case 'cd': {
            return methods.cd
        }
        case 'dir':
        case 'ls': {
            console.log('list all items at currentPath')
            break;
        }
        default: {
            console.log('bbuuuuuuu')
        }
    }
}