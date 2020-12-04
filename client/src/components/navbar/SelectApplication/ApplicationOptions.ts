import { faFunnelDollar, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import PATHS from '../../../consts/PATHS';

// PE 3/3 
export interface IApplicationOption {
    applicationName: string,
    path: string,
    faIcon: IconDefinition
}

export const applicationOptions: IApplicationOption[] =
    [{
        applicationName: 'Home',
        path: '/',
        faIcon: faHome
    },
    {
        applicationName: 'Monerate',
        path: '/monerate',
        faIcon: faFunnelDollar
    },
    ]

export const getCurrentApplicationByPath = (path: string): IApplicationOption => {
    if (path.startsWith(PATHS.monerate.index)) {
        return applicationOptions.find(option => option.applicationName === 'Monerate')
    } else {
        return applicationOptions.find(option => option.applicationName === 'Home')
    }
}