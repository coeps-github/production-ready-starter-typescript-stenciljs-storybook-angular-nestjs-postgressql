export const parameters = {
    layout: 'centered',
    actions: {argTypesRegex: "^on[A-Z].*"},
}

import {defineCustomElements} from '../../web-components/dist/esm/loader';

defineCustomElements();